import "@/styles/globals.css";

import toast, { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

import type { AppProps } from "next/app";
import React from "react";
import { useNotificationStore, useUserStore } from "@/lib/store";
import { User } from "@prisma/client";
import { useRouter } from "next/router";


export default function App({Component, pageProps: {session, ...pageProps}}: AppProps) {

  const router = useRouter();
  const userStore = useUserStore();
  const notificationsStore = useNotificationStore();

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

  React.useEffect(() => {
      async function getNotifications() {
          await fetch("/api/me/notifications", {
              method: "GET"
          }).then(async res => {
            if(res.status == 500) return;

              const json = await res.json();

              //@ts-ignore
              notificationsStore.setNotifications(json.notifications);
          })
      }
      getNotifications();

      setInterval(async () => {
        await getNotifications();
      }, 5000);
  }, [])

  React.useEffect(() => {
    const {e} = router.query;
    
    if(e) {
      toast.error(e as string, {
        style: {
          padding: '16px',
          background: '#333',
          color: '#fff',
        },
      });
    }
  }, [router])
  
  return (
    <>
      <Toaster
        position="top-right"
      />
      <SessionProvider session={session}>
          <Component {...pageProps} />
      </SessionProvider>
    </>  
  );
}
