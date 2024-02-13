import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import Sidenav from "@/components/sidenav";
import React from "react";
import useUser from "@/hooks/user";
import Button from "@/components/button";
import MainLayout from "@/components/main_layout";
import Trendings from "@/components/trendings";


export default function Page(props: {

}) {
    const user = useUser();

    return(
        <div className="page">
            <Sidenav/>
            <MainLayout menuName="Bildirimler">
                <>
                </>
            </MainLayout>
            <Trendings/>
        </div>
    )
}