import React, { Component } from 'react'
import { Layout } from 'antd';
import AdminSider from './admin-siderbar';
import AdminLoginForm from './admin-login-form';
import AdminContent from './admin-content';
import { Redirect } from 'react-router-dom'
class AdminLayout extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        console.log('tại admin layout: ',this.props.location.state.info);
        return (
            this.props.location.state !== undefined ? 
            <Layout style={{ minHeight: '100vh', marginTop: '14px' }}>
                <AdminSider />
                <Layout>
                    <AdminContent  data = {this.props.location.state.info } />
                </Layout>
            </Layout> : <Redirect 
            to = {{
                pathname: '/login',
                state: {
                    loginMessage: 'Bạn chưa đăng nhập!'
                }
                }} />
        )
    }
}

export default AdminLayout