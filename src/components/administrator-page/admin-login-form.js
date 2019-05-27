import React, { Component } from 'react'
import axios from 'axios';
import './App.css';
import { Form, Icon, Input, Button, Row, Col, Typography } from 'antd';
import  { Redirect } from 'react-router-dom';
const {Text} = Typography;

class AdminLoginForm extends Component {
    constructor(props) { 
        super(props);
        this.state = { 
            Username: '',
            Password: '',
            loginAlert: '', // dùng để hiện ra dòng thông báo khi sách nhập sai tài khoản/mật khẩu
            isLogged: false
        }
    }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Username và password: ', values);

        this.setState({ 
            Username: values.username,
            Password: values.password
        }, () => {
            axios.post(`http://localhost:4000/admin`, {
               params: this.state
           })
           .then(res => {
               console.log('đăng nhập thành công')
               this.setState({
                   isLogged: true
               })
           }).catch(err => { 
            if(err.response.status === 404)
            this.setState({
                loginAlert: err.response.data
            })
           })
        })
      }
    });
  };

    render() {
        const { isLogged } = this.state;
        if(isLogged ) { 
            return <Redirect to = "/admin" />
        } 
        const { getFieldDecorator } = this.props.form;
        return (
            <div className = 'layout'>
                <Row>
                    
                    <Col offset={8} span={8}>
                    <p align = 'center'
                        style = {{color: '#389e0d', fontSize: '24px'}}
                        >Trang quản lý</p>

                        <Form
                            onSubmit={this.handleSubmit}
                            className="login-form">
                            <Form.Item>
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: 'Hãy nhập tài khoản' }],
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Tài khoản"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: 'Hãy nhập mật khẩu' }],
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="Mật khẩu"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Log in </Button>
                            </Form.Item>
                            <Text type = "danger"> {this.state.loginAlert} </Text>
                        </Form>
                    </Col>
                </Row>
            </div>

        );
    }
}

const WrappedNormalLoginForm = Form.create()(AdminLoginForm);

export default WrappedNormalLoginForm