import React from "react";

export default function MainLayout(props: {
    children: React.ReactNode,
    menuName: string
}) {
    return(
        <div className="w-3/5 border-l border-r border-white h-screen overflow-auto text-black flex flex-col py-32">
            <div className="flex flex-col border-b ">
                <span className="text-4xl p-4 text-white font-bold mb-3">{`${props.menuName}`}</span>
            </div>
            {props.children}
        </div>
    )
}