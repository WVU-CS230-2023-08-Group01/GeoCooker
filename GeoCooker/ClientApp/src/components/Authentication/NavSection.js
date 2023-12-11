import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { LoginButton } from "./LoginButton";
import { LogoutButton } from "./LogoutButton";
import Profile from "./Profile";
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';

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
                    <NavLink tag={Link} className="text-dark" to="/Profile">Profile</NavLink>
                </>
            )}
        </div>
    );
};

export default NavSection;