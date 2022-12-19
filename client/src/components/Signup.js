import React, { useState } from 'react';
import md5 from 'md5'
import '../App.css';

//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';

//Adding antd modules and style
import { Button, Modal, Form, Input, Radio } from 'antd';


const Signup = () =>{
   //popup and form code

   const handleSubmit=(values) => {
 
    const hashedPassword = md5(values.password);
    const userName = values.username;
    const firstName = values.firstname;
    const middleName = values.middlename;
    const lastName =values.lastname;
    const number = values.number;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, userName, hashedPassword, middleName, lastName, number }),
      };
      fetch("http://localhost:8080/users", requestOptions)
          .then((response) => response.json())
          .then((data) => { 
            console.log("Data sent",data,"ANDDDDD", requestOptions)
            window.location.reload()
         })
          .catch((error) => console.log(error," Request Body: ",requestOptions));

      }

    const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
        const [form] = Form.useForm();
        return (
          <Modal
            visible={visible}
            title="Signup"
            okText="Signup"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
              form
                .validateFields()
                .then((values) => {
                  form.resetFields();
                  onCreate(values);
                  handleSubmit(values);
                  
                })
                .catch((info) => {
                  console.log('Validate Failed:', info);
                });
            }}
          >
            <Form 
              form={form}
              layout="vertical"
              name="form_in_modal"
              initialValues={{
                modifier: 'public',
              }}
            >
              <Form.Item
                name="firstname"
                label="First Name"
                rules={[
                  {
                    required: true,
                    message: 'Please enter First Name',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="middlename"
                label="Middle Name"
                rules={[
                  {
                    required: true,
                    message: 'Please enter Middle Name',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="lastname"
                label="Last Name"
                rules={[
                  {
                    required: true,
                    message: 'Please enter Last Name',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="username"
                label="Email ID"
                
                rules={[
                  {
                    required: true,
                    message: 'Please enter Email ID',
                  },
                  {
                    pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: 'Must be in the form abc@xyz.co',
                  },
                ]}
              >
                <Input type='email'/>
              </Form.Item>
              <Form.Item
                name="number"
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: 'Please enter Phone Number',
                  },
                  {
                    pattern: /^[0-9]{3}[0-9]{3}[0-9]{4}$/,
                    message: 'Must contain ten digits and no letters or characters',
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
                {
                  pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
                  message: 'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters',
                },
              ]}
              >
                <Input type="password"/>
              </Form.Item>
              
            </Form>
          </Modal>
        );
      };
      
      const CollectionsPage = () => {
        const [visible, setVisible] = useState(false);
      
        const onCreate = (values) => {
          console.log('Received values of form: ', values);
          setVisible(true);
        };
      
        return (
          <div>
            <Button
              type="primary"
              onClick={() => {
                setVisible(true);
              }}
            >
              Sign Up
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
export default Signup;
