import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";

import { postRecipeResource } from "../Services/message.service";
import { useLocation } from "react-router-dom"

export const PostData = (props) => {
    const [message, setMessage] = useState("");

    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    let location = useLocation();

    useEffect(() => {
        let isMounted = true;

        const getMessage = async () => {
            const accessToken = await getAccessTokenSilently();
            let json = {
                "lat": location.state.lat,
                "lon": location.state.lon,
                "user": user.email,
                "location": location.state.location,
                "recipeName": location.state.recipeName,
                "description": "string",
                "rating": 5,
                "instructions": [
                    {
                        "id": 0,
                        "instruction": "string"
                    }
                ],
                "ingredients": [
                    {
                        "id": 0,
                        "ingredient": "string"
                    }
                ]
            };
            if (isAuthenticated) {
                const { data, error } = await postRecipeResource(accessToken, json);
                if (!isMounted) {
                    return;
                }

                if (data) {
                    setMessage(JSON.stringify(data, null, 2));
                }

                if (error) {
                    setMessage(JSON.stringify(error, null, 2));
                }
            }
           
        };

        getMessage();

        return () => {
            isMounted = false;
        };
    }, [getAccessTokenSilently]);
    console.log(location.state.lat + ", " + location.state.lon + ", ", user.email);

    return (
     <h1>Submitted!</h1>
    );
};

export default PostData;