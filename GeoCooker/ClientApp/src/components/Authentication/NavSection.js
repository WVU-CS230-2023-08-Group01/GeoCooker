import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { LoginButton } from "./LoginButton";
import { LogoutButton } from "./LogoutButton";

export const NavSection = () => {
    const { isAuthenticated } = useAuth0();

    return (
        <div>
            {!isAuthenticated && (
                <>
                    <LoginButton />
                </>
            )}
            {isAuthenticated && (
                <>
                    <LogoutButton />
                </>
            )}
        </div>
    );
};

export default NavSection;