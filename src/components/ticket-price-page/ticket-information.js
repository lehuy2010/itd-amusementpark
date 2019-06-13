import React, { Component } from 'react'
import './App.css'
import { Typography, Icon } from 'antd'
import LoadingIcon from '../loading-icon/LoadingIcon'
import firebase from 'firebase'
const { Paragraph, Text } = Typography;
class TicketInfo extends Component {
    constructor (props) {
        super(props)
        this.state = { 
            ticketContent: [],
            isLoading: true
        }
    }
    componentDidMount() {
        document.title = 'Giá vé'
        window.scrollTo(0,0);
        var firebaseInfo = firebase.database().ref('ticketcontent');
        firebaseInfo.on('value', (snapshot) => { 
            this.setState({
                ticketContent: snapshot.val(),
                isLoading: false
            })
        })
    }
    render() {
        return (
        <div>
        {this.state.isLoading ? <LoadingIcon /> : 
        <Typography 
            style = {{fontSize: '18px', margin: '60px'}}>
                <Paragraph>
                  <b>{this.state.ticketContent.apply_date} </b> 
                </Paragraph>

                <Paragraph>
                    {this.state.ticketContent.purchase_location}
                </Paragraph>

                <Paragraph>
                    Quy định cho các loại vé:  
                </Paragraph>

                <Paragraph>
                    <Text strong >{this.state.ticketContent.rules.adult} </Text><br /><br />
                    <Text strong >{this.state.ticketContent.rules.children}</Text>
                </Paragraph>

                <Paragraph>
                    {this.state.ticketContent.rules.note}
                </Paragraph>
                
                <Paragraph>
                    <h4>Lưu ý:</h4>
                    <Text
                    type = 'warning' 
                    underline
                    >   {this.state.ticketContent.attention_info}</Text>
                </Paragraph>
                
                <Paragraph> 
                    *Ấn vào nút <Icon type="plus-square" /> để xem mô tả của vé 
                </Paragraph>

            </Typography>
        }
        </div>
           
        )
    }
    
}

export default TicketInfo