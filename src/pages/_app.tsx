import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

import type { AppProps } from "next/app";
import React from "react";
import { useUserStore } from "@/lib/store";
import { User } from "@prisma/client";


export default function App({Component, pageProps: {session, ...pageProps}}: AppProps) {

  const userStore = useUserStore();

  React.useEffect(() => {
    if(userStore.user == null) 
    fetch("/api/me", {
      method: "GET"
    }).then(async res => {
      const json: {status: boolean, user: User} = await res.json();
      

      if(json.status) {
        userStore.setUser(json.user);
        console.log("user store added.");
      }
    })
  }, [])
  
  return (
    <>
      <Toaster/>
      <SessionProvider session={session}>
          <Component {...pageProps} />
      </SessionProvider>
    </>  
  );
}
