import React, {Component} from 'react'
import { Input, Modal, Button } from 'antd'
import axios from 'axios'
const { TextArea } = Input
class AddGame extends Component { 
    constructor(props) {
    super(props)
        this.state = { 
            gameName: '',
            gameAdultPrice: 0,
            gameChildrenPrice: 0,
            gameNote: '',
            gameImg: '',
            gameImgName: '',
            isSaveConfirm: false
        }
    }

    componentDidMount() { 
        document.title = 'Thêm trò chơi'
        const token = localStorage.getItem('access-token');
        if (!token) {
            this.props.history.push('/login');
        }
        
        axios.post(`http://localhost:4000/admin/info`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => { 
            console.log('token này ok!');
        }).catch(err => {
            console.log('token này hết hạn rồi! ', err)
            this.props.history.push('/login');
        })
    }
    onChangeInput = (event) => {
        const {name, value} = event.target 
        
        this.setState({
            [name]: value 
        })
        
    }
    onChangeFile = (event) => { 
        console.log(event.target.files.length)
        this.setState({
            gameImg: event.target.files[0],
            gameImgName:event.target.files[0].name
        })
        console.log('tên hình: ', event.target.files[0].name);
    }

    handleAddGame = () => {
        
        var formData = new FormData();
        formData.append("image", this.state.gameImg, this.state.gameImg.name)
        console.log('form data: ', formData);
        
        axios.post(`http://localhost:4000/admin/addimage`,formData
        )
        .then(res => { 
            console.log('xong cái add hình, tên hình :', res.data.imageUrl);
            this.setState({
                gameImgName: res.data.imageUrl
            })
            axios.post(`http://localhost:4000/admin/addgame`, {
                params: this.state
            }).then(res => {
                console.log('xong cái add game', res.data)
                this.saveSuccess();
                this.hideConfirm();
            }).catch(err => {
                console.log(err)
            })
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
        return (
            <div>
                <Input
                    style={{ marginBottom: '20px' }}
                    name='gameName'
                    addonBefore='Tên trò chơi'
                    key='name'
                    onChange = {this.onChangeInput}
                />

                <Input
                    style={{ marginBottom: '20px' }}
                    type='number'
                    name='gameAdultPrice'
                    addonBefore='Giá vé (người lớn)'
                    key='adult'
                    onChange = {this.onChangeInput}
                />
                <br />
                <Input
                    style={{ marginBottom: '20px' }}
                    type='number'
                    name='gameChildrenPrice'
                    addonBefore='Giá vé (trẻ em)'
                    key='children'
                    onChange = {this.onChangeInput}
                />
                <br />
                <label
                    htmlFor='note'>
                    Ghi chú
                </label>
                <TextArea
                    id='note'
                    style={{ marginBottom: '20px' }}
                    name='gameNote'
                    key='note'
                    onChange = {this.onChangeInput}
                />
                <div>
                <input style={{ width: '200px' }}
                    type="file"
                    onChange = {this.onChangeFile}
                />
                </div>
                
                
                <div style={{ textAlign: 'right' }}>

                    <Button
                        type="primary"
                        onClick={this.showConfirm}
                    >
                        Thêm
                    </Button>

                </div>
                <Modal 
                      title = 'Xác nhận'
                      visible = {this.state.isSaveConfirm}
                      onOk = {this.handleAddGame}
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

export default AddGame