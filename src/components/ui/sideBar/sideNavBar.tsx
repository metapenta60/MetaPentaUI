import React from 'react';
import { Textarea } from "@material-tailwind/react";

import {Button} from "antd";
import P5 from "../../../pages/Website/p5/p5";

import "./sideNavBar.css";
const SideNavBar: React.FC = () => {
    return (
        <nav style={{ height: '100%', backgroundColor: '#282c34', padding: '10px',maxWidth: '350px',justifyContent:'center',alignItems: 'center' }}>

            <h2 className="text-white">Find metabolic path</h2>

            <div style={{ justifyContent: 'center',alignItems: 'center', maxWidth: '350px', margin: '0 auto', backgroundColor:"whitesmoke" }} >
                <h3>Initial metabolites</h3>

                <Textarea rows={5} size="lg" placeholder="Insert reaction" className="w-100"  />

                <br/>

                <h3 >Target Metabolite</h3>

                <Textarea rows={1} size="lg" placeholder="Insert target metabolite" className="w-100"  />

                <br/>

                <div style={{display: 'flex', maxWidth: '350px', margin: '0 auto',justifyContent:'center',alignItems: 'center' }} >

                    <Button type="default" size="large" block>
                        Upload file
                    </Button>

                    <Button type="default" size="large" block>
                        Find path
                    </Button>

                    <Button type="default" size="large" block>
                        download
                    </Button>

                </div>

            </div>

            <br/>

            <h3 className="text-white">Find Reactions</h3>

            <div style={{ justifyContent: 'center',alignItems: 'center', maxWidth: '350px', margin: '0 auto',backgroundColor:"whitesmoke" }} >

                <h5>Find the reactions of a metabolite</h5>
                <Textarea rows={1} size="lg" placeholder="Metabolite" className="w-100"  />

                <br/>

                <div style={{display: 'flex', justifyContent: 'center', maxWidth: '350px', margin: '0 auto' }} >
                    <Button type="default" size="large" block>
                        Find
                    </Button>

                    <Button type="default" size="large" block>
                        Download
                    </Button>

                </div>

            </div>

        </nav>
    );
};

export default SideNavBar;
