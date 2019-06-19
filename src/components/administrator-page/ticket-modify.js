import React, { Component } from 'react'
import { Input, Button, Icon, Modal } from 'antd';
import LoadingIcon from '../loading-icon/LoadingIcon';
import axios from 'axios';
import firebase from 'firebase'
const { TextArea } = Input
class TicketModify extends Component { 
    constructor(props) { 
        super(props) 
        this.state = { 
            info: [],
            infoChild: [],
            isLoading: true,
            isEditable: false,
            isSaveConfirm: false
            
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('access-token');
        if (!token) {
            this.props.history.push('/login');
        }
        
        axios.post(`http://localhost:4000/admin/authenticate`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res =>  {
            console.log('token này ok')
        }).catch(err => {
            console.log('token này không ok', err)
            this.props.history.push('/login');
        })
        
        document.title = 'Nội dung phần Giới thiệu'
        var contentData = firebase.database().ref('ticketcontent');
        contentData.on('value', (snapshot) => { 
            let line = snapshot.val();
            this.setState({
                info: line,
                isLoading: false
            })
        })
    }
    
    
    handleLabelName = label => { 
        label === "apply_date" ? label = 'Ngày áp dụng':
        label === "attention_info" ? label = 'Thông tin lưu ý':
        label === "purchase_location" ? label = 'Địa điểm mua vé':
        label === "adult" ? label = 'Người lớn':
        label === "children" ? label = 'Trẻ em':
        label === "note" ? label = 'Ghi chú':
        label = null
        return label
    }

    toggle = () => { 
        this.setState({isEditable : !this.state.isEditable})
        console.log('in ra xem thử : ',this.state.info)
    }

    onChangeInput = (event) => { 
        const { name,value } = event.target;
        var childProp = {...this.state.info.rules};
        childProp[name] = value;
        this.setState(prevState => ({
            info: { 
                ...prevState.info,
                [name]: value
            }
        }))
        
    console.log('state lúc này tại hàm parent ', this.state.info)
    
    }
    onChangeInputChild = (event) => { 
        const { name,value } = event.target;
        var childProp = {...this.state.info.rules};
        childProp[name] = value;
        this.setState (prevState => ({
            info: {
                ...prevState.info,
                rules: {
                    ...prevState.info.rules,
                    [name]: value
                }
            }
            }))
    console.log('state lúc này tại hàm child ', this.state.info);
    
    }

    updateUser = () => { 
        firebase.database().ref()
        .update({
            ticketcontent: this.state.info
        })
        .then(() => {
            this.saveSuccess();
            this.hideConfirm();
        }).then(() => {
            this.toggle();

        }).catch(err => { 
            console.log(err)
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
            title: 'Lưu thông tin thành công'
        });
    }
    render() { 
        const text = this.state.isLoading ? <LoadingIcon /> :
            Object.keys(this.state.info).map((data, index) => {
                    if(data !== 'rules'){
                        return (
                            <div key={index}>
                                <label htmlFor={data} >{this.handleLabelName(data)}</label>
                                <br />
                                <TextArea
                                    id={data}
                                    name={data}
                                    disabled={this.state.isEditable}
                                    onChange={this.onChangeInput}
                                    defaultValue={this.state.info[data]}
                                    style={{ marginBottom: '8px', maxWidth: '80%' }}
                                />
                            </div>
                        )
                    }
            })
        const child = this.state.isLoading ? <LoadingIcon /> :
        Object.keys(this.state.info.rules).map((data, index) => {
            return (
                <div key = {index}>
                <label  htmlFor = {data} >{this.handleLabelName(data)}</label>
                <br/>
                <TextArea
                    id = {data}
                    name = {data}
                    disabled = {this.state.isEditable}
                    onChange = {this.onChangeInputChild}
                    defaultValue={this.state.info.rules[data]}
                    style = {{marginBottom: '8px', maxWidth: '80%'}}
                /> 
                </div>
            )
        })
        return ( 
            <div>
                {text}
                {child}
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

export default TicketModify