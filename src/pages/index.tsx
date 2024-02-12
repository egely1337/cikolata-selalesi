import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import React from "react";

import { Post, User } from "@prisma/client";
import Sidenav from "@/components/sidenav";
import Thread from "@/components/thread";
import { IoSend } from "react-icons/io5";
import { useUserStore } from "@/lib/store";
import { FaOptinMonster } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import Trendings from "@/components/trendings";
import MainLayout from "@/components/main_layout";
import UserPostArea from "@/components/user_post_area";


export default function Page(props: {

}) {
    type PostType = Post & {
        author: User
    }

    const [posts, setPosts] = React.useState<PostType[]>();
    const [content, setContent] = React.useState<string>("");

    const userStore = useUserStore();

    async function fetchPosts() {
        setPosts([]);

        fetch("/api/posts", {
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
                content
            })
        }).then(async res => {
            const json: {status: boolean, post: PostType} = await res.json();

            setPosts([json.post, ...posts!]);
        })
    }

    React.useEffect(() => {
        fetchPosts();
    }, [])


    return(
        <div className="page">
            <Sidenav/>
            <MainLayout menuName="Şelale">
                <UserPostArea onClick={async (content) => {
                    sendPost(content);
                }}/>

                <div className="p-4 flex flex-col">
                    {posts?.map((val, i) => {
                        return(
                            <Thread
                                key={i}
                                post={val}
                            />
                        )
                    })}
                </div>
            </MainLayout>
            <Trendings/>
        </div>
    )
}