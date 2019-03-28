import React, { Component } from 'react';
import moment from 'moment';
import '../App.css';
import {
    Form, Input, Col,  Select,DatePicker, Row,
    InputNumber,
    Button
} from 'antd';

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
            ticketNumber: 0
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleDate = this.handleDate.bind(this)
        this.handleNumberChange = this.handleNumberChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
    }

    

    componentDidMount() {
        fetch("http://localhost:4000/ticket")
        .then(response => response.json())
        .then(data => {
            this.setState({
                ticketArray: data
            })
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
        
        console.log("kiểm tra lần nữa: " + this.state.ticketType)
        fetch("http://localhost:4000/ticket/submit",{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
                params: this.state
            })
        })
        .then(data => {
            console.log("giờ gửi data theo lệnh POST");
            console.log(data.json());

        }).catch(error => {
            console.log("có lỗi");
            console.log(error);
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
        return (
            <Row>
                <Col span={12} offset={6} className="form-modify">
                    <Form className='textbox-modify'
                    onSubmit = {this.handleSubmit}>
                        <Form.Item
                            label="Họ tên"
                            required="true"
                            extra="Bạn nên điền họ và tên của NGƯỜI SẼ NHẬN VÉ"
                        >
                            <Input
                                value={this.state.customerName}
                                name="customerName"
                                onChange={this.handleChange}
                                placeholder="Điền đầy đủ họ và tên của bạn" size="large" />

                        </Form.Item>

                        <Form.Item
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

                        </Form.Item>

                        <Form.Item
                            label="E-mail"
                            required="true"
                            extra="Quý khách vui lòng nhập đúng email để có thể nhận được mã vạch vào cổng"
                        >
                            <Input
                                value={this.state.customerEmail}
                                name="customerEmail"
                                onChange={this.handleChange}
                                placeholder="e.g: abc@example.com" size="large" />
                        </Form.Item>

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

                </Col>

            </Row>
        )
    }

}

export default BookForm 