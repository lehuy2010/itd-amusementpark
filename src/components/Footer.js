import React, { Component } from 'react'

import '../App.css'


import {
    Layout, Icon
} 
from 'antd';

const {
    Footer 
} = Layout;

class PageFooter extends Component {
    
    render() {
        return (
            <Footer className = 'footer-modify'>   

            <Icon type="twitter" className = 'icon-modifier'/>
            <Icon type="youtube" className = 'icon-modifier'/>
            <Icon type="facebook" className = 'icon-modifier'/>
            <Icon type="instagram"className = 'icon-modifier' />       

            &copy; {new Date().getFullYear()} Copyright: nguyenlehuy1101@gmail.com
    
            </Footer>
        )
    }
}

export default PageFooter