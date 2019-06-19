import React, { Component } from 'react'
import { Layout } from 'antd';
import AdminSider from './admin-siderbar';
import { withRouter } from 'react-router-dom'
const { Content } = Layout;
class AdminLayout extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount () { 
        const token = localStorage.getItem('access-token');
        
        if (!token){
            this.props.history.push('/login');
        }
    }

    render() {
        
        return (
            
            <Layout style={{ minHeight: '100vh', marginTop: '14px' }}>
                <AdminSider />
                <Content style={{ margin: '0 16px' }}>
                    <div style={{ margin: '40px' }}>
                        {this.props.children}
                    </div>
                </Content>
            </Layout> 
            
        )
    }
}

export default withRouter(AdminLayout)