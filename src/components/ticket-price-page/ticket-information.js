import React from 'react'
import './App.css'
import { Typography, Icon } from 'antd'
const { Paragraph, Text } = Typography;
const TicketInfo = () => {
    document.title = 'Giá vé'
    window.scrollTo(0,0);
    return (
        <Typography style = {{fontSize: '18px', margin: '60px'}}>
            <Paragraph>
                Thời gian áp dụng giá vé của bảng dưới đây: <b>từ ngày 17/05/2019</b>
            </Paragraph>
            <Paragraph>
                Địa điểm mua vé: 01 Sáng Tạo, KCX Tân Thuận, Quận 7 Thành phố Hồ Chí Minh
            </Paragraph>
            <Paragraph>
                Quy định cho các loại vé:  
            </Paragraph>
            <Paragraph>
                <Text strong >Vé người lớn </Text> dành cho khách hàng có chiều cao <Text strong> > 1,4 mét </Text><br /><br />
                <Text strong >Vé trẻ em </Text> dành cho khách hàng có chiều cao  <Text strong> từ 1 đến 1,4 mét</Text>
            </Paragraph>
            <Paragraph>
                Các bé dưới 1m sẽ được miễn phí vé vào cổng khi đi kèm với phụ huynh mua vé người lớn <br />
               
                
                <h4>Lưu ý:</h4>
                <Text
                type = 'warning' 
                underline
                >   Quí khách mua vé online KHÔNG cần mua vé cho các bé dưới 1m. Khi đến quầy để lấy vé chỉ cần dẫn bé đi kèm</Text>
            </Paragraph>
            <Paragraph> 
                *Ấn vào nút <Icon type="plus-square" /> để xem mô tả của vé '
            </Paragraph>
        </Typography>
    )
}

export default TicketInfo