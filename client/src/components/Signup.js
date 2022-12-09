import React, { useState } from 'react';
import md5 from 'md5'
import '../App.css';

//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';

//Adding antd modules and style
import { Button, Modal, Form, Input, Radio } from 'antd';


const Signup = () =>{
   //popup and form code
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');

   function handleSubmit(event) {
 
    event.preventDefault();
    const hashedPassword = md5(password);

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
                name="email"
                label="Email ID"
                
                rules={[
                  {
                    required: true,
                    message: 'Please enter Email ID',
                  },
                ]}
              >
                <Input type="email" 
                onChange={(event) => setUsername(event.target.value)}/>
              </Form.Item>
              <Form.Item
                name="number"
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: 'Please enter Phone Number',
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
                <Input type="password" 
                onChange={(event) => setPassword(event.target.value)}/>
              </Form.Item>
              
            </Form>
          </Modal>
        );
      };
      
      const CollectionsPage = () => {
        const [visible, setVisible] = useState(false);
      
        const onCreate = (values) => {
          console.log('Received values of form: ', values);
          setVisible(false);
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
