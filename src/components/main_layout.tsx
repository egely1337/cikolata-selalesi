import React from "react";

export default function MainLayout(props: {
    children: React.ReactNode,
    menuName: string
}) {
    return(
        <div className="w-3/5 h-screen text-black flex flex-col py-32">
            <span className="text-4xl text-white font-bold mb-10">{props.menuName}</span>
            {props.children}
        </div>
    )
}