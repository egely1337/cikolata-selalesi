import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import React from "react";

import { signIn as SignIn } from "next-auth/react";

import Input from "@/components/input";
import Button from "@/components/button";

import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useUserStore } from "@/lib/store";
import { User } from "@prisma/client";

export default function Page(props: {
  
}) {
  const router = useRouter();

  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const userStore = useUserStore();
  
  async function signIn() {
    await SignIn("credentials", {
      redirect: false,
      username: username,
      password: password
    }).then(async res => {
      if(res?.error === null) {
        toast.success("Başarıyla giriş yaptın.");
        setTimeout(() => {
          if(userStore.user == null) {
            fetch("/api/me", {
              method: "GET"
            }).then(async res => {
              const json: {status: boolean, user: User} = await res.json();
              
        
              if(json.status) {
                userStore.setUser(json.user);
                console.log("user store added.");
              }
            })
          }
          
          router.push("/");
        }, 1000);
      } else {
        toast.error(res?.error ?? "undefined");
      }
    });
  }

  return(
    <>
    <div className="w-full h-screen flex flex-row">
      <div className="lg:w-3/4 w-0 relative h-screen bg-[#CF1CEC]">
        <svg width="1132" height="664" className="absolute right-0 bottom-0" viewBox="0 0 1132 664" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M90.09 599.503C35.2526 603.914 7.18108 645.672 0 666H1132V0C1103.28 5.51267 1041.65 20.1902 1024.94 34.7988C1004.05 53.0595 962.265 83.0347 955.084 109.909C947.903 136.783 853.896 173.305 846.062 181.918C838.228 190.532 754.667 222.23 690.037 245.314C625.407 268.398 587.543 284.936 573.834 317.668C560.125 350.399 488.967 359.357 458.937 400.358C428.907 441.359 392.348 435.157 364.93 468.922C337.511 502.687 276.145 514.401 247.421 525.427C218.697 536.452 158.637 593.991 90.09 599.503Z" fill="#A520BB"/>
        </svg>

      </div>

      <div className="lg:w-1/4 w-full p-8 h-screen bg-white flex flex-col justify-center">
        <span className={`${inter.className} font-bold w-full mb-5 text-3xl`} >{`katıl ve neler öğrenebileceğini keşfet.`}</span>
        <Input
          placeholder="kullanıcı adı"
          className="w-full mb-2"
          type="text"
          onChange={({target}) => setUsername(target.value)}
        />
        <Input
          placeholder="şifre"
          className="w-full mb-4"
          type="password"
          onChange={({target}) => setPassword(target.value)}
        />
        <Button
          text="giriş yap"
          className="w-36 mb-2"
          onClick={() => signIn()}
        />
      </div>
    </div>  
    </>
  )
}