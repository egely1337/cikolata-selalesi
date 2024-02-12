import React from "react"

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function Button(props: {
    onClick: () => void,
    text: string,
    className?: string
  }) {
    return(
      <button 
        className={`${props.className} py-4 font-bold rounded-xl bg-[#CF1CEC] duration-300 hover:bg-pink-600 text-white ${inter.className}`}
        onClick={() => props.onClick()}  
      >{props.text}</button>
    )
}