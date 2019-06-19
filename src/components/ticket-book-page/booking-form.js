import React, { Component } from 'react';
import moment from 'moment';
import './App.css';
import {
    Form, Input, Col,  Select,DatePicker, Row,
    InputNumber, Button, Icon, Spin, Modal
} from 'antd';
import axios from 'axios'
import { withRouter } from 'react-router-dom'
const loadingIcon = <Icon type="loading" style={{ fontSize: 48, marginLeft: '4px' }} spin />;
/*eslint-disable */
const { Option } = Select;
let id = 0;
const dateFormat = 'DD-MM-YYYY'
class BookForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isLoading: true,
            customerName: "",
            customerEmail: "",
            phoneInput: "",
            customerID: "",
            ticketArray: [],    // biến này chỉ dùng để bỏ chuỗi loại vé vào rồi render ra màn hình   
            ticketPriceSum: 0,  // biến này dùng để hiển thị tổng số tiền các vé ra màn hình
            ticketOriginalPrice: 0, // tổng tiền TRƯỚC khi áp dụng giảm giá
            ticketDate: moment(),
            ticketQR: [],
            ticketNumber: [],   // dùng để lưu số lượng loại vé được chọn vào một chuỗi
            ticketType: [],     // dùng để lưu các loại vé được chọn vào một chuỗi
            Promotion: [],
            selectedPromotionContent: null,  // nội dung ct khuyến mãi đang được chọn
            selectedPromotionID: 0,
            promoAmount: 0,
            isPromoApplied: false, // xem tiền của người dùng đã đủ điều kiện để được km chưa
            isPromotionEnable: true  // dùng để cho ng dùng chỉ được chọn trường promotion khi đã chọn trường vé 1 lần 
        }
    }

    

    componentDidMount() {
        axios.get(`http://localhost:4000/ticket`)
        .then(response => {
            this.setState({
                ticketArray: response.data,
                isLoading: false
            })
        })
        .catch(error => {
             console.log("GET thất bại", error);
        })

        axios.post(`http://localhost:4000/ticket/promotion`,{
            bookDate: moment()
        }).then(res => {
            
            this.setState ({ 
                Promotion: res.data
            })
        }).catch(err => {
            console.log(err);
        })
        
        document.title = 'Đặt vé online';
        window.scrollTo(0,0);
    }
    
    addTicketField = () => {
        const { form } = this.props;
        
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(id++);
        
        form.setFieldsValue({
          keys: nextKeys,
        });
    }

    removeTicketField = (k) => {
        const { form } = this.props;
        
        const keys = form.getFieldValue('keys');
       
        if (keys.length === 1) {
            return;
        }
        const newkey = keys.filter(key => key !== k)
        
       
        form.setFieldsValue({
            keys: newkey,
        },() => { 
            this.handlePrice();      // sau khi xóa trường đó xong gọi hàm này để cập nhật lại giá vé hiện tại
        });

    }

    handleChange = (event) => {
        const {name, value} = event.target 
        // console.log('khi thay đổi', name, [name], value)
        this.setState({
            [name]: value 
        })
    }


    handlePromotionChange = (value) => {
        let selected = `${value}`
        // console.log('khuyến mãi tên', selected);
        this.handlePromotionContent(selected)
        this.setState ({ 
            selectedPromotionID: selected
        })
    }

    handlePromotionContent = (value) => {
        this.state.Promotion.map((content,index) => {
            content.PromotionID == value ? this.setState ({
                selectedPromotionContent: content.Description
            }) : null
        })
    }
    handleNumberChange = (value) => {
        this.setState ({
            ticketNumber : value
        })
    }

    handlePrice = () => {
        
        
        var filteredTicketType = this.props.form.getFieldValue('ticketField').filter(index => {
            return index !== null && index !== undefined
        });

        var filteredTicketNumber = this.props.form.getFieldValue('ticketFieldAmount').filter(index => {
            return index !== null && index !== undefined
        });
        // - 2 mảng tên vé và số lượng vé đã lọc ra các giá trị null và undefined (khi bấm dấu xóa)
        
        if (filteredTicketNumber != 0 ){     // ngăn trường hợp lỗi khi khách hàng vừa đến mục mua vé
            // bấm vào chọn loại vé => chưa đặt số lượng đã bấm ra
            // ngoài trigger onBlur => mảng rỗng không xài filter được => lỗi  
            
        var ticketsSum = filteredTicketNumber.reduce((filteredTicketNumber, value) => {
            return parseInt(filteredTicketNumber) + parseInt(value)
        });
        
        // console.log('tại đây state tickettype là: ', this.state.ticketType);
        if (filteredTicketNumber != null && filteredTicketType != null) // chỉ enable cho ng dùng
        // chọn mục promotion khi họ đã chọn cả tên vé và số lượng vé
        {
            this.setState({
                isPromotionEnable: false
            })
        }

        // console.log('mảng ticketnumber  :',filteredTicketNumber, 'mảng vé tương ứng:', filteredTicketType);
        var selectedTickets = filteredTicketType.map((data)=>{
            return this.state.ticketArray.find((x, index)=> data === index)
        })
        
        axios.post(`http://localhost:4000/ticket/prices/total`,{
            selectedTickets: selectedTickets,
            Count: filteredTicketNumber,
            selectedPromoID: this.state.selectedPromotionID,
            totalTicket: ticketsSum
        })
        .then (totalSum => {
            // // console.log('Tiền vé gốc lúc này: ',totalSum.data.OriginalPrice);
            // // console.log('Tiền vé đã giảm: ',totalSum.data.PostPromoPrice);
            // // console.log('được khuyến mãi chưa ? ', totalSum.data.promoFlag);
            this.setState({
                ticketOriginalPrice: totalSum.data.OriginalPrice,
                ticketPriceSum: totalSum.data.PostPromoPrice,
                isPromoApplied: totalSum.data.promoFlag,
                promoAmount: totalSum.data.promoLimit
            })
        }).catch(err => {
            // console.log('Có lỗi: ',err);
        })
    }
    }
    
    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                var filteredTicketType = this.props.form.getFieldValue('ticketField').filter(index => {
                    return index !== null
                });

                var filteredTicketNumber = this.props.form.getFieldValue('ticketFieldAmount').filter(index => {
                    return index !== null
                });
                
                var selectedTickets = filteredTicketType.map((data)=>{
                    return this.state.ticketArray.find((x, index)=> data === index)
                })
                
                this.setState({
                    ticketNumber: filteredTicketNumber
                }, () => {
                    axios.post(`http://localhost:4000/ticket/submit`, {
                        params: this.state,
                        selectedTickets,
                    }).catch(err => {
                        // console.log(err);
                    })
                })
               //ticketDate, customerName, phoneInput, ticketNumber, ticketType, ticketPriceSum
                axios.post(`http://localhost:4000/ticket/send`, {
                    emailDate: this.state.ticketDate,
                    emailName: this.state.customerName,
                    emailLocation: this.state.customerEmail,
                    emailPhone: this.state.phoneInput,
                    emailTicketType: selectedTickets,
                    emailTicketNumber: filteredTicketNumber,
                    emailTotal: this.state.ticketPriceSum,
                    emailPromo: this.state.selectedPromotionContent,
                    emailPromoApply: this.state.isPromoApplied,
                }).then(res => {
                    // console.log('Email đã được gửi');
                    this.bookSuccess();
                }).then(() => {
                    this.props.form.resetFields();
                    window.scrollTo(0,0);
                }).catch(err => {
                    // console.log(err);
                })
            }
        })
    }

    handleDate = (date) => {
        let newDate = date
        this.setState({
            ticketDate: newDate
        })
    }

    disableDate = (current) => {
        let today = moment().format(dateFormat);
        let nextWeek =  moment().add(7,'days').format(dateFormat);
        return current && (current < moment(today, dateFormat) || current > moment(nextWeek, dateFormat));
    }
    
    bookSuccess = () => { 
        Modal.success({
            title: 'Đặt vé thành công',
            content: 'Hãy kiểm tra email của bạn về thông tin giao dịch',
        })
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
                        type: 'number',
                        required: true,
                        whitespace: true,
                        message: "Vui lòng chọn loại vé bạn muốn mua",
                    }]
                })(
                    <Select
                        style={{ width: 400 }}
                        name="ticketType"
                        placeholder="- Hãy chọn loại vé -"
                        onBlur = {this.handlePrice}>
                        {
                            this.state.isLoading ? <Spin indicator = {loadingIcon} /> : 
                            this.state.ticketArray.map((content, index) => {
                                return (
                                    <Option
                                        value={index}
                                        key={index}>
                                        {content.TicketName + ' (' + content.Price.toLocaleString('vi-vn') + 'đồng/vé)   '}
                                    </Option>
                                )
                            })}
                    </Select>
                )}
                {getFieldDecorator(`ticketFieldAmount[${k}]`, {
                    validateTrigger: ['onBlur'],
                    initialValue: 1,
                    rules: [{
                        required: true, message: <div><br/>Vui lòng chọn số lượng vé</div>
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
                            extra="Quý khách vui lòng nhập đúng email để có thể nhận được thông tin xác nhận "
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
                                max: 10, message: 'Số điện thoại chỉ tối đa 10 kí tự ' },
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
                        {getFieldDecorator('Ngày tham quan ', {
                            rules: [{
                                initialValue : this.state.ticketDate.format(dateFormat),
                                type: 'object', required: true, message: 'Hãy chọn ngày sử dụng vé'
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

                        <Form.Item label = 'Chương trình khuyến mãi'>
                            {getFieldDecorator(`promotionField`, {
                                validateTrigger: ['onBlur'],
                                rules: [{
                                    initialValue: this.state.Promotion,
                                }]
                            })(
                                <div>
                                   <Select
                                    style={{ width: 400 }}
                                    name="selectedPromotionContent"
                                    placeholder='---'
                                    onChange={this.handlePromotionChange}
                                    onBlur = {this.handlePrice}
                                    disabled = {this.state.isPromotionEnable}
                                    >
                                    {
                                        this.state.Promotion.map((content, index) => {
                                            return (
                                                  <Option
                                                    value={content.PromotionID}
                                                    key={index}
                                                    >
                                                    {content.PromotionName}
                                                </Option>  
                                            )
                                        })}
                                </Select> 
                                <h4> {this.state.selectedPromotionContent} </h4>
                               
                                </div>
                                
                            )}
                        </Form.Item>
                        <Form.Item >
                            <Button
                                type="primary"
                                htmlType ="submit"  
                            >
                                Đặt vé
                            </Button>
                            {this.state.ticketOriginalPrice !== 0 ? 
                            <div>
                            
                                <p className = 'ticket-price-area'>
                                <span className = 'ticket-align-left'>Tạm tính: </span>
                                
                                <span className = 'ticket-align-right'>{this.state.ticketOriginalPrice.toLocaleString('vi-vn')} đ</span>
                                </p>
                                <br/>
                            
                                <p className = 'ticket-price-area'>
                                <span className = 'ticket-align-left'>Giảm giá: </span>
                                <span className = 'ticket-align-right'> - {this.state.promoAmount.toLocaleString('vi-vn')} đ</span>
                                </p>
                                <br/>
                            
                                <p className = 'ticket-price-area'>
                                <span className = 'ticket-align-left'>Thành tiền: </span>
                                <span className = 'ticket-align-right' style = {{color: 'red'}}>  {this.state.ticketPriceSum.toLocaleString('vi-vn')} đ</span>
                                </p>
                                <br/>
                            </div> : null
                              }
                            
                            
                        </Form.Item>
                        
                    </Form>
                    
                    
                </Col>
                
            </Row>
            
        )
    }

}
const WrappedBookForm = Form.create()(BookForm);
export default withRouter(WrappedBookForm)