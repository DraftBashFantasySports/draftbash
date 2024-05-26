import { DashboardLayout } from "../../../components/web/layouts/dashboard-layout/DashboardLayout";

export function DirectMessagesPage() {
    return (
        <DashboardLayout
            leftPanelChildren={<div>Hello</div>}
            rightPanelChildren={<div>Hello</div>}
        />
    );
}
