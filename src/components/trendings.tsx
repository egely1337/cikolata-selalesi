import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import React
 from "react";
import { IoMdSettings } from "react-icons/io";


export default function Trendings(props: {

}) {
    return(
        <div className="flex text-white h-screen w-1/5 flex justify-center items-center">
            <div className={`flex flex-col min-h-[70%] bg-[#903b0d] rounded-xl p-8 ${inter.className}`}>
                <div className="flex flex-row justify-between gap-10">
                    <span className="text-xl font-bold mb-8">Türkiye'de gündem</span>
                    <IoMdSettings size={24}/>
                </div>
                <div className="flex flex-col mb-4">
                    <span className="font-semibold text-sm mb-1">1. Trending</span>
                    <span className="text-xs">#128milyardolarnerde</span>
                </div>
                <div className="flex flex-col mb-4">
                    <span className="font-semibold text-sm mb-1">2. Trending</span>
                    <span className="text-xs">#128milyardolarnerde</span>
                </div>
                <div className="flex flex-col mb-4">
                    <span className="font-semibold text-sm mb-1">3. Trending</span>
                    <span className="text-xs">#128milyardolarnerde</span>
                </div>
                <div className="flex flex-col mb-4">
                    <span className="font-semibold text-sm mb-1">4. Trending</span>
                    <span className="text-xs">#128milyardolarnerde</span>
                </div>
                <div className="flex flex-col mb-4">
                    <span className="font-semibold text-sm mb-1">5. Trending</span>
                    <span className="text-xs">#128milyardolarnerde</span>
                </div>
            </div>
        </div>
    )
}