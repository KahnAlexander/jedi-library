import React from 'react';
import { 
    Nav, 
    NavLink, 
    Bars, 
    NavMenu, 
    NavBtn, 
    NavBtnLink,
    NavLinkMenuItem
} from './NavbarElements';
import { Menu, MenuItem } from '@mui/material';

const Navbar = (props) => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
                {props.links.map(link => (< NavLink key={link.title} to={link.path}>{link.title}</NavLink>))}
            </NavMenu>
            <NavBtn>
                <NavBtnLink to="/signin">Sign In</NavBtnLink>
            </NavBtn>
        </Nav>
    )
}

export default Navbar;
