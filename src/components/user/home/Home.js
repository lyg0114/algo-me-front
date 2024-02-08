import React, {useState} from 'react'
import {useAuth} from "../../context/AuthContext";
import {NavLink} from "react-router-dom";
import HomeDashBoard from "./dashboard/HomeDashBoard";

function Home() {
    const Auth = useAuth()
    const isLoggedIn = Auth.userIsAuthenticated()

    if (isLoggedIn) {
        return (<HomeDashBoard/>)
    }

    return (
        <NavLink to="/signup" color='violet' as={NavLink}/>
    )
}

export default Home
