import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import { Layout, Menu, Icon} from 'antd';

const {
    Header
} = Layout  // làm vầy để khỏi làm giống như bootstrap, chẳng hạn Layout.Item,...
class PageHeader extends Component { 
    render() {
        return (

            <Layout theme = 'light'>
                <Header 
                style={{ position: "fixed", zIndex: 1, width: '100%'}}>
                <div>
                <Menu
                            theme = 'dark'
                            mode="horizontal"
                            style={{ lineHeight: '64px', fontSize: 15 }}
                            defaultSelectedKeys={["keyHome"]}
                        >

                        <Menu.Item key="keyHome" >
                            <Link to = "/" > Trang chủ </Link>
                        </Menu.Item>
                        <Menu.Item key="keyIntroduction" >
                            <Link to = "/introduction" > Giới thiệu </Link>
                        </Menu.Item>

                        <Menu.Item key="keyServiceandGame" >
                            <Link to = "/games" > Trò chơi & dịch vụ</Link>
                        </Menu.Item>

                        <Menu.Item key="keyContact" >
                            <Link to = "/contact" > Liên hệ </Link>
                        </Menu.Item>

                        <Menu.Item key="keyPrice" >
                            <Link to = "/prices" > Giá vé </Link>
                        </Menu.Item>

                        <Menu.Item key="keyBookticket" >
                            <Link to = "/book" >Đặt vé Online</Link>
                        </Menu.Item>

                        <Menu.Item key="keyAbout" >
                            <Link to =  "/about-us" > About Us </Link> 
                        </Menu.Item>
                        <Menu.Item    
                            style = {{position: 'absolute', top: '0', right: '0'}}    //luôn nằm ở góc phải trên                    
                            key="keyAdmin" >
                            <Icon type="user" style = {{fontSize: '28px', marginLeft: '10px'}}/>
                            <Link to = "/login" ></Link>
                        </Menu.Item>
                        </Menu>
                </div>
                       
                        
                </Header>
            </Layout>

        )
    }
}


export default PageHeader