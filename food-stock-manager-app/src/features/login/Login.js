import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  attemptLogin
} from './loginActions.js';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export function Login() {
  const login = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  return (
    <div>
      <Form>
        { login.loginFailed ? <span className="text-danger" style={{ fontSize: '16px' }}>Login failed. Please check username and password.</span> : null }
        <FormGroup>
          <Label for="username-input">Username</Label>
          <Input
            id="username-input"
            type="text"
            aria-label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            invalid={login.loginFailed}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password-input">Password</Label>
          <Input
            id="password-input"
            type="password"
            aria-label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            invalid={login.loginFailed}
          />
        </FormGroup>
        <Button
          onClick={() => dispatch(attemptLogin(username, password))}
          size="lg"
          color="primary"
          className="m-3"
        >
          Login
        </Button>
      </Form>
    </div>
  );
}
