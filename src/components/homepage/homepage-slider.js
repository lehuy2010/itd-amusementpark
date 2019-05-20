import React, { Component } from 'react'
import './App.css';
import { Carousel } from 'antd'
class Slider extends Component {
    constructor() {
        super();
        this.state = {

        }
        
    }

    render() {
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
          };
        return (
          <Carousel {...settings}
            className= 'homepage-slide'
            autoplay = 'true'
            >
            <div>
                <img src={require('./images/image2.jpg')} className='picture-home' alt = ''/>    
            </div>
            <div>
                <img src={require('./images/image1.jpg')} className='picture-home' alt = '' />    
            </div>
            <div>
                <img src={require('./images/image3.jpg')} className='picture-home' alt = ''/>    
            </div>
                
            </Carousel>

        )
    }
}
export default Slider