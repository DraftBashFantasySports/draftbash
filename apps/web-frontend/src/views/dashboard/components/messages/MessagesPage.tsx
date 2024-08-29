import styles from "./MessagesPage.module.css";
import { DashboardLayout } from "views/dashboard/DashboardLayout";
import { ChatProvider } from "contexts/ChatProvider";
import { RightPanel } from "./components/right-panel/RightPanel";
import { LeftPanel } from "./components/left-panel/LeftPanel";
import { UserList } from "./components/user-list/UserList";

export const MessagesPage = () => {
    return (
        <ChatProvider>
            <DashboardLayout
                header={
                    <div className={styles.heading}>
                        <UserList />
                        <h1>Messages</h1>
                        <p>Send and receive messages</p>
                    </div>
                }
                leftPanel={<LeftPanel />}
                rightPanel={<RightPanel />}
            />
        </ChatProvider>
    );
};
