import React, { useState } from 'react';
import md5 from 'md5';
import '../App.css';

//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';

//Adding antd modules and style
import { Button, Modal, Form, Input, Radio } from 'antd';

const Login = () => {
   //popup and form code
 
   function handleSubmit(event) {
 
     event.preventDefault();
 
   }
    const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
        const [form] = Form.useForm();
        return (
          <Modal
            visible={visible}
            title="Login"
            okText="Login"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
              form
                .validateFields()
                .then((values) => {
                  form.resetFields();
                  onCreate(values);
                })
                .catch((info) => {
                  console.log('Validate Failed:', info);
                });
            }}
          >
            <Form onSubmit={handleSubmit}
              form={form}
              layout="vertical"
              name="form_in_modal"
              initialValues={{
                modifier: 'public',
              }}
            >
              <Form.Item
                name="userName"
                label="User Name"
                rules={[
                  {
                    required: true,
                    message: 'Please enter username!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item name="password" label="Password"
              rules={[
                {
                  required: true,
                  message: 'Please enter password!',
                },
              ]}
              >
                <Input type="password" />
              </Form.Item>
              
            </Form>
          </Modal>
        );
      };
      
      const CollectionsPage = () => {
        const [visible, setVisible] = useState(false);
      
        const onCreate = (values) => {
          const hashedPassword=md5(values.password)
          fetch("http://localhost:8080/users/" + values.userName)
          .then((response) => response.json())
          .then((data) => { console.log("DATA",data)
            if (data.success) {
            console.log("SUCCESSSSS")
          } else {
            // Login failed, do something here
            console.log("FAILUREEEEE")
          }})
          .catch((error) => console.log(error," Request Body: "));
        };
      
        return (
          <div>
            <Button 
              type="primary"
              onClick={() => {
                setVisible(true);
              }}
            >
              Login
            </Button>
            <CollectionCreateForm
              visible={visible}
              onCreate={onCreate}
              onCancel={() => {
                setVisible(false);
              }}
            />
          </div>
        );
      };
  return (
    <div className="MainDiv">
          
      <CollectionsPage />
    </div>

  );
  }
export default Login;
