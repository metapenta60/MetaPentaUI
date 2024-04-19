import React from "react";
import {Link} from "react-router-dom";

import "./trial.css";

import {Button} from "antd";
import Sketch from "./sketch";
import Navbar from "react-bootstrap/Navbar";
import SideNavBar   from "../../../components/ui/sideBar/sideNavBar";
import Barra from "../../../components/ui/navBar/barra";
import Menu from "../../../components/ui/menu";
import Box from "@mui/material/Box";
const Trial  = () => {
    return (
        <>
            <Box
                id="hero"
                sx={(theme) => ({
                    width: '100%',
                    backgroundImage:
                        theme.palette.mode === 'light'
                            ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
                            : `linear-gradient(#02294F, ${alpha('#090E10')})`,
                    backgroundSize: '100% 20%',
                    backgroundRepeat: 'no-repeat',
                })}
            >
                <Menu/>

            </Box>
        </>

    );
};

export default Trial;