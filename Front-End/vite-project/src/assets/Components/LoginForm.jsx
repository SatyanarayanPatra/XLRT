import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    // event.preventDefault();
    try {
      const response = await axios.post('/api/login', { username, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      onLogin(token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form layout='vertical'>
      <Form.Item label='Username'>
        <Input value={username} onChange={(e) => setUsername(e.target.value)} />
      </Form.Item>
      <Form.Item label='Password'>
        <Input.Password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Button type='primary' onClick={handleSubmit}>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
