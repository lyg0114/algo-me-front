import React from 'react';

function Layout({children}) {
    return (
        <div>
            <div className="container mx-auto">
                {children}
            </div>
        </div>
    );
}

export default Layout;
