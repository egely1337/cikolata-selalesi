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
        
        async function fetch_user(thread_id: string) {
            if(thread_id) {
                fetch(`/api/user/${user_id}/posts`, {
                    method: "GET"
                }).then(async res => {
                    const json = await res.json();
                    
                    //@ts-ignore
                    if(json.user) {
                        setUser(json.user);
                    } else {
                        router.push("/channel/genel/?e=Kullanıcı bulunamadı.");
                    }
                });
            }
        }
        
        fetch_user(user_id as string);
    }, [router])

    return(
        <>
        {user ? <div className={`page`}>
            <Sidenav/>
            <MainLayout menuName={`@${user?.username}`}>
                <div className="flex flex-col p-8 text-white __className_aaf875">
                    <div className="flex flex-row">
                        <img src={user?.avatar_url} className="w-[128px] h-[128px] z-10 rounded-full" />
                        <div className="flex flex-col p-8 text-white">
                            <span className="text-2xl font-bold">{`${user?.username}`}</span>
                            <span className="text-sm opacity-70">{`@${user?.username}`}</span>
                            <span className="mt-2 opacity-70 font-bold">{`${createClockString(`${user?.created_at}`)} tarihinde katıldı.`}</span>
                        </div>
                    </div>
                </div>

                <UserProfileSelection user={user}/>
                <div className="p-8 flex flex-col">
                    <span className="text-white text-4xl font-bold mb-4">{`Gönderiler`}</span>
                    {user?.posts.map((val, i) => {
                    return(
                        <Thread key={i} post={val}/>
                    )
                    })}
                </div>
            </MainLayout>
            <Trendings/>
        </div> :
            <div className="w-full flex items-center justify-center h-screen">
                <Loading/>
            </div>
        }
        </>
    )
}