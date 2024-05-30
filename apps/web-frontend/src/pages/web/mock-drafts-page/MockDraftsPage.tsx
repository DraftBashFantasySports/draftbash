import { DashboardLayout } from "../../../components/web/layouts/dashboard-layout/DashboardLayout";
import { MockDraftsLeftPanel } from "./features/MockDraftsLeftPanel";
import { MockDraftsRightPanel } from "./features/MockDraftsRightPanel";

export function MockDraftsPage() {
    return (
        <DashboardLayout
            title="Mock Drafts"
            subTitle="Practice draft strategy"
            leftPanelChildren={<MockDraftsLeftPanel />}
            rightPanelChildren={<MockDraftsRightPanel />}
        />
    );
}
