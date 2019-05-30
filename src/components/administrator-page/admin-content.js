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

    // componentDidMount () {
    //     axios.get()
    // }
    render() {
        return (
            <Layout>
                    <Content style={{ margin: '0 16px' }}>
                        <div style = {{margin: '40px'}}>
                            <UserInformation info = {this.props.data}/>
                        </div>
                    </Content>
            </Layout>
        )
    }
}

export default AdminContent
