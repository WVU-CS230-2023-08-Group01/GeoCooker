import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { postProtectedResource } from "../Services/message.service";

export const AddRecipe = () => {
    const [message, setMessage] = useState("");

    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        let isMounted = true;

        const getMessage = async () => {
            const accessToken = await getAccessTokenSilently();
            const { data, error } = await postProtectedResource(accessToken);

            if (!isMounted) {
                return;
            }

            if (data) {
                setMessage(JSON.stringify(data, null, 2));
            }

            if (error) {
                setMessage(JSON.stringify(error, null, 2));
            }
        };

        getMessage();

        return () => {
            isMounted = false;
        };
    }, [getAccessTokenSilently]);

    return (
            <div className="content-layout">
                <h1 id="page-title" className="content__title">
                    Protected Page
                </h1>
                <div className="content__body">
                    <p id="page-description">
                        <span>
                            This page retrieves a <strong>protected message</strong> from an
                            external API.
                        </span>
                        <span>
                            <strong>Only authenticated users can access this page.</strong>
                        </span>
                    </p>
                </div>
            </div>
    );
};

export default AddRecipe;