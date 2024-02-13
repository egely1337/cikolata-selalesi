import { useUserStore } from "@/lib/store";
import React from "react";
import { IoSend } from "react-icons/io5";


export default function UserPostArea(props: {
    onClick: (content: string) => void
}) {
    const userStore = useUserStore();
    const [content, setContent] = React.useState<string>("");

    return(
        <div className="w-full flex flex-row p-8">
            <img draggable={false} src={userStore.user?.avatar_url} className="rounded-full w-[48px] h-[48px]"/>
            <div 
                className="w-full flex flex-col p-1 ml-4"
            >
                <span className="text-white">{userStore.user?.username}</span>
                <textarea
                    placeholder="düşüncelerini boşalt, merak etme burada özgürsün." 
                    className="p-2 focus:outline-none duration-300 border rounded-xl mt-2"
                    onChange={({target}) => setContent(target.value)}    
                    value={content}
                />
                <button  
                className="p-3 self-end bg-[#c3883d] hover:bg-[#5C2F27] text-white rounded-xl hover:bg-pink-700 mt-2"
                onClick={async () => {props.onClick(content); setContent("");}}
                ><IoSend/></button>
            </div>
        </div>
    )
}