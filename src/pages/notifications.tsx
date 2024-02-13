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


export default function Page(props: {

}) {
    const [notifications, setNotifications] = React.useState<NotificationType[]>();

    async function getNotifications() {
        await fetch("/api/me/notifications", {
            method: "GET"
        }).then(async res => {
            const json = await res.json();

            //@ts-ignore
            setNotifications(json.notifications);
        })
    }

    React.useEffect(() => {
        getNotifications();
    }, [])

    return(
        <div className="page">
            <Sidenav/>
            <MainLayout menuName="Bildirimler">
                {notifications?.map((val, i) => {
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