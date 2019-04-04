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
import FormItem from 'antd/lib/form/FormItem';
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
    }

    

    componentDidMount() {
        axios.get(`http://localhost:4000/ticket`)
        .then(response => {
            this.setState({
                ticketArray: response.data
            })
            console.log(response.data);
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
        this.setState ({
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
        console.log("này là value1: " + date);
        console.log(date)
        let newDate = date
        let formattedDate = this.state.ticketDate
        console.log(formattedDate)
        this.setState({
            ticketDate: newDate
        })
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
                        <FormItem
                            label="Họ tên"
                            extra="Bạn nên điền họ và tên của NGƯỜI SẼ NHẬN VÉ"
                        >
                        {getFieldDecorator('Họ tên', {
                            rules: [{
                                required: true, message: 'Vui lòng điền đầy đủ họ và tên',
                                whitespace: true 
                                }],
                        })(
                            <Input
                                value={this.state.customerName}
                                name="customerName"
                                onChange={this.handleChange}
                                placeholder="Điền đầy đủ họ và tên của bạn" size="large" />
                        )}
                            
                        </FormItem>

                        <FormItem
                            label="Số chứng minh nhân dân"
                            required="true"
                            extra="Số chứng minh nhân dân sẽ được dùng để xác thực tại quầy bán vé"
                        >
                            <Input
                                type="number"
                                min={0}
                                value={this.state.customerID}
                                name="customerID"
                                onChange={this.handleChange}
                            />

                        </FormItem>

                        <FormItem
                            label="E-mail"
                            hasFeedback
                            extra="Quý khách vui lòng nhập đúng email để có thể nhận được mã vạch vào cổng"
                        >
                        {getFieldDecorator('E-mail', {
                            rules: [{
                                type: 'email', message: 'Email này không hợp lệ!',
                            },{
                                required: true, message: 'Email không được bỏ trống',
                            }],
                        })(
                            <Input
                                value={this.state.customerEmail}
                                name="customerEmail"
                                onChange={this.handleChange}
                                placeholder="e.g: abc@example.com" size="large" />
                        )}
                        </FormItem>

                        <Form.Item
                            label="Số điện thoại"
                            required="true"
                        >
                            <Input
                                type="number"
                                placeholder="+84"
                                value={this.state.phoneInput}
                                onChange={this.handleChange}
                                name="phoneInput"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Ngày tham quan"
                            required="true"
                        >
                            <DatePicker
                                name="ticketDate"
                                value={this.state.ticketDate}
                                onChange={date => this.handleDate(date)}
                                format={dateFormat}
                            />
                        </Form.Item>

                        <Select 
                        defaultValue="- Hãy chọn loại vé -" 
                        style={{ width: 250 }}
                        name = "ticketType"
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

                        <InputNumber

                            min={0}
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
                        ngày xài: {this.state.ticketDate.format(dateFormat)}<br />
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