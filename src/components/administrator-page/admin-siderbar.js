import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
import { Link,withRouter } from 'react-router-dom'

const { SubMenu } = Menu;
const { Sider } = Layout;
class AdminSider extends Component  {
    constructor(props){
        super(props)
        this.state = { 

        }
    }
    logOut = () => { 
        const token = localStorage.getItem('access-token')
        if(token){
            localStorage.removeItem('access-token');
            
        }
        this.props.history.push('/login');
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
                            <Link to = "user" >
                            <Icon type="user" />
                            <span>Thông tin cá nhân</span>
                            </Link>
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
                            <Menu.Item key="homepage">
                            <Link to = "home-modify">Trang chủ</Link>
                            </Menu.Item>

                            <Menu.Item key="introduction">
                            <Link to = "introduction-modify"></Link>
                            Giới thiệu</Menu.Item>


                            <Menu.Item key="contact">
                            <Link to = "contact-modify"></Link>
                            Liên hệ</Menu.Item>

                            <Menu.Item key="ticket-price">
                            <Link to = "ticket-modify"></Link>
                            Giá vé</Menu.Item>

                            

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
                            <Menu.Item key="addGame">
                            <Link to = "add-game"></Link>
                                Thêm trò chơi
                            </Menu.Item>
                            
                        </SubMenu>
                        <Menu.Item key="logout"
                        onClick = {this.logOut}
                        >
                        <Icon type="logout" />
                            <span>Đăng xuất</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
        )
    }
}

export default withRouter(AdminSider )