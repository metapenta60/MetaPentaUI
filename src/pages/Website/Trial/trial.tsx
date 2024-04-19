import React from "react";
import {Link} from "react-router-dom";

import "./trial.css";

import {Button} from "antd";
import Sketch from "./sketch";
import Navbar from "react-bootstrap/Navbar";
import SideNavBar   from "../../../components/ui/sideBar/sideNavBar";
import Barra from "../../../components/ui/navBar/barra";
import Menu from "../../../components/ui/menu";
const Trial  = () => {
    return (
        <>

            <div className="flex flex-row h-screen bg-white">
                <div className="float-child-left" style={{backgroundColor:"black"}}>
                        <Menu/>
                </div>


                <div className="float-child-right" style={{backgroundColor:"black"}}>
                        <Sketch/>
                </div>
            </div>
        </>

    );
};

export default Trial;