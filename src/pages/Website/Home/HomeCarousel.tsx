import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import "./home.css";
const HomeCarousel = () => {

    return (
        <>
            <Carousel className={"carousel"} variant="light">
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src= {require( "../../../assets/img1.jpeg")}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h5>Visualización y análisis de redes metabólicas</h5>
                        <p>consultas</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={require( "../../../assets/img2.jpeg")}
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h5>Metabolitos, reacciones y enzimas</h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={require( "../../../assets/image3.jpeg")}
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h5>Third slide label</h5>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </>
    )
}

export default HomeCarousel;