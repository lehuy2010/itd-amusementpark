const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  
  
  
  const {getFieldDecorator } = this.props.form;
  <Form {...formItemLayout} >
    <Form.Item
        label="E-mail"
    >
        {getFieldDecorator('email', {
            rules: [{
                type: 'email', message: 'The input is not valid E-mail!',
            }, {
                required: true, message: 'Please input your E-mail!',
            }],
        })(
            <Input />
        )}
    </Form.Item>
</Form>


