import { allowedChannels } from "@/lib/allowedChannels";
import { Inter } from "next/font/google";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });

import React
 from "react";
import { IoMdSettings } from "react-icons/io";


export default function Trendings(props: {

}) {
    return(
        <div className="flex text-white h-screen w-1/5 lg:flex hidden justify-center items-center">
            <div className={`flex flex-col min-h-[70%] rounded-xl p-8 ${inter.className}`}>
                <div className="flex flex-row justify-between gap-10">
                    <span className="text-xl font-bold mb-8">Meraklısına kanallar</span>
                    <IoMdSettings size={24}/>
                </div>
                {allowedChannels.map((val , i) => {
                    return(
                        <Link key={i} href={`/channel/${val}`} className="flex flex-col mb-2">
                            <span className="text-xl font-bold">{`/${val}`}</span>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}