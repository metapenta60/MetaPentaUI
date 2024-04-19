import React from 'react';
import {Textarea} from "@material-tailwind/react";
import {Button} from "antd";

const Menu = () => {
    return (
        <>
            <div className="flex items-center justify-center h-screen bg-white">
                <h2 className="text-black font-bold">Find metabolic path</h2>
            </div>

            <nav style={{
                height: '53vh',
                backgroundColor: 'whitesmoke',
                padding: '5px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexWrap: 'wrap'
        }}>

            <div style={{
                justifyContent: 'center',
                alignItems: 'center',
                maxWidth: '350px',
                backgroundColor: "whitesmoke",
                display: 'flex',
                flexDirection: 'column',
                padding: '20px',
                border: '1px solid black',
            }}>

                <h3>Initial metabolites</h3>
                <Textarea rows={5} size="lg" placeholder="Insert reaction" className="w-100"/>
                <h3>Target Metabolite</h3>
                <Textarea rows={1} size="lg" placeholder="Insert target metabolite" className="w-100"/>
                {/* Buttons Row */}
                <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                    <Button type="default" size="large">
                        Upload file
                    </Button>
                    <Button type="default" size="large">
                        Find path
                    </Button>
                    <Button type="default" size="large">
                        Download
                    </Button>
                </div>
            </div>

            <div style={{
                justifyContent: 'center',
                alignItems: 'center',
                maxWidth: '350px',
                backgroundColor: "whitesmoke",
                display: 'flex',
                flexDirection: 'column',
                padding: '20px',
                border: '1px solid black',
                height: '100%'
            }}>
                <h3 className="font-black">Find Reactions</h3>
                <h5>Find the reactions of a metabolite</h5>
                <Textarea rows={1} size="lg" placeholder="Metabolite" className="w-100"/>

                <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                    <Button type="default" size="large">
                        Find
                    </Button>
                    <Button type="default" size="large">
                        Download
                    </Button>
                </div>
            </div>
            <div style={{
                justifyContent: 'center',
                alignItems: 'center',
                maxWidth: '350px',
                backgroundColor: "whitesmoke",
                display: 'flex',
                flexDirection: 'column',
                padding: '20px',
                border: '1px solid black',
            }}>
                <h3 className="font-black">Another future</h3>
                <h5>Find the reactions of a metabolite</h5>
                <Textarea rows={1} size="lg" placeholder="Metabolite" className="w-100"/>

                <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                    <Button type="default" size="large">
                        Find
                    </Button>
                    <Button type="default" size="large">
                        Download
                    </Button>
                </div>
            </div>

        </nav>
            <hr/>
        </>
    );
}

export default Menu;