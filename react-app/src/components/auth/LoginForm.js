import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { defaultImage } from '../../util';
import './LoginForm.css';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-page-wrapper'>
      <div className='form-side'>
        <h1>Sign In to CookBook</h1>
        <form onSubmit={onLogin}>
          <ul>
            {errors.map((error, ind) => (
              <li key={ind}>{error}</li>
            ))}
          </ul>
          <div>
            <label className='label' htmlFor='email'>Email</label>
            <small className='small'>&nbsp;(required)</small>
            <input
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
            <label className='label' htmlFor='password'>Password</label>
            <small className='small'>&nbsp;(required)</small>
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
            <button className='login-button' type='submit'>Login</button>
          </div>
        </form>
      </div>
      <div className='image-side'>
        <img src={defaultImage} alt='default-image' />
      </div>
    </div>
  );
};

export default LoginForm;
