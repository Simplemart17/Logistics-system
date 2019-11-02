import React from 'react';
import './RegisterForm.scss';
import InputField from '../InputField/index';
import Button from '../Button/index';

const RegisterForm = (props) => (
  <div className="registration-form">
    <InputField
      placeholder="Username"
      name="username"
      onChange={props.handleChange}
      value={props.value}
      error={props.usernameError}
      className="registration-form__field"
      showTextOnError={true}
    />
    <InputField
      placeholder="Email Address"
      name="email"
      onChange={props.handleChange}
      value={props.value}
      error={props.emailError}
      type="email"
      className="registration-form__field"
      showTextOnError={true}
    />
    <InputField
      placeholder="Password"
      name="password"
      onChange={props.handleChange}
      value={props.value}
      error={props.passwordError}
      type="password"
      className="registration-form__field"
      showTextOnError={true}
    />
    <InputField
      placeholder="Phone Number"
      name="phone"
      onChange={props.handleChange}
      value={props.value}
      error={props.phoneError}
      className="registration-form__field"
      showTextOnError={true}
    />
    <p className="registration-form__text">Already have an account?
      <span className="registration-form__text--span">Log In</span>
    </p>
    <Button 
      type="submit"
      name="Register"
      isActive
      onClick={props.handleSubmit}
      isLoading={props.isLoading}
    />
  </div>
);

export default RegisterForm;
