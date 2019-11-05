import React, {useState} from 'react';
import {connect} from 'react-redux';
import Input from '../../components/InputField/index';
import Button from '../../components/Button/index';
import { loginAction } from '../../store/auth/index';

const Login = props => {
  /**
   * Hooks to manage form state
   */
  const [loginForm, setLoginForm] = useState({
    identifier: '',
    password: '',
  });
  
  /**
   * Hooks to manage and set form error state
   */
  const [formError] = useState({
    idetifierError: '',
    passwordError: '',
  });

  const handleChange = e => {
    const { name, value } = e.target
    setLoginForm({
      [name]: value,
    })
  }

  /**
   * This method submits the form and call the login action
   * @param {Event} e 
   * @returns {void}
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { login, history } = props;
    const {  identifier, password } = loginForm;
    const payload = { identifier, password };
    await login(payload);
    
    history.push('/dashboard');
  }
  
  /**
   * This method set the login form
   */
  const renderLoginForm = () => (
    <div>
      <Input
        placeholder="Username/Email"
        name="identifier"
        onChange={handleChange}
        value={loginForm.value}
        error={formError.idetifierError}
        className="registration-form__field"
        showTextOnError={true}
      />
      <Input
        placeholder="Password"
        name="assword"
        type="password"
        onChange={handleChange}
        value={loginForm.value}
        error={formError.passwordError}
        className="registration-form__field"
        showTextOnError={true}
      />
      <Button
        name="Login"
        type="submit"
        isActive
        onClick={handleSubmit}
        isLoading={props.isLoading}
      />
    </div>
  )

  return (
    <div className="form">
    <div className="form__area">
      <h3>Login</h3>
      {renderLoginForm()}
    </div>
  </div>
  )
}

const mapStateToProps = state => ({
  isLoading: state.auth.isLoading
});
const mapDispatchToProps = dispatch => ({
  login: payload => dispatch(loginAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
