import React, { useState } from 'react';
import { 
    Nav, 
    NavLink, 
    Bars, 
    NavMenu, 
    NavBtn, 
    NavBtnLink,
    NavLinkMenuItem,
    NavBtnAlt
} from './NavbarElements';
import { Menu, MenuItem } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';

const Navbar = (props) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const history = useHistory();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogOut = async () => {
        try {
            await logout();
            history.push('/login');
        } catch(e) {
            console.log('Failed to log out!');
            console.log(e);
        }
    }

    const { currentUser, logout } = useAuth();

    return (
        <Nav>
            <NavLink to="/">
                <h1>logo</h1>
                {/* <img src={require('../../resources/kahn_logo.svg')?.default} alt='logo'/> */}
            </NavLink>
            <Bars 
                aria-label="settings"
                id="basic-button"
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick} 
            />
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                {props.links.map(link => (<MenuItem key={link.title} onClick={handleClose}><NavLinkMenuItem to={link.path}>{link.title}</NavLinkMenuItem></MenuItem>))}
            </Menu>
            <NavMenu>
                {props.links.map(link => (<NavLink key={link.title} to={link.path}>{link.title}</NavLink>))}
                {currentUser && <NavLink key="dashboard" to='/dashboard'>Dashboard</NavLink>}
            </NavMenu>
            <NavBtn>
                {
                    currentUser
                    ? <NavBtnAlt variant="contained" onClick={handleLogOut}>Log Out</NavBtnAlt>
                    : <>
                        <NavBtnLink to="/login">Log In</NavBtnLink>
                        {/* <NavBtnLink to="/signup">Sign Up</NavBtnLink> */}
                    </>
                }
            </NavBtn>
        </Nav>
    )
}

export default Navbar;
