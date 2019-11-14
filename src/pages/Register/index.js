/* eslint-disable array-callback-return */
import React, {useState} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { registerAction } from '../../store/auth/index';
import RegisterForm from '../../components/RegisterForm/index';
import './Register.scss';
import validationConfig from '../../utils/validationConfig';
import applyValidation from '../../utils/applyValidation';


const Register = props => {
  /**
   * Hooks to manage form state and also set form error state
   */
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    errors: {
      usernameError: '',
      emailError: '',
      passwordError: '',
      phoneError: '',
    }
  });

  /**
   * This method set the fields error
   * 
   * @param {String} field 
   * @param {String} error
   * 
   * @returns {void}
   */
  const setFieldError = (field, error) => {
    setForm(prevState => ({
      ...prevState,
      [field]: error,
    }))
  }

  /**
   * This method validates the input field
   * 
   * @param {Object} config 
   * 
   * @returns {void}
   */
  const validateInputFields = (config = validationConfig) => {
    const fields = ['username', 'email', 'password', 'phone'];

    const errors = {};
    fields.map((field) => {
      const value = form[field];
      const error = applyValidation(value, config[field]);
      setFieldError(`${field}Error`, error);
      errors[`${field}Error`] = error
    });
    return errors;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(() => ({ ...form, [`${name}Error`]: '', [name]: value }));
  }

  /**
   * This method submits the form and call the login action
   * @param {Event} e 
   * @returns {void}
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { register, history } = props;
    const {  username, email, password, phone } = form;
    const payload = { username, email, password, phone };
    const errors = await validateInputFields();
    const hasNoError = Object.values(errors).every(x => (x === true || x === ''));
    
    if (!hasNoError) { return; }
    
    await register(payload);
    history.push('/addresses');
  }

  const {  usernameError, emailError, passwordError, phoneError } = form;

  return (
    <div className="form">
      <div className="form__area">
        <h3 className="form__area--header">Signup</h3>
        <RegisterForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          usernameError={usernameError}
          emailError={emailError}
          passwordError={passwordError}
          phoneError={phoneError}
          isLoading={props.isLoading}
        />
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  registerState: state.auth.data,
  isLoading: state.auth.isLoading
});

const mapDispatchToProps = dispatch => ({
  register: payload => dispatch(registerAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));
