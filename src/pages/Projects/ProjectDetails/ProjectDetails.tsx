import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageMeta from "../../../components/common/PageMeta";
import ComponentCardWithButton from "../../../components/common/ComponentCardWithButton";
import TowerListModal from "./TowerListModal";
import { Flat, Floor, Project, ProjectTower, Wing } from "../../../type/project";
import { getProjectDetails } from "../../../service/apis/AuthService";
import WingListModal from "./WingListModal";
import WingViewModal from "./WingViewModal";
import TowerDetails from "./form/TowerDetails";
import WingDetails from "./form/WingDetails";
import FloorDetails from "./form/FloorDetails";
import FlatShopDetails from "./form/FlatShopDetails";

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

    const isValidProjectId = projectIdParam !== null && projectIdParam.trim() !== "";

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
     * Function that use for open Wing detail dialoge
     */
    const openWingDialog = (id?: number) => {
        setIsWing(true); 
        setSelectedWing(projectDetails?.res_tower_list.flatMap(tower => tower.wing_list).find(wing => wing.id === id) || null);
    }

    /**
     * Function that use for close Wing detail dialoge
     */
    const closeWingDialog = () => {
        setIsWing(false);
        setSelectedWing(null);
    }

    /**
     * Function that use for open Floor detail dialoge
     */
    const openFloorDialog = (id?: number) => {
        setIsFloor(true);
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
     * Function that use for open Flat detail dialoge
     */
    const openFlatDialog = (id?: number) => {
        setIsFlat(true);
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
                                        onButtonClick={() => openWingDialog()}
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
                                                    onButtonClick={() => openFloorDialog()}
                                                    onTitleClick={() => openWingDialog(wing.id)}
                                                >
                                                    <WingViewModal 
                                                        floorList={wing.floor_list}
                                                        onFloorEdit={(floor) => openFloorDialog(floor.id)}
                                                        onFlatEdit={(flat) => openFlatDialog(flat ? flat.id : undefined)}
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
                    onDelete={(id) => console.log("Delete Tower clicked", id)}
                    onSave={(tower) => {
                        console.log("Call update or create tower API", tower);
                        closeTowerDialog();
                    }}
                />
            )}

            {isWing && (
                <WingDetails
                    isOpen={isWing}
                    onClose={() => closeWingDialog()}
                    wingDetails={selectedWing}
                    onDelete={(id) => console.log("Delete Wing clicked", id)}
                    onSave={(wing) => {
                        console.log("Call update or create wing API", wing);
                        closeWingDialog();
                    }}
                />
            )}

            {isFloor && (
                <FloorDetails
                    isOpen={isFloor}
                    onClose={() => closeFloorDialog()}
                    floorDetails={selectedFloor}
                    onDelete={(id) => console.log("Delete Floor clicked", id)}
                    onSave={(floor) => {
                        console.log("Call update or create floor API", floor);
                        closeFloorDialog();
                    }}
                />
            )}

            {isFlat && (
                <FlatShopDetails
                    isOpen={isFlat}
                    onClose={() => closeFlatDialog()}
                    flatShopDetails={flatShopDetails}
                    onDelete={(id) => console.log("Delete Flat clicked", id)}
                    onSave={(flat) => {
                        console.log("Call update or create flat API", flat);
                        closeFlatDialog();
                    }}
                />
            )}
        </div>

        
    );
}


// While creating wing check project type add this validation later

