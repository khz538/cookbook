import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { defaultImage } from '../../util';

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
    setHasSubmitted(true);
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, first_name, last_name));
      // if (data) {
      //   setErrors(data);
      // }
    }
  };


  const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;


  useEffect(() => {
    const newErrors = [];
    if (!username.length) newErrors.push('* Please enter a username.');
    if (username.trim() === '' && username.length) {
      newErrors.push('* Whitespace-only inputs for username are not allowed');
    }
    if (username.length > 30) {
      newErrors.push('* Username must be under 31 characters');
    }
    if (first_name.trim() === '' && first_name.length) {
      newErrors.push('* Whitespace-only inputs for first name are not allowed');
    }
    if (!first_name.length) newErrors.push('* Please enter your first name.');
    if (first_name.length > 20) {
      newErrors.push('* First Name must be under 21 characters');
    }
    if (last_name.length && last_name.trim() === '') {
      newErrors.push('* Whitespace-only inputs for last name are not allowed');
    }
    if (!last_name.length) newErrors.push('* Please enter your last name.');
    if (last_name.length > 20) {
      newErrors.push('* Last Name must be under 21 characters');
    }
    if (email.includes(' ')) {
      newErrors.push('* Whitespace-only inputs for email are not allowed');
    }
    if (!email.length) newErrors.push('* Please enter your email.');
    if (email.length > 50) {
      newErrors.push('* Email must be under 51 characters');
    }
    if (!email.match(emailRegex)) newErrors.push('* Please enter a valid email.');
    if (!password.length) newErrors.push('* Please create a password.');
    if (password.trim() === '' && password.length) {
      newErrors.push('* Whitespace-only inputs for password are not allowed');
    }
    if (password !== repeatPassword) {
      newErrors.push('* Password and Repeat Password fields must match');
    }
    if (password.length < 6 || password.length > 32) {
      newErrors.push('* Password must be at least 6 characters or less than 32 characters');
    }
    setFrontendErrors(newErrors);
    // if (!password.length) newErrors.push('Password: This field is required');
    // if (!repeatPassword.length) newErrors.push('Repeat Password: This field is required')
  }, [username, first_name, last_name, email, password, repeatPassword, frontendErrors.length]);

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
    <div className='login-page-wrapper'>
      <div className='form-side'>
        <h1>Sign Up!</h1>
        <form onSubmit={onSignUp}>
          <div>
            {hasSubmitted && frontendErrors.map((error, ind) => (
              <div className='errors' key={ind}>{error}</div>
            ))}
            {errors.map((error, ind) => (
              <div className='errors' key={ind}>{error}</div>
            ))}
          </div>
          <div>
            <label className='label'>User Name</label>
            <small className='small'>&nbsp;(required)</small>
            <input
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
            ></input>
          </div>
          <div>
            <label className='label'>First Name</label>
            <small className='small'>&nbsp;(required)</small>
            <input
              type='text'
              name='first_name'
              onChange={updateFirstName}
              value={first_name}
            ></input>
          </div>
          <div>
            <label className='label'>Last Name</label>
            <small className='small'>&nbsp;(required)</small>
            <input
              type='text'
              name='last_name'
              onChange={updateLastName}
              value={last_name}
            ></input>
          </div>
          <div>
            <label className='label'>Email</label>
            <small className='small'>&nbsp;(required)</small>
            <input
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div>
            <label className='label'>Password</label>
            <small className='small'>&nbsp;(required)</small>
            <input
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div>
            <label className='label'>Repeat Password</label>
            <small className='small'>&nbsp;(required)</small>
            <input
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              // required={true}
            ></input>
          </div>
          <button className='login-button' type='submit'>Sign Up</button>
        </form>
      </div>
      <div className='image-side'>
        <img src={defaultImage} alt='default-image' />
      </div>
    </div>
  );
};

export default SignUpForm;
