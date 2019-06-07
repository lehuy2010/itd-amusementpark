import React, { Component } from 'react'
import { Layout } from 'antd';
import UserInformation from './user-information'
import axios from 'axios'
const { Content } = Layout;

class AdminContent extends Component { 
    constructor () { 
        super()
        this.state = { 
           
        }
    }
    componentDidMount() {
        const token = localStorage.getItem('access-token');
        axios.post('http://localhost:4000/admin/info',{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res =>  {
            this.setState({
                adminInfo: res.data
            })
        }).catch(err => {
            localStorage.removeItem('access-token');
            this.props.history.push('/login');
        })
    }
    render() {
        return (
            <Layout>
                    <Content style={{ margin: '0 16px' }}>
                        <div style = {{margin: '40px'}}>
                           <UserInformation />
                        </div>
                    </Content>
            </Layout>
        )
    }
}

export default AdminContent
