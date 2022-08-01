import { useState } from "react";
import Login from "./Login";

const Navbar = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    //callback function
    const loginCallback = (isLoggedIn: boolean) => {
        setLoggedIn(isLoggedIn)
    }
    return (
        <>
            <nav
                className="sticky top-0 z-10 flex h-14 w-screen items-center justify-center border-b border-border-gray bg-white"
            >
                <div className="left-nav">
                    <span className="font-source-code-pro text-3xl font-normal">Instacaster 📸</span>
                </div>
                <div className="right-nav">
                    <label htmlFor="login-modal" className="btn modal-button justify-end">Log in</label>
                </div>
            </nav>

            {/* Login modal */}
            {loggedIn ? null : <Login setLoggedInProps={loginCallback} />}
        </>
    );
}

export default Navbar;