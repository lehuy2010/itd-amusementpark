import React, { Component } from 'react'
import { Input, Button, Icon, Modal } from 'antd';
import LoadingIcon from '../loading-icon/LoadingIcon';
import firebase from 'firebase'
import axios from 'axios'
const { TextArea } = Input
class HomepageModify extends Component { 
    constructor(props) { 
        super(props) 
        this.state = { 
            info: [],
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
        document.title = 'Nội dung phần Trang Chủ'
        var contentData = firebase.database().ref('homecontent');
        contentData.on('value', (snapshot) => { 
            let line = snapshot.val();
            this.setState({
                info: line,
                isLoading: false
            })
        })
    }

    handleLabelName = label => { 
        label === "homepage_title_1" ? label = 'Tựa đề 1':
        label === "homepage_title_2" ? label = 'Tựa đề 2':
        label === "homepage_subtitle" ? label = 'Tựa đề phụ':
        label === "homepage_game_title" ? label = 'Tựa đề phần trò chơi'
        : label = null
        return label
    }

    toggle = () => { 
        this.setState({isEditable : !this.state.isEditable})
    }

    onChangeInput = (event) => { 
        const { name,value } = event.target;
        this.setState(prevState => ({
            info: { 
                ...prevState.info,
                [name]: value
            }
        }))
        
    console.log('cái được thay đổi: ',event.target.name)
    console.log('khi thay đổi :',event.target.value)
    
    
    }

    updateUser = () => { 

        firebase.database().ref()
        .update({
            homecontent: this.state.info
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
                return (
                    <div key = {index}>
                    <label  htmlFor = {data} >{this.handleLabelName(data)}</label>
                    <br/>
                    <TextArea
                        id = {data}
                        name = {data}
                        disabled = {this.state.isEditable}
                        onChange = {this.onChangeInput}
                        defaultValue={this.state.info[data]}
                        style = {{marginBottom: '8px', maxWidth: '80%'}}
                    /> 
                    </div>
                    
                )
            })

        return ( 
            <div>
                {text}
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

export default HomepageModify