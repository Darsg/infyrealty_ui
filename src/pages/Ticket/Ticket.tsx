import ComponentCardWithButton from "../../components/common/ComponentCardWithButton";
import PageMeta from "../../components/common/PageMeta";
import TicketTable from "./TicketTable";

export default function Ticket() {
    return (
        <>
            <PageMeta
                title="React.js Ticket"
                description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <ComponentCardWithButton title="Ticket" 
            >
                <div className="space-y-6">
                    <TicketTable />
                </div>
            </ComponentCardWithButton>
        </>
    )
}