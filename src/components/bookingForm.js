import React, { Component } from 'react';
import moment from 'moment';
import '../App.css';
import {
    Form, Input, Col,  Select,DatePicker, Row,
    InputNumber,Button, Icon
} from 'antd';
import axios from 'axios'
import QRCode from 'qrcode.react'

/*eslint-disable */
const { Option } = Select;
let id = 0;
const dateFormat = 'DD-MM-YYYY'
class BookForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            customerName: "",
            customerEmail: "",
            phoneInput: "",
            customerID: "",
            ticketArray: [],    // biến này chỉ dùng để bỏ chuỗi loại vé vào rồi render ra màn hình   
            ticketPriceSum: 0,  // biến này dùng để hiển thị tổng số tiền các vé ra màn hình
            ticketDate: moment(),
            ticketQR: [],
            ticketNumber: [],   // dùng để lưu số lượng loại vé được chọn vào một chuỗi
            ticketType: [],     // dùng để lưu các loại vé được chọn vào một chuỗi
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleDate = this.handleDate.bind(this)
        this.handleNumberChange = this.handleNumberChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
        this.disableDate = this.disableDate.bind(this)
        this.addTicketField = this.addTicketField.bind(this)
        this.removeTicketField = this.removeTicketField.bind(this)
        this.handlePrice = this.handlePrice.bind(this)
    }

    

    componentDidMount() {
        axios.get(`http://localhost:4000/ticket`)
        .then(response => {
            this.setState({
                ticketArray: response.data
            })
        })
        .catch(error => {
            console.log("GET thất bại", error);
        })
    }

    addTicketField = () => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(id++);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
          keys: nextKeys,
        });
    }

    removeTicketField = (k) => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
            return;
        }
        const newkey = keys.filter(key => key !== k)
        
        // can use data-binding to set
        form.setFieldsValue({
            keys: newkey,
        },() => { 
            this.handlePrice()      // sau khi xóa trường đó xong gọi hàm này để cập nhật lại giá vé hiện tại
        });

    }

    handleChange (event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    handleSelect (value) {
        console.log("giá trị value: ",value);
        this.setState ({
            ticketType: value
        })
    }

    
    handleNumberChange (value) {
        console.log("số đổi thành : " + value );
        if( value === null || value === '')
        value = 0;
        this.setState ({
            ticketNumber : value
        })
       
    }

    handlePrice () {
        console.log('loại vé đã chọn là: ', this.state.ticketType);
        console.log("số vé là : ", this.state.ticketNumber);

        var filteredTicketType = this.props.form.getFieldValue('ticketField').filter(index => {
            return index !== null
        });

        var filteredTicketNumber = this.props.form.getFieldValue('ticketFieldAmount').filter(index => {
            return index !== null
        });
        // HAI HÀM NÀY DÙNG ĐỂ FILTER RA PHẦN TỬ EMPTY CỦA TRƯỜNG SAU KHI BẤM NÚT XÓA (removeTicketField)
        axios.post(`http://localhost:4000/ticket/prices/total`,{
            selectedTickets: filteredTicketType,
            selectedAmount: filteredTicketNumber
        })
        .then (totalSum => {
            console.log('Tổng cộng tiền vé lúc này: ',totalSum.data);
            this.setState({
                ticketPriceSum: totalSum.data
            })
        }).catch(err => {
            console.log('Có lỗi: ',err);
        })
    }
    
    handleSubmit(e) {
        e.preventDefault();

        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({
                    ticketType: values.ticketField,
                    ticketNumber: values.ticketFieldAmount
                }, () => {
                    console.log("biến values gồm có : ", values);
                    console.log("state của ticketType: ", this.state.ticketType.toString());
                    console.log("state của ticketNumber: ", this.state.ticketNumber.toString());
                    axios.post(`http://localhost:4000/ticket/submit`, {
                        params: this.state
                    })
                        .then(res => {
                            console.log('đây là biến values: ', values)
                            console.log('đây là data: ', res.data);
                            this.setState({
                                ticketQR: res.data
                            })
                        })
                })
            }
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
        let today = moment().format(dateFormat);
        return current && current < moment(today, dateFormat);
    }
       


   
    render() {
        const {getFieldDecorator, getFieldValue} = this.props.form;
        getFieldDecorator('keys', {initialValue: [] });
        const keys = getFieldValue('keys');
        const ticketField = keys.map((k, index) => (
            <Form.Item 
                label={index === 0 ? "Loại vé muốn mua - Số lượng" : ""}
                require={false}
                key={k}

            >
                {getFieldDecorator(`ticketField[${k}]`, {
                    validateTrigger: ['onBlur'],
                    rules: [{
                        required: true,
                        whitespace: true,
                        message: "Vui lòng chọn loại vé bạn muốn mua",
                    }]
                })(
                    <Select
                        style={{ width: 400 }}
                        name="ticketType"
                        placeholder="- Hãy chọn loại vé -"
                        onChange={this.handleSelect}>
                        {
                            this.state.ticketArray.map((content, index) => {
                                return (
                                    <Option
                                        value={content.TicketName}
                                        key={index}>
                                        {content.TicketName + ' (' + content.Price.toLocaleString('vi-vn') + 'đồng/vé)   '}
                                    </Option>
                                )
                            })}
                    </Select>
                )}
                {getFieldDecorator(`ticketFieldAmount[${k}]`, {
                    validateTrigger: ['onBlur'],
                    rules: [{
                        required: true,
                        message: "Vui lòng chọn số lượng vé",
                        min: 1, message: "Số lượng vé phải lớn hơn 1"
                    }]
                })(
                    <InputNumber
                        min={1}
                        max={10}
                        style={{ marginLeft: 10 }}
                        name="ticketNumber"
                        onChange={this.handleNumberChange}
                        onBlur = {this.handlePrice}
                        key = {k}
                    />
                )}
                {keys.length > 1 ? (
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        onClick={() => this.removeTicketField(k)}
                    />
                ) : null}
            </Form.Item>
        ))
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
                            extra="Quý khách vui lòng nhập đúng email để có thể nhận được mã QR "
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
                                initialValue : this.state.ticketDate.format(dateFormat),
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
  
                        {ticketField}

                        <Form.Item

                        >
                            <Button
                                type="dashed"
                                onClick={this.addTicketField}
                            >
                                <Icon type="plus" /> Mua thêm vé
                            </Button>
                        </Form.Item>
                        <Form.Item >
                            <Button
                                type="primary"
                                htmlType ="submit"  
                            >
                                Đặt vé
                            </Button>
                            
                            <div className = 'ticket-price-area' >
                                Tổng cộng:  
                                <text style = {{color:'#f5222d', fontSize: 'x-large', marginLeft: '15px'}}>
                                 {this.state.ticketPriceSum.toLocaleString('vi-vn')} đồng </text>
                            </div>
                        </Form.Item>
                        
                    </Form>
                    
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