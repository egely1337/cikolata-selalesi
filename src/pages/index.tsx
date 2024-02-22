import { useRouter } from "next/router";
import React
 from "react";
import { GiChocolateBar } from "react-icons/gi";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });


export default function Page(props: {

}) {
    const router = useRouter();

    return(
        <>
            <div className={`${inter.className} bg-[#272829] w-full min-h-screen flex flex-col justify-center items-center`}>
                <GiChocolateBar
                    size={144}
                    className="text-white opacity-80 mb-8"
                />
                <div className="flex flex-col w-4/5 lg:w-1/5 gap-5">
                    <button
                        onClick={() => router.push("/login")}
                        className="bg-[#61677A] hover:bg-[#445069] duration-100 p-4 text-white rounded-xl"
                    >Giriş Yap</button>
                    <button
                        onClick={() => router.push("/register")}
                        className="bg-[#61677A] hover:bg-[#445069] duration-100 p-4 text-white rounded-xl"
                    >Kayıt Ol</button>
                </div>
            </div>
              
        </>
    )
}