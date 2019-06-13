import React, { Component } from 'react'
import axios from 'axios';
import './App.css';
import { Form, Icon, Input, Button, Row, Col, Typography, Alert } from 'antd';
import { withRouter } from 'react-router-dom'
const {Text} = Typography;

class AdminLoginForm extends Component {
    constructor(props) { 
        super(props);
        this.state = { 
            Username: '',
            Password: '',
            loginAlert: '', // dùng để hiện ra dòng thông báo khi sách nhập sai tài khoản/mật khẩu
            isLogged: false,
            adminInfo: {}
        }
    }

    componentDidMount () {
        const token = localStorage.getItem('access-token');
        if (token !== null) {
            axios.post(`http://localhost:4000/admin/authenticate`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res =>  {
                console.log('ok')
                this.props.history.push("/user");
            }).catch(err => {
                console.log('có lỗi!', err)
            })
        }
       
    }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        
        this.setState({ 
            Username: values.username,
            Password: values.password
        }, () => {
            axios.post(`http://localhost:4000/admin/login`, {
               password: this.state.Password,
               username: this.state.Username
           })
           .then(response => {
               localStorage.setItem('access-token', response.data.token);
            this.props.history.push("/user");
           }).catch(err => {
               console.log('lỗi:',err.response.data.error);
                    this.setState({
                    loginAlert: err.response.data.error
                })
        })
      })
    };
  });
  }
    render() {
        document.title = 'Quản trị'
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
                            {this.props.location.state !== undefined ? 
                            <Alert message = {this.props.location.state.loginMessage}
                            type = "error"
                            showIcon 
                            closable
                            />  : null
                            }
                            <Text type = "danger"> {this.state.loginAlert} </Text>
                        </Form>
                    </Col>
                </Row>
            </div>

        );
    }
}

const WrappedNormalLoginForm = Form.create()(AdminLoginForm);

export default withRouter(WrappedNormalLoginForm)