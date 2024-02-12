import React from "react";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function Input(props: {
    placeholder?: string,
    className?: string,
    type: "text" | "password",
    onChange?: React.ChangeEventHandler<HTMLInputElement>
}) {

    return(
        <input
            className={`${props.className} focus:border-pink-600 duration-300 py-4 px-2 relative focus:outline-none border-[1px] rounded-md ${inter.className} `}
            placeholder={props.placeholder}
            onChange={props.onChange}
            type={props.type}
        />
    )
}
