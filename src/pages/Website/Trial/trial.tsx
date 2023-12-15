import React from "react";
import {Link} from "react-router-dom";

import "./trial.css";

import {Button} from "antd";
import Sketch from "./sketch";
import Navbar from "react-bootstrap/Navbar";
import SideNavBar   from "../../../components/ui/sideBar/sideNavBar";
const Trial: React.FC = () => {
    return (
        <div className="float-container">

            <div className="float-child-left" style={{backgroundColor:"black", maxWidth: '350px'}}>
                    <SideNavBar/>
            </div>
            <div className="float-child-right" style={{backgroundColor:"black"}}>
                    <Sketch/>
            </div>

        </div>
    );
};

export default Trial;