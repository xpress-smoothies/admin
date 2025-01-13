// src/GoogleAuth.js
import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import Admin from "./Admin";
import { gudMails } from "./GudMails";

const GoogleAuth = () => {

    const [connectedEmail, setConnectedEmail] = useState('');

    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            console.log("Access Token:", tokenResponse.access_token);

            // Fetch user info
            const userInfo = await fetch(
                "https://www.googleapis.com/oauth2/v3/userinfo",
                // "https://www.googleapis.com/oauth2/v3/userinfo.email",
                {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.access_token}`,
                    },
                }
            );
            const user = await userInfo.json();
            console.log("User Info:", user);
            console.log("email:", user.email);
            setConnectedEmail(user.email);
        },
        onError: () => {
            console.error("Login Failed");
        },
    });

    const logout = function () {
        console.log('logout?')
        setConnectedEmail('')
    }

    return (

        <div>
            {connectedEmail === '' && <div>
                <button onClick={login}>Sign in with Google</button>
            </div>}
            {connectedEmail !== '' && <div>
                <p>
                    Connected: {connectedEmail}
                </p>

                {gudMails.includes(connectedEmail) && <div>
                    <p>
                        Approved user! 👍
                    </p>

                    <button onClick={logout}>Logout</button>

                    <br />
                    <br />

                    <hr />

                    <br />

                    <Admin></Admin>

                </div>}

                {!gudMails.includes(connectedEmail) && <div>
                    <p>
                        🫠 Uh oh! Ask James to add this email to the admin list.
                    </p>

                    <button onClick={logout}>Logout</button>
                </div>}

            </div>}
        </div>
    );
};

export default GoogleAuth;
