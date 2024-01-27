import React, {useState} from 'react'
import {Dimmer, Loader, Segment} from 'semantic-ui-react'
import {useAuth} from "../context/AuthContext";

function Home() {
    const Auth = useAuth()
    const isLoggedIn = Auth.userIsAuthenticated()
    const [isLoading, setIsLoading] = useState(false)
    if (isLoading) {
        return (
            <Segment basic style={{marginTop: window.innerHeight / 2}}>
                <Dimmer active inverted>
                    <Loader inverted size='huge'>Loading</Loader>
                </Dimmer>
            </Segment>
        )
    }

    const logout = () => {
        Auth.userLogout();
    }

    if (isLoggedIn) {
        return (
            <div>
                <div>Login HOME</div>
                <div>
                    <button onClick={logout}>LOGOUT</button>
                </div>
            </div>
        )
    }

    return (<div>Logout HOME</div>
    )
}

export default Home
