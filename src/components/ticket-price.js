import React, { Component } from 'react'
import '../App.css'
import TicketTable from './ticket-table';
import TicketInfo from './ticket-information'
const PriceTable = () => {
    return (
        <div>
            <div className='push'> </div>
                <TicketInfo />
                <TicketTable />
        </div>
    )
}
export default PriceTable