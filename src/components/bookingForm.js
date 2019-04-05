import React, { Component } from 'react';
import moment from 'moment';
import '../App.css';
import {
    Form, Input, Col,  Select,DatePicker, Row,
    InputNumber,
    Button
} from 'antd';
import axios from 'axios'
import QRCode from 'qrcode.react'

/*eslint-disable */
const { Option } = Select;

const dateFormat = 'DD-MM-YYYY'
class BookForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            customerName: "",
            customerEmail: "",
            phoneInput: "",
            customerID: "",
            ticketArray: [],  // biến này chỉ dùng để bỏ chuỗi loại vé vào rồi render ra màn hình
            ticketType: "",   // dùng để lưu loại vé đang được chọn
            ticketDate: moment(),
            ticketNumber: 0,
            ticketQR: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleDate = this.handleDate.bind(this)
        this.handleNumberChange = this.handleNumberChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
        this.disableDate = this.disableDate.bind(this)
    }

    

    componentDidMount() {
        axios.get(`http://localhost:4000/ticket`)
        .then(response => {
            // this.setState({
            //     ticketArray: response.data
            // })
            this.setState({
                ticketArray: response.data
            })
        })
        .catch(error => {
            console.log("GET thất bại", error);
        })
    }

    handleChange (event) {
        const {name, value} = event.target
            // [value.customerID]: value.customerID.replace(/\D/, '')
        // type === "date" ?
        //  this.setState({
        //     [name]: value.format()
        // })
        // :
        // this.setState ({
        //     [name]: value
        // }) 
        this.setState({
            [name]: value
        })
    }

  

    handleNumberChange (value) {
        console.log("số đổi thành : " + value );
        this.setState ({
            ticketNumber : value
        })
       
    }

    handleSubmit (e) {
        e.preventDefault();
            axios.post(`http://localhost:4000/ticket/submit`,{
                     params: this.state
            }).then(res => {
                console.log(res);
                console.log('đây là data: ',res.data);
                this.setState ({
                    ticketQR: res.data
                })
            })
        
    }

    handleDate (date) {
        // console.log("này là value1: " + date);
        // console.log(date)
        let newDate = date
        // let formattedDate = this.state.ticketDate
        // console.log(formattedDate)
        this.setState({
            ticketDate: newDate
        })
    }

    disableDate(current) {
        let today = '05-04-2019'
        return current && current < moment(today, dateFormat);
    }
       


    handleSelect (value) {
        console.log("giá trị trong mục loại vé :  "+  value)
        this.setState ({
            ticketType: value
        })
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Row>
                <Col span={12} offset={6} className="form-modify">
                    <Form className='textbox-modify'
                    onSubmit = {this.handleSubmit}>
                        <Form.Item
                            label="Họ tên"
                            extra="Bạn nên điền họ và tên của NGƯỜI SẼ NHẬN VÉ"
                            hasFeedback
                        >
                        {getFieldDecorator('Họ tên', {
                            rules: [{
                                initialValue: this.state.customerName,
                                required: true, message: 'Vui lòng điền đầy đủ họ và tên',
                                whitespace: true 
                                }],
                        })(
                            <Input
                                name="customerName"
                                onChange={this.handleChange}
                                placeholder="Điền đầy đủ họ và tên của bạn" size="large" />
                        )}
                        </Form.Item>

                        <Form.Item
                            label="Số chứng minh nhân dân"
                            extra="Số chứng minh nhân dân sẽ được dùng để xác thực tại quầy bán vé"
                            hasFeedback
                        >
                        {getFieldDecorator('Số chứng minh nhân dân', {
                            rules: [{
                                initialValue: this.state.customerID,
                                type: "string",
                                max: 12, message: 'Số chứng minh nhân dân chỉ tối đa 12 kí tự ' },
                                {
                                    pattern: new RegExp("^[0-9]*$"),
                                    message: <div>Không đúng định dạng !</div>
                                },
                                {
                                required: true, message: 'Vui lòng điền đầy đủ số chứng minh nhân dân',
                                whitespace: true 
                                },
                                {}],
                        })(
                            <Input
                                name="customerID"
                                onChange={this.handleChange}
                            />
                        )}
                        </Form.Item>

                        <Form.Item
                            label="E-mail"
                            hasFeedback
                            extra="Quý khách vui lòng nhập đúng email để có thể nhận được mã vạch vào cổng"
                        >
                        {getFieldDecorator('E-mail', {
                            rules: [{
                                initialValue: this.state.customerEmail,
                                type: 'email', message: 'Email này không hợp lệ!',
                            },{
                                required: true, message: 'Email không được bỏ trống',
                            }],
                        })(
                            <Input
                                name="customerEmail"
                                onChange={this.handleChange}
                                placeholder="e.g: abc@example.com" size="large" />
                        )}
                        </Form.Item>

                        <Form.Item
                            label="Số điện thoại"
                            hasFeedback
                        >
                        {getFieldDecorator('Số điện thoại', {
                            rules: [{
                                initialValue: this.state.phoneInput,
                                type: "string",
                                max: 11, message: 'Số điện thoại chỉ tối đa 11 kí tự ' },
                                {
                                    pattern: new RegExp("^[0-9]*$"),
                                    message: <div>Không đúng định dạng !</div>
                                },
                                {
                                required: true, message: 'Vui lòng điền đúng số điện thoại',
                                whitespace: true 
                                },
                                ],
                        })(
                            <Input
                                placeholder="+84"
                                onChange={this.handleChange}
                                name="phoneInput"
                            />
                            )}
                        </Form.Item>

                        <Form.Item
                            label="Ngày tham quan"
                        >
                        {getFieldDecorator('Ngày tham quan', {
                            rules: [{
                                initialValue : this.state.ticketDate,
                                type: 'object', required: true, message: 'Please select time!'
                                }],
                        })(
                            <DatePicker
                                name="ticketDate"
                                onChange={date => this.handleDate(date)}
                                format={dateFormat}
                                disabledDate = {this.disableDate}
                            />
                        )}
                        </Form.Item>
                        
                        <Form.Item
                        label = "Mua vé"
                        >
                        {getFieldDecorator('Mua vé', {
                            rules: [{
                                required: true, message: 'Please select time!'
                                }],
                        })(
                        <Select 
                        style={{ width: 250 }}
                        name = "ticketType"
                        placeholder ="- Hãy chọn loại vé -" 
                        onChange = {this.handleSelect}>
                            {
                                this.state.ticketArray.map((content, index) => {
                                    return (
                                        <Option
                                            value={content.TicketName}
                                            key={index}>
                                            {content.TicketName}
                                        </Option>
                                    )
                                })}
                        </Select>
                        )}
                        </Form.Item>
                        <InputNumber
                            min={1}
                            max={10}
                            defaultValue={0}
                            name="ticketNumber"
                            value={this.state.ticketNumber}
                            onChange={this.handleNumberChange}
                        />
                        <br />
                        <br />

                        <Button
                            type="primary"
                            htmlType ="submit"  
                        >
                            Đặt vé
                      </Button>
                    </Form>
                    <div>
                        tên: {this.state.customerName} <br />
                        email: {this.state.customerEmail}<br />
                        sdt: {this.state.phoneInput}<br />
                        cmnd: {this.state.customerID}<br />
                     
                        số lượng: {this.state.ticketNumber}<br />
                        loại vé ĐƯỢC CHỌN: {this.state.ticketType}
                        
                        
                    </div>
                    {this.state.ticketQR.map((QRString, index) => {
                        return (
                            
                            <QRCode
                            key = {index}
                            value = {JSON.stringify(QRString)} 
                            size = {256}
                            style = {{marginBottom: 20, marginRight: 50, marginTop: 200}}
                            />
                        )
                    })}
                    
                </Col>
                
            </Row>
            
        )
    }

}
const WrappedBookForm = Form.create()(BookForm);
export default WrappedBookForm