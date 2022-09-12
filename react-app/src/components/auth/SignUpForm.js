import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [frontendErrors, setFrontendErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, first_name, last_name));
      if (data) {
        setErrors(data)
      }
    }
  };

  useEffect(() => {
    const newErrors = [];
    if (username.trim() === '' && username.length) {
      newErrors.push('Username: Whitespace only inputs are not allowed');
    }
    if (username.length > 30) {
      newErrors.push('User Name must be under 31 characters');
    }
    if (first_name.trim() === '' && first_name.length) {
      newErrors.push('First Name: Whitespace only inputs are not allowed');
    }
    if (first_name.length > 20) {
      newErrors.push('First Name must be under 21 characters');
    }
    if (last_name.length && last_name.trim() === '') {
      newErrors.push('Last Name: Whitespace only inputs are not allowed');
    }
    if (last_name.length > 20) {
      newErrors.push('Last Name must be under 21 characters');
    }
    if (email.includes(' ')) {
      newErrors.push('Email: Whitespace is not allowed');
    }
    if (password !== repeatPassword) {
      newErrors.push('Password: Password and Repeat Password must match');
    }
    if (!password.length) newErrors.push('Password: This field is required');
    if (!repeatPassword.length) newErrors.push('Repeat Password: This field is required')
  }, [])

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateFirstName = e => {
    setFirstName(e.target.value);
  };

  const updateLastName = e => {
    setLastName(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label>User Name</label>
        <small>&nbsp;(required)</small>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>
        <label>First Name</label>
        <small>&nbsp;(required)</small>
        <input
          type='text'
          name='first_name'
          onChange={updateFirstName}
          value={first_name}
        ></input>
      </div>
      <div>
        <label>Last Name</label>
        <small>&nbsp;(required)</small>
        <input
          type='text'
          name='last_name'
          onChange={updateLastName}
          value={last_name}
        ></input>
      </div>
      <div>
        <label>Email</label>
        <small>&nbsp;(required)</small>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <small>&nbsp;(required)</small>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <small>&nbsp;(required)</small>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          // required={true}
        ></input>
      </div>
      <button type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
