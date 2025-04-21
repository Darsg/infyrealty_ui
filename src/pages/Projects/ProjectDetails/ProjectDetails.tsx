import { useSearchParams } from "react-router-dom";
import ComponentCardWithButton from "../../../components/common/ComponentCardWithButton";
import PageMeta from "../../../components/common/PageMeta";

export default function ProjectDetails() {
    const [searchParams] = useSearchParams();
    const projectId = searchParams.get("projectId");

    const isValidProjectId = projectId !== null && projectId.trim() !== "";

    return (
        <div className="p-2">
            <PageMeta title="React.js Projects Details" description="Projects by InfyRealty" />

            <div className="space-y-6">
                {!isValidProjectId ? (
                    <div className="text-center text-lg font-medium text-red-500">
                        Project not found.
                    </div>
                ) : (
                    <ComponentCardWithButton
                        title="Project List"
                        buttonTitle="Add Tower"
                        onButtonClick={() => console.log("Button clicked")}
                    >
                        Hi
                    </ComponentCardWithButton>
                )}
            </div>
        </div>
    );
}
