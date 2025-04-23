import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageMeta from "../../../components/common/PageMeta";
import ComponentCardWithButton from "../../../components/common/ComponentCardWithButton";
import TowerListModal from "./TowerListModal";
import { Flat, Floor, Project, ProjectTower, Wing } from "../../../type/project";
import { createFlat, createFloor, createTower, createWing, deleteFlat, deleteFloor, deleteTower, deleteWing, getProjectDetails, updateFlat, updateFloor, updateTower, updateWing } from "../../../service/apis/AuthService";
import WingListModal from "./WingListModal";
import WingViewModal from "./WingViewModal";
import TowerDetails from "./form/TowerDetails";
import WingDetails from "./form/WingDetails";
import FloorDetails from "./form/FloorDetails";
import FlatShopDetails from "./form/FlatShopDetails";
import { toast } from "react-toastify";
import BoxAlerts from "../../UiElements/BoxAlerts";

export default function ProjectDetails() {
    const [searchParams] = useSearchParams();
    const projectIdParam = searchParams.get("projectId");

    const [projectDetails, setProjectDetails] = useState<Project | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [selectedTower, setSelectedTower] = useState<ProjectTower | null>(null);
    const [selectedWing, setSelectedWing] = useState<Wing | null>(null);
    const [selectedFloor, setSelectedFloor] = useState<Floor | null>(null);
    const [flatShopDetails, setFlatShopDetails] = useState<Flat | null>(null);

    const [isTower, setIsTower] = useState(false);
    const [isWing, setIsWing] = useState(false);
    const [isFloor, setIsFloor] = useState(false);
    const [isFlat, setIsFlat] = useState(false);

    const [isDelete, setIsDelete] = useState(false);
    const [msg, setMsg] = useState("");

    const isValidProjectId = projectIdParam !== null && projectIdParam.trim() !== "";

    /**
     * Function that use for open delete confirmation dialoge
     */
    const openDeleteConfirmation = (message: string, tower: ProjectTower, wing: Wing | null, floor: Floor | null, flatOrShop: Flat | null) => {
        setSelectedTower(tower);
        setSelectedWing(wing);
        setSelectedFloor(floor);
        setFlatShopDetails(flatOrShop);
        setMsg(`Are you sure you want to delete ${message}`);
        setIsDelete(true);
        setIsTower(false);
        setIsWing(false);
        setIsFloor(false);
        setIsFlat(false);
    }

    /**
     * Function that use for close delete confirmation dialoge
     */
    const closeDeleteConfirmation = () => {
        setIsDelete(false);
        setMsg("");
        setSelectedTower(null);
        setSelectedWing(null);
        setSelectedFloor(null);
        setFlatShopDetails(null);
        setIsTower(false);
        setIsWing(false);
        setIsFloor(false);
        setIsFlat(false);
    }

    /** 
     * Function that use for fetching project details
     */
    const fetchProjectDetails = async (
        projectId: number,
        towerId?: number,
        wingId?: number,
        floorId?: number,
        flatId?: number,
        shopId?: number
    ) => {
        try {
            setLoading(true);
            setError(null);

            const response = await getProjectDetails(
                projectId,
                towerId,
                wingId,
                floorId,
                flatId,
                shopId
            );

            if (response.status_code === 200) {
                setProjectDetails(response.records[0]);
            } else {
                setError("Project not found.");
            }
        } catch (err) {
            console.error("Error fetching project details:", err);
            setError("Project not found.");
        } finally {
            setLoading(false);
        }
    };

    /**
     * Functin that use for open Tower detail dialoge
     */
    const openTowerDialog = (id?: number) => {
        setIsTower(true);
        setSelectedTower(projectDetails?.res_tower_list.find((tower) => tower.id === id) || null);
    }

    /**
     * Function that use for close Tower detail dialoge
     */
    const closeTowerDialog = () => {
        setIsTower(false);
        setSelectedTower(null);
    }

    /**
     * Function that use for create or update tower
     */
    const handleTowerSave = async (tower: ProjectTower) => {
        console.log("tower", tower);
        try {
            const formData = new FormData();
            formData.append("tower_name", tower.name);
            formData.append("name", tower.name);
            formData.append("description", tower.description || "");
            formData.append("project_id", String(projectDetails?.id));

            let response;
            if (tower.id && tower.id > 0) {
                formData.append("tower_id", String(tower.id));
                response = await updateTower(formData);
            } else {
                response = await createTower(formData);
            }

            if(response?.msg){
                toast(response.msg, { type: response.alert });
            } else{
                toast(response?.error[0]?.msg, { type: "error" });
            }
        } catch (error) {
            console.error("Error saving tower:", error);
        } finally {
            closeTowerDialog();
            fetchProjectDetails(Number(projectIdParam));
        }
    }

    /** 
     * Function that use for delete tower
     */
    const handleTowerDelete = async (towerId: number) => {
        try {
            const response = await deleteTower(String(projectIdParam), String(towerId));

            toast(response.msg, { type: response.alert });
            if (response.status_code === 200) {
                fetchProjectDetails(Number(projectIdParam));
            }
        } catch (error) {
            console.error("Error deleting tower:", error);
        } finally {
            closeDeleteConfirmation();
            fetchProjectDetails(Number(projectIdParam));
        }
    }

    /**
     * Function that use for open Wing detail dialoge
     */
    const openWingDialog = (tower: ProjectTower, id?: number) => {
        setIsWing(true); 
        setSelectedTower(tower);
        setSelectedWing(projectDetails?.res_tower_list.flatMap(tower => tower.wing_list).find(wing => wing.id === id) || null);
    }

    /**
     * Function that use for close Wing detail dialoge
     */
    const closeWingDialog = () => {
        setIsWing(false);
        setSelectedTower(null);
        setSelectedWing(null);
    }

    /**
     * Function that use for create or update wing
     */
    const handleWingSave = async (wing: Wing) => {
        try {

            console.log("wing", wing);

            const formData = new FormData();
            formData.append("project_id", String(projectDetails?.id));
            formData.append("tower_id", String(selectedTower?.id));
            formData.append("wing_name", wing.name);
            formData.append("name", wing.name);
            formData.append("prefix", wing.prefix || "");
            formData.append("total_floors", String(wing.total_floors || 0));
            formData.append("total_basement", String(wing.total_basement || 0));
            formData.append("total_shop_floors", String(wing.total_shop_floors || 0));
            formData.append("flats_on_floor", String(wing.flats_on_floor || 0));
            formData.append("shops_on_floor", String(wing.shops_on_floor || 0));
            formData.append("flat_size", String(wing.flat_size || 0));
            formData.append("shop_size", String(wing.shop_size || 0));
            formData.append("basement_size", String(wing.basement_size || ""));
            formData.append("wing_type", String(wing.type || ""));
            formData.append("description", wing.description || "");

            let response;
            if (wing.id && wing.id > 0) {
                formData.append("wing_id", String(wing.id));
                response = await updateWing(formData);
            } else {
                response = await createWing(formData);
            }

            if(response?.msg){
                toast(response.msg, { type: response.alert });
            } else {
                toast(response?.error[0]?.msg, { type: "error" });
            }
            
        } catch (error) {
            console.error("Error saving wing:", error);
        } finally {
            closeWingDialog();
            fetchProjectDetails(Number(projectIdParam));
        }
    }

    /**
     * Function that use for delete wing
     */
    const handleWingDelete = async (towerId: number, wingId: number) => {
        try {
            const response = await deleteWing(String(projectIdParam), String(towerId), String(wingId));

            toast(response.msg, { type: response.alert });
        } catch (error) {
            console.error("Error deleting wing:", error);
        } finally {
            closeDeleteConfirmation();
            fetchProjectDetails(Number(projectIdParam));
        }
    }

    /**
     * Function that use for open Floor detail dialoge
     */
    const openFloorDialog = (tower: ProjectTower, wing: Wing, id?: number) => {
        setIsFloor(true);
        setSelectedTower(tower);
        setSelectedWing(wing);
        setSelectedFloor(projectDetails?.res_tower_list.flatMap(tower => tower.wing_list).flatMap(wing => wing.floor_list).find(floor => floor.id === id) || null);
    }
    
    /**
     * Function that use for close Floor detail dialoge
     */
    const closeFloorDialog = () => {
        setIsFloor(false);
        setSelectedFloor(null);
    }

    /**
     * Function that use for create or update floor
     */
    const handleFloorSave = async (floor: Floor) => {
        try {
            const formData = new FormData();
            formData.append("project_id", String(projectDetails?.id));
            formData.append("tower_id", String(selectedTower?.id));
            formData.append("wing_id", String(selectedWing?.id));
            formData.append("description", floor.description || "");
            formData.append("prefix", String(selectedWing?.prefix || ""));
            formData.append("order", String((selectedWing?.floor_list?.length ?? 0) + 1));
            formData.append("floor_no", String(floor.floor_no));
            formData.append("type", String(floor.type));

            let response;
            if (floor.id && floor.id > 0) {
                formData.append("floor_id", String(floor.id));
                response = await updateFloor(formData);
            } else {
                response = await createFloor(formData);
            }
            if(response?.msg){
                toast(response.msg, { type: response.alert });
            } else {
                toast(response?.error[0]?.msg, { type: "error" });
            }
        } catch (error) {
            console.error("Error saving floor:", error);
        } finally {
            closeFloorDialog();
            fetchProjectDetails(Number(projectIdParam));
        }
    }

    /**
     * Function that use for delete floor
     */
    const handleFloorDelete = async (towerId: number, wingId: number, floorId: number) => {
        try {
            const response = await deleteFloor(String(projectIdParam), String(towerId), String(wingId), String(floorId));
            toast(response.msg, { type: response.alert });
        } catch (error) {
            console.error("Error deleting floor:", error);
        } finally {
            closeDeleteConfirmation();
            fetchProjectDetails(Number(projectIdParam));
        }
    }

    /**
     * Function that use for open Flat detail dialoge
     */
    const openFlatDialog = (tower: ProjectTower, wing: Wing, floor: Floor, id?: number) => {
        setIsFlat(true);
        setSelectedTower(tower);
        setSelectedWing(wing);
        setSelectedFloor(floor);
        setFlatShopDetails(projectDetails?.res_tower_list.flatMap(tower => tower.wing_list).flatMap(wing => wing.floor_list).flatMap(floor => floor.flat_list).find(flat => flat.id === id) || null);
    }

    /**
     * Function that use for close Flat detail dialoge
     */
    const closeFlatDialog = () => {
        setIsFlat(false);
        setFlatShopDetails(null);
    }

    /**
     * Function that use for create or update flat
     */
    const handleFlatSave = async (flat: Flat) => {
        try {
            const formData = new FormData();
            formData.append("project_id", String(projectDetails?.id));
            formData.append("tower_id", String(selectedTower?.id));
            formData.append("wing_id", String(selectedWing?.id));
            formData.append("floor_id", String(selectedFloor?.id));
            formData.append("description", flat.description || "");
            formData.append("prefix", String(flat.prefix || ""));
            formData.append("name", String(flat.name || ""));
            formData.append("order", String(flat.order) || "");
            formData.append("floor_no", String(flat.floor_no || ""));
            formData.append("type", String(flat.type || ""));
            formData.append("size", String(flat.size || ""));

            let response;
            if (flat.id && flat.id > 0) {
                formData.append("flat_id", String(flat.id));
                response = await updateFlat(formData);
            } else {
                response = await createFlat(formData);
            }
            if(response?.msg){
                toast(response.msg, { type: response.alert });
            } else {
                toast(response?.error[0]?.msg, { type: "error" });
            }
        } catch (error) {
            console.error("Error saving flat:", error);
        } finally {
            closeFlatDialog();
            fetchProjectDetails(Number(projectIdParam));    
        }
    }

    /**
     * Function that use for delete flat
     */
    const handleFlatDelete = async (flatId: number, floorId: number, wingId: number, towerId: number) => {
        try {
            const response = await deleteFlat(String(projectIdParam), String(towerId), String(wingId), String(floorId), String(flatId));
            toast(response.msg, { type: response.alert });
        } catch (error) {
            console.error("Error deleting flat:", error);
        } finally {
            closeDeleteConfirmation();
            fetchProjectDetails(Number(projectIdParam));
        }
    }

    /**
     * Function that use for delete items
     */
    const handleDelete = () => {
        if(flatShopDetails && selectedFloor && selectedWing && selectedTower){
            handleFlatDelete(flatShopDetails.id, selectedFloor.id, selectedWing.id, selectedTower.id);
        } else if (selectedFloor && selectedWing && selectedTower){
            handleFloorDelete(selectedTower.id, selectedWing.id, selectedFloor.id);
        } else if (selectedWing && selectedTower){
            handleWingDelete(selectedTower.id, selectedWing.id);
        } else if (selectedTower){
            handleTowerDelete(selectedTower.id);
        }
    }

    /**
     * It takes projectId from params and fetches project details
     */
    useEffect(() => {
        if (isValidProjectId) {
            fetchProjectDetails(Number(projectIdParam));
        } else {
            setError("Project not found.");
        }
    }, [projectIdParam, isValidProjectId]);

    return (
        <div className="p-2">
            <PageMeta title="React.js Projects Details" description="Projects by InfyRealty" />

            <div className="space-y-6">
                {error ? (
                    <div className="text-center text-lg font-medium text-red-500">{error}</div>
                ) : loading ? (
                    <div className="text-center text-gray-500">Loading project details...</div>
                ) : (
                    <ComponentCardWithButton
                        title={`${projectDetails?.name ?? "Details"}`}
                        buttonTitle="Add Tower"
                        onButtonClick={() => openTowerDialog()}
                    >
                        <div>
                            {(projectDetails?.res_tower_list?.length ?? 0) > 0 &&
                                projectDetails?.res_tower_list.map((tower) => (

                                    // Going to print towerList here
                                    <TowerListModal
                                        key={tower.id}
                                        title={tower.name}
                                        description={tower.description || ""}
                                        buttonTitle="Add Wing"
                                        onButtonClick={() => openWingDialog(tower)}
                                        onTitleClick={() => openTowerDialog(tower.id)}
                                    >
                                        {tower?.wing_list?.length > 0 &&
                                            tower.wing_list.map((wing) => (
                                                
                                                // Going to print wingList here
                                                <WingListModal
                                                    key={wing.id}
                                                    title={wing.name}
                                                    description={wing.description || ""}
                                                    buttonTitle="Add Floor"
                                                    onButtonClick={() => openFloorDialog(tower, wing)}
                                                    onTitleClick={() => openWingDialog(tower, wing.id)}
                                                >
                                                    <WingViewModal 
                                                        floorList={wing.floor_list}
                                                        onFloorEdit={(floor) => openFloorDialog(tower, wing, floor.id)}
                                                        onFlatEdit={(floor, flat) => openFlatDialog(tower, wing, floor, flat ? flat.id : undefined)}
                                                    />
                                                </WingListModal>
                                            ))}
                                    </TowerListModal>
                                ))}
                        </div>
                    </ComponentCardWithButton>
                )}
            </div>

            {isTower && (
                <TowerDetails
                    isOpen={isTower}
                    onClose={() => closeTowerDialog()}
                    towerDetails={selectedTower}
                    onDelete={(tower) => openDeleteConfirmation("tower", tower, null, null, null)}
                    onSave={(tower) => handleTowerSave(tower)}
                />
            )}

            {isWing && (
                <WingDetails
                    isOpen={isWing}
                    onClose={() => closeWingDialog()}
                    wingDetails={selectedWing}
                    onDelete={(wing) => openDeleteConfirmation("wing", selectedTower!, wing, null, null)}
                    onSave={(wing) => handleWingSave(wing)}
                />
            )}

            {isFloor && (
                <FloorDetails
                    isOpen={isFloor}
                    onClose={() => closeFloorDialog()}
                    floorDetails={selectedFloor}
                    onDelete={(floor) => openDeleteConfirmation("floor", selectedTower!, selectedWing, floor, null)}
                    onSave={(floor) => handleFloorSave(floor)}
                />
            )}

            {isFlat && selectedFloor && (
                <FlatShopDetails
                    isOpen={isFlat}
                    onClose={() => closeFlatDialog()}
                    floorDetails={selectedFloor}
                    flatShopDetails={flatShopDetails}
                    onDelete={(flat) => openDeleteConfirmation(flat.type, selectedTower!, selectedWing, selectedFloor, flat)}
                    onSave={(flat) => handleFlatSave(flat)}
                />
            )}

            {isDelete && (
                <BoxAlerts
                    boxType="alert"
                    isOpen={isDelete}
                    title="Delete Confirmation"
                    description={msg}
                    onConfirm={() => handleDelete()}
                    onCancel={() => closeDeleteConfirmation()}
                />
            )}
        </div>
    );
}


// While creating wing check project type add this validation later

