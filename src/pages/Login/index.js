import React, {useState} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
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

  const handleChange = e => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
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
        className="registration-form__field"
      />
      <Input
        placeholder="Password"
        name="password"
        type="password"
        onChange={handleChange}
        value={loginForm.value}
        className="registration-form__field"
      />
      <p className="registration-form__text">Yet to have an account?
        <Link className="registration-form__text--span" to="/register">
          <span>Register</span>
        </Link>
      </p>
      <div className="registration-form__button">
        <Button
          name="Login"
          type="submit"
          isActive
          onClick={handleSubmit}
          isLoading={props.isLoading}
        />
      </div>
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
