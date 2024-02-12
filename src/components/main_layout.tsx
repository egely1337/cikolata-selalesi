import React from "react";

export default function MainLayout(props: {
    children: React.ReactNode,
    menuName: string
}) {
    return(
        <div className="w-3/5 h-screen overflow-auto text-black flex flex-col py-32">
            <span className="text-4xl text-white font-bold mb-3">{props.menuName}</span>
            <div className="bg-white w-full p-[0.1px] mb-7"/>
            {props.children}
        </div>
    )
}