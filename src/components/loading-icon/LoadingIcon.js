import React from 'react'
import { Icon, Spin } from 'antd'

const LoadingIcon = () => { 
    const loading = <Icon 
    type="loading" 
    style={{ fontSize: 48, marginLeft: '4px' }} 
    spin 
    />;
    return ( 
        <Spin indicator = {loading} />
    )
}

export default LoadingIcon