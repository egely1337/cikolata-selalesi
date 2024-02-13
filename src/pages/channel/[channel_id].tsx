import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import React from "react";

import Sidenav from "@/components/sidenav";
import Thread from "@/components/thread";
import Trendings from "@/components/trendings";
import MainLayout from "@/components/main_layout";
import UserPostArea from "@/components/user_post_area";
import { useRouter } from "next/router";
import Loading from "@/components/loading";
import { PostType } from "@/types/post";


export default function Page(props: {

}) {
    const [posts, setPosts] = React.useState<PostType[]>();
    const router = useRouter();

    async function fetchPosts(channel_id: string) {
        setPosts([]);

        fetch(`/api/channel/${channel_id}`, {
            method: "GET",
        }).then(async res => {
            const json = await res.json();
            
            //@ts-ignore
            setPosts(JSON.parse(JSON.stringify(json.posts)));
        })
    }

    async function sendPost(content: string) {
        await fetch("/api/post", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                content,
                channel_id: router.query.channel_id
            })
        }).then(async res => {
            const json: {status: boolean, post: PostType} = await res.json();

            setPosts([json.post, ...posts!]);
        })
    }

    React.useEffect(() => {
        const {channel_id} = router.query;
        
        if(channel_id) {
            fetchPosts(channel_id as string);

            document.title = `Şelale - /${channel_id}`;
        }
    }, [router])


    return(
        <div className="page">
            <Sidenav/>
            <MainLayout menuName={`Şelale - ${router.query?.channel_id}`}>
                <UserPostArea onClick={async (content) => {
                    sendPost(content);
                }}/>

                {posts ? <div className="p-4 flex flex-col">
                    {posts.map((val, i) => {
                        return(
                            <Thread
                                key={i}
                                post={val}
                            />
                        )
                    })}
                </div> : <div className="w-full h-full flex items-center justify-center">
                    <Loading/>
                </div>
                }
            </MainLayout>
            <Trendings/>
        </div>
    )
}