import React from 'react';
import { Textarea } from "@material-tailwind/react";

import {Button} from "antd";
import Sketch from "../../../pages/Website/Trial/sketch";

import "./sideNavBar.css";
const SideNavBar: React.FC = () => {
    return (
        <nav style={{ height: '100%', backgroundColor: '#282c34', color: 'white', padding: '20px' }}>
            <div className="bg-cyan-50">
                <h2>Find metabolic path</h2>

                <Textarea rows={5} size="lg" placeholder="Insert reaction" className=""  />

                <h5>Target Metabolite</h5>

                <Textarea rows={5} size="lg" placeholder="Insert reaction" className=""  />
            </div>


            <div className="float-container">

                <div className="float-child-left">
                    <Button type="default" size="large" block>
                        Find path
                    </Button>
                </div>

                <div className="float-child-right">
                    <Button type="default" size="large" block>
                        download
                    </Button>
                </div>

            </div>
        </nav>
    );
};

export default SideNavBar;
