import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
const { SubMenu } = Menu;
const { Sider } = Layout;
class AdminSider extends Component  {
    constructor(props){
        super(props)
        this.state = { 

        }
    }
    render() {
        return (
            <Sider 
            width = {250}
            style = {{marginBottom: '5px'}}>
                    <Menu theme="dark"
                    defaultSelectedKeys={['personalInformation']}
                    mode="inline"
                    >
                        <Menu.Item key="personalInformation">
                            <Icon type="user" />
                            <span>Thông tin cá nhân</span>
                        </Menu.Item>
                        
                        <SubMenu
                            key="modifyContent"
                            title={
                                <span>
                                    <Icon type="edit" />
                                    <span>Chỉnh sửa nội dung trang</span>
                                </span>
                            }
                        >
                            <Menu.Item 
                            key="homepage"
                            >Trang chủ</Menu.Item>

                            <Menu.Item 
                            key="introduction"
                            >Giới thiệu</Menu.Item>

                            <Menu.Item 
                            key="game-service"
                            >Trò chơi & dịch vụ</Menu.Item>

                            <Menu.Item 
                            key="contact"
                            >Liên hệ</Menu.Item>

                            <Menu.Item 
                            key="ticket-price"
                            >Giá vé</Menu.Item>

                            <Menu.Item 
                            key="book-ticket"
                            >Đặt vé Online</Menu.Item>

                            <Menu.Item 
                            key="about-us"
                            >About Us</Menu.Item>
                        </SubMenu>

                        <SubMenu
                            key="addContent"
                            title={
                                <span>
                                    <Icon type="plus" />
                                    <span>Thêm hạng mục</span>
                                </span>
                            }
                        >
                            <Menu.Item key="addGame">Thêm trò chơi</Menu.Item>
                            
                        </SubMenu>
                        <Menu.Item key="9">
                            <Icon type="file" />
                            <span>File</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
        )
    }
}

export default AdminSider 