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

            <div className="float-child-left">
                <div className="green">
                    <SideNavBar/>
                </div>
            </div>

            <div className="float-child-right">
                <div className="my-4 mx-2">
                    <Sketch/>
                </div>
            </div>

        </div>
    );
};

export default Trial;