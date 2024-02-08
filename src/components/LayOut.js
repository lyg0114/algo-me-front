import React from 'react';
import NavBar from "./user/home/NavBar";

function Layout({children}) {
    return (
        <div>
            <NavBar/>
            <div className="container mx-auto">
                {children}
            </div>
        </div>
    );
}

export default Layout;
