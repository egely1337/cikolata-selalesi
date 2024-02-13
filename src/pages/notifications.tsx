import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import Sidenav from "@/components/sidenav";
import React from "react";
import useUser from "@/hooks/user";
import Button from "@/components/button";
import MainLayout from "@/components/main_layout";
import Trendings from "@/components/trendings";
import Notification from "@/components/notification";
import { NotificationType } from "@/types/notification";
import { useNotificationStore } from "@/lib/store";


export default function Page(props: {

}) {
    const notifications = useNotificationStore();

    return(
        <div className="page">
            <Sidenav/>
            <MainLayout menuName="Bildirimler">
                {notifications?.notifications.map((val, i) => {
                    return(
                        <Notification
                            key={i}
                            notification={val}
                        />
                    )
                })}
            </MainLayout>
            <Trendings/>
        </div>
    )
}