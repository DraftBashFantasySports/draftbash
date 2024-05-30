import { DashboardLayout } from "../../../components/web/layouts/dashboard-layout/DashboardLayout";

export function DirectMessagesPage() {
    return (
        <DashboardLayout
            title="Messages"
            subTitle="Direct message your friends"
            leftPanelChildren={<div>Hello</div>}
            rightPanelChildren={<div>Hello</div>}
        />
    );
}
