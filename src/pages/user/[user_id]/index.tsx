import Comment from "@/components/comment";
import Loading from "@/components/loading";
import MainLayout from "@/components/main_layout";
import UserProfileSelection from "@/components/profile_selection";
import Sidenav from "@/components/sidenav";
import Thread from "@/components/thread";
import Trendings from "@/components/trendings";
import createClockString from "@/lib/createClockString";
import { UserType } from "@/types/user";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });


import { useRouter } from "next/router";
import React from "react";


export default function Page(props: {

}) {
    const router = useRouter();
    const [user, setUser] = React.useState<UserType>();

    React.useEffect(() => {
        const {user_id} = router.query;
        
        if(user_id) {
            router.push(`/user/${user_id}/posts`);
        }
    }, [router])

    return(
        <>
            
        </>
    )
}