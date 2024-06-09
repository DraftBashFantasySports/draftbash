import styles from "./MessagesPage.module.css";
import { DashboardLayout } from "../DashboardLayout";

export const MessagesPage = () => {
    return (
        <>
            <DashboardLayout
                header={
                    <div className={styles.heading}>
                        <h1>Messages</h1>
                        <p>Send and receive messages</p>
                    </div>
                }
                leftPanel={<div>Left Panel</div>}
                rightPanel={<div>Right Panel</div>}
            />
        </>
    );
};
