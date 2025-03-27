import ComponentCard from "../../../components/common/ComponentCard";
import PageMeta from "../../../components/common/PageMeta";

// By Darsh
// Instructions:
// 1. Call API which returns list of forms.
// 2. Add NavBar and pass data in that and It returns selected tab.
// 3. Based on selected tab, call seprate form API and fech it's components.
// 4. Render components in the page.

export default function DynamicForm() {
    return (
        <div>
            <PageMeta
                title="React.js Staff Management"
                description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <ComponentCard title="Forms"> 
                <div className="space-y-6">
                    NOTE: This is a hidden page. You can access this page by adding the path to the URL.
                </div>
            </ComponentCard>
        </div>
    )
}
