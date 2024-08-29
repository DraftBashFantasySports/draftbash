import React from 'react';
import { NavBar } from 'views/dashboard/components/nav-bar/NavBar';
import styles from './DashboardLayout.module.css';

interface LayoutProps {
    header: React.ReactNode;
    leftPanel: React.ReactNode;
    rightPanel: React.ReactNode;
}

export const DashboardLayout: React.FC<LayoutProps> = ({ header, leftPanel, rightPanel }) => {
    return (
        <main>
            <NavBar />
            <div className={styles.content}>
                <header className={styles.header}>
                    <div className={styles.leftpanelheader}>{header}</div>
                    <div className={styles.rightpanelheader} />
                </header>
                <div className={styles.panels}>
                    <section className={`${styles.panel} ${styles.left}`}>
                        {leftPanel}
                    </section>
                    <section className={`${styles.panel} ${styles.right}`}>
                        {rightPanel}
                    </section>
                </div>
            </div>
        </main>
    );
};
