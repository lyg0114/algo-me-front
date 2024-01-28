import React, {useState} from 'react'
import {useAuth} from "../context/AuthContext";
import {NavLink} from "react-router-dom";
import HomeDashBoard from "./dashboard/HomeDashBoard";

function Home() {
    const Auth = useAuth()
    const isLoggedIn = Auth.userIsAuthenticated()
    const [isLoading, setIsLoading] = useState(false)
    if (isLoading) {
        return (
            <div>### LOADING ###</div>
        )
    }

    if (isLoggedIn) {
        return (<HomeDashBoard/>)
    }

    return (
        <div>
            Logout HOME
            <div>Don't have already an account?</div>
            <NavLink to="/signup" color='violet' as={NavLink}>Sign Up</NavLink>
        </div>
    )
}

export default Home
