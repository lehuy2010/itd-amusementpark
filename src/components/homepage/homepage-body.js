
import React, { Component } from 'react'
import './App.css';
import Slider from './homepage-slider'
import Content from './homepage-content'
import {withRouter} from 'react-router-dom'
class Homepage extends Component {
    constructor() {
        super();
        this.state = {
        }
    }   
    componentDidMount() {
        document.title = 'iTD Amusement Park'
    }
    render() {
        return (
            <div>
                <Slider />
                <div className = 'big-push'></div>
                <Content />
                
            </div>

        )
    }
}
export default withRouter(Homepage)