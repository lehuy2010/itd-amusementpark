import React, { Component } from 'react'

import '../App.css'

import socialMediaData from '../files/social-media-links.json'
import {
    Layout, Icon
} 
from 'antd';

const {
    Footer 
} = Layout;

class PageFooter extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            iconLink: ''
        } 
    }
    render() {
        return (
            <Footer className = 'footer-modify'> 

            <a href = {socialMediaData.twitter.link} target="_blank" rel="noopener noreferrer">
            <Icon type={socialMediaData.twitter.type}
            className= 'icon-modifier' />
            </a>

            <a href = {socialMediaData.youtube.link} target="_blank" rel="noopener noreferrer">
            <Icon type={socialMediaData.youtube.type}
            className = 'icon-modifier'
            />
            </a> 

            <a href = {socialMediaData.facebook.link} target="_blank" rel="noopener noreferrer">
            <Icon type={socialMediaData.facebook.type}
            className = 'icon-modifier'
            />
            </a> 

            <a href = {socialMediaData.instagram.link} target="_blank" rel="noopener noreferrer">
            <Icon type={socialMediaData.instagram.type}
            className = 'icon-modifier'
            style = {{marginRight: 30}}
            />
            </a> 
            

            &copy; {new Date().getFullYear()} Copyright: Huy Lê. All rights reserved
    
            </Footer>
        )
    }
}

export default PageFooter