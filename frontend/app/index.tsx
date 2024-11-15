/*import { router, Redirect } from "expo-router";
import { useEffect, useState } from "react";

import React from "react";


export default function MainScreen(){

    const [loaded,setLoaded]= useState(false);

    useEffect(()=>{
        if(loaded){
           router.replace("/auth/login");  
        }
       
        },[loaded])

        useEffect(()=>{
            setLoaded(true);
        },[])


        return(
        <Redirect href="/auth/login"/>
    )
}*/