import React, { Component } from 'react'
import { Input, Button, Icon, Modal } from 'antd';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import LoadingIcon from '../loading-icon/LoadingIcon'

class UserInformation extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            isLoading: true,
            userInfo : {},
            allUserInfo: [],
            keyObj: [],
            isEditable: false,
            isSaveConfirm: false
        }
    }
    componentDidMount() {
        document.title = 'Thông tin cá nhân'
        const token = localStorage.getItem('access-token');
        if (!token) {
            this.props.history.push('/login');
        }
        
        axios.post(`http://localhost:4000/admin/info`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => { 
            console.log('token này ok!', res.data.sentData[0]);
            
            this.setState({
                userInfo: res.data.sentData[0],
                isLoading: false
            })
        }).catch(err => {
            console.log('token này hết hạn rồi! ', err)
            this.props.history.push('/login');
        })

    }
    
    handleLabelName = (labelName) => { 
        labelName === 'Gender' ? labelName = 'Giới tính' :
        labelName === 'Password' ? labelName = 'Mật khẩu' :
        labelName === 'EmployeeName' ? labelName = 'Họ tên':
        labelName === 'EmployeeID' ? labelName = 'ID' :
        labelName === 'Birthday' ? labelName = 'Ngày sinh' :
        labelName === 'Phone' ? labelName = 'Số điện thoại' :
        labelName === 'Address' ? labelName = 'Địa chỉ' :
        labelName === 'ModifyDate' ? labelName = 'Ngày chỉnh sửa cuối cùng' 
        : labelName = null;
        return labelName
    }

    toggle = () => { 
        this.setState({isEditable : !this.state.isEditable})
        console.log(this.state.isEditable)
    }

    onChangeInput = (event) => { 
        const { name,value } = event.target;
        this.setState(prevState => ({
            userInfo: { 
                ...prevState.userInfo,
                [name]: value
            }
        }))
    console.log('khi thay đổi :',this.state.userInfo)
    console.log('cái được thay đổi: ',event.target.name)
    }

    updateUser = () => { 
        axios.post(`http://localhost:4000/admin/saveuser`, {
        params: this.state.userInfo
        }).then(response => {
            this.hideConfirm();
            this.saveSuccess();
        }).catch(err => { 
            console.log(err)
            this.saveError();
        })
    }

    hideConfirm = () => { 
        this.setState({
            isSaveConfirm: false
        })

    }

    showConfirm = () =>  {
        this.setState({
            isSaveConfirm: true
        })
    }
    
    saveError = () => { 
        Modal.error({ 
            title :"Lỗi",
            content: 'Không thể lưu những thay đổi'
        })
    }

    saveSuccess = () => {
        Modal.success({
            title: 'Lưu thông tin thành công. Vui lòng đăng nhập lại',
            onOk() {
                localStorage.removeItem('access-token');
                
            }
        });
        
    }

    render(){ 
        const user = this.state.isLoading ? <LoadingIcon /> : 
        Object.keys(this.state.userInfo).map((key, index) => {
            return (
                key !== 'Password' && key !== 'IsUsed' ? 
                    key === 'EmployeeID' || key === 'ModifyDate'  ? 
                     <Input
                        name = {key}
                        disabled
                        addonBefore={this.handleLabelName(key)}
                        onChange = {this.onChangeInput}
                        key = {index}
                        defaultValue={this.state.userInfo[key] }
                        style = {{marginBottom: '8px', maxWidth: '80%'}} />
                :
                key === 'Birthday' ? 
                <Input
                    name = {key}
                    disabled = {this.state.isEditable}
                    addonBefore={this.handleLabelName(key)}
                    onChange = {this.onChangeInput}
                    key = {index}
                    defaultValue={this.state.userInfo[key].toLocaleString('vi-vn')}
                    style = {{marginBottom: '8px', maxWidth: '80%'}}
                    /> :  <Input
                    name = {key}
                    disabled = {this.state.isEditable}
                    addonBefore={this.handleLabelName(key)}
                    onChange = {this.onChangeInput}
                    key = {index}
                    defaultValue={this.state.userInfo[key] }
                    style = {{marginBottom: '8px', maxWidth: '80%'}}
                    /> 
                : null
                )
        })
        
        return (
            <div>
                      {user}
                <div style={{ textAlign: 'right' }}>
                    <Button
                        type="primary"
                        onClick={this.toggle}
                        style={{ marginRight: '10px' }}
                    >
                        <Icon type="edit" />
                    </Button>

                    <Button
                        type="primary"
                        onClick={this.showConfirm}
                    >
                        SAVE
                    </Button>
                </div>

                      <Modal 
                      title = 'Xác nhận'
                      visible = {this.state.isSaveConfirm}
                      onOk = {this.updateUser}
                      onCancel = {this.hideConfirm}
                      okText = "OK"
                      cancelText = "Cancel"
                      >
                        Những thay đổi này sẽ không thể hoàn lại
                      </Modal>
                       
            </div>
        )
    }
}

export default withRouter(UserInformation)

