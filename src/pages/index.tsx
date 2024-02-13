import { useRouter } from "next/router";
import React
 from "react";



export default function Page(props: {

}) {
    const router = useRouter();

    React.useEffect(() => {
        router.push("/channel/genel");
    })

    return(
        <>
        
        </>
    )
}