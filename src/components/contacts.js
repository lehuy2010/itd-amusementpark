
import React, { Component } from 'react';
import '../App.css';
import { Icon } from 'antd'
class Contact extends Component {
    componentDidMount () {
        document.title = 'Liên hệ'
    }
    render() {
        return (
            <div style = {{
                marginTop: '100px',
                marginBottom: '145px',
                fontSize : '28px',
                textAlign: 'center'
            }}>
            <h3><b>iTD Amusement Park</b></h3>
            <h3>01 Sáng Tạo, Khu chế xuất Tân Thuận, Tân Thuận Tây Quận 7</h3> 
            <h3>034.799.1447 / nguyenlehuy1101@gmail.com</h3>
            </div>
        )
    }
}

export default Contact