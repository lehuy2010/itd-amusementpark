import React, { Component } from 'react'
import '../App.css'
import {Icon} from 'antd';
import axios from 'axios';
const loadingIcon = <Icon type="loading" style={{ fontSize: 48, marginLeft: '4px' }} spin />;
class PriceTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            ticketSource: []
        }
    }
    componentDidMount () {
        document.title = 'Giá vé'
        axios.get(`http://localhost:4000/ticket/prices`)
        .then(response => {
            console.log('kết quả là :', response.data)
        }).catch(err => {
            console.log(err)
        })
    }
    render() {
        return (
            <div></div>
        )
    }
}

export default PriceTable