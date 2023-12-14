import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import SavedRecipes from "../SavedRecipes";

const Profile = () => {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [userMetadata, setUserMetadata] = useState(null);

    useEffect(() => {
        const getUserMetadata = async () => {
            //const domain = "dev-hnosbuofym3q3o0u.us.auth0.com";
            const domain = "geocooker";
            try {
                const accessToken = await getAccessTokenSilently({
                    authorizationParams: {
                        audience: `https://${domain}/auth/0/api`,
                        //scope: "read:current_user write:recipe",
                    },
                });

                const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
                //const userDetailsByIdUrl = `https://localhost:44478/api/Recipe`;

                const metadataResponse = await fetch(userDetailsByIdUrl, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                fetch(userDetailsByIdUrl, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                    .then(response => response.json())
                    .then(data => this.setState({ items: data }));

                const { user_metadata } = await metadataResponse.json();

                setUserMetadata(user_metadata);
            } catch (e) {
                console.log(e.message);
            }
        };

        getUserMetadata();
    }, [getAccessTokenSilently, user?.sub]);
    return (
        isAuthenticated && (
            <div className="profile-header text-center">
                <img src={user.picture} alt="User Avatar" className="rounded-circle img-fluid" />
                <h1>{user.name}</h1>
                <p>{user.email}</p>
                < SavedRecipes />

            </div>
        )
    );
};

export default Profile;