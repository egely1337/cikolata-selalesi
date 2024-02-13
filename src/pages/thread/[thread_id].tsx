import Comment from "@/components/comment";
import Loading from "@/components/loading";
import MainLayout from "@/components/main_layout";
import Sidenav from "@/components/sidenav";
import Thread from "@/components/thread";
import Trendings from "@/components/trendings";
import UserPostArea from "@/components/user_post_area";
import { PostType } from "@/types/post";


import { Comment as CommentType, Post, User } from "@prisma/client";
import { useRouter } from "next/router";
import React from "react";
import toast from "react-hot-toast";


export default function Page(props: {

}) {
    type CommentExtended = CommentType & {
        author: User
    }

    const router = useRouter();

    const [post, setPost] = React.useState<PostType>();
    const [comments, setComments] = React.useState<CommentExtended[]>();
    const [replyId, setReplyId] = React.useState<string>("");

    async function sendComment(content: string) {
        await fetch("/api/comment", {
            headers: {"content-type": "application/json"},
            body: JSON.stringify({
                content: content,
                postId: post?.id,
                replyId: (replyId == "") ? undefined : replyId
            }),
            method: "POST"
        }).then(async res => {

            if(res.status == 200) {
                const json: {status: boolean, comment: CommentExtended} = await res.json();
                setComments([json.comment, ...comments!]);
            } else {
                toast.error("bir sorunumuz var!");
            }
        })
    }

    async function getComments(postId: string) {
        await fetch(`/api/comments/${postId}`, {
            method: "GET"
        }).then(async res => {
            const json = await res.json();

            //@ts-ignore
            setComments(json.comments);
        })
    }

    React.useEffect(() => {
        const {thread_id} = router.query;
        
        async function fetch_thread(thread_id: string) {
            if(thread_id) {
                fetch(`http://localhost:3000/api/thread/${thread_id}`, {
                    method: "GET"
                }).then(async res => {
                    const json = await res.json();
                    
                    //@ts-ignore
                    setPost(json.thread);
                    getComments(json.thread.id);
                }).then(() => {
                })
            }
        }
        
        fetch_thread(thread_id as string);
    }, [router])

    return(
        <div className="page">
            <Sidenav/>
            <MainLayout menuName="Yorumlar">
                {post && <Thread post={post}/>}
                <UserPostArea
                    onClick={(content) => sendComment(content)}
                />
                <div className="flex flex-col w-full px-16">
                        {(comments) ? comments.map((val, i) => {
                            return(
                                <Comment
                                    onClick={(id) => {
                                        setReplyId(id);
                                    }}
                                    key={i}
                                    comment={val}
                                />
                            )
                        }): 
                            <div className="w-full h-full flex items-center justify-center">
                                <Loading/>
                            </div>
                        }
                    </div>
            </MainLayout>
            <Trendings/>
        </div>
    )
}