import React from 'react'
import {useAuth} from "../../context/AuthContext";

function NavBar() {
    const Auth = useAuth()
    const handleLogOutClick = () => {
        Auth.userLogout();
    };

    return (
        <nav className="bg-gray-800 p-4 fixed top-0 w-full z-10">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white font-bold text-lg">ALGO-MI</div>
                <div className="flex space-x-4">
                    <button onClick={handleLogOutClick}
                            className="bg-red-500 text-white font-bold px-4 py-2 rounded hover:bg-red-600 transition duration-300">
                        LOGOUT
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default NavBar
