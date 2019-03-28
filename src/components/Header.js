import React, {Component} from 'react';

import { Layout, Menu} from 'antd';
import '../App.css';

const SubMenu = Menu.SubMenu;

const {
    Header
} = Layout  // làm vầy để khỏi làm giống như bootstrap, chẳng hạn Layout.Item,...


class PageHeader extends Component { 
    render() {
        return (
            <Layout>
                <Header style={{ position: "fixed", zIndex: 1, width: '100%'}}>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            style={{ lineHeight: '64px', fontSize: 15 }}
                            
                            
                        >

                        <Menu.Item key="keyHome" defaultSelectedKeys="keyHome" >
                            <span>Trang chủ </span>
                        </Menu.Item>
                        <Menu.Item key="keyIntroduction" >
                            <span>Giới thiệu </span>
                        </Menu.Item>
                        <Menu.Item key="keyServiceandGame" >
                            <span>Dịch vụ & trò chơi</span>
                        </Menu.Item>
                        <Menu.Item key="keyContact" >
                            <span>Liên hệ</span>
                        </Menu.Item>
                        <Menu.Item key="keyPrice" >
                            <span>Giá vé </span>
                        </Menu.Item>

                        <SubMenu
                            key="keyBookticket"
                            title={<span>Đặt vé online</span>}
                        >

                            <Menu.Item key="keyBookticket1" >
                                Đặt vé lẻ
                            </Menu.Item>
                            <Menu.Item key="keyBookticket2" >
                                Đặt vé đoàn  
                                {/* từ từ làm cái này  */}
                            </Menu.Item>

                        </SubMenu>
                       

                        <Menu.Item key="keyAbout" >
                            <span>About us</span>
                        </Menu.Item>

                        </Menu>
                </Header>
            </Layout>
            
        )
    }
}


export default PageHeader