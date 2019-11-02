const validationConfig = {
  username: [
    {
      isValid: (value) => !(/^\s+$|^$|^undefined$/.test(value)),
      message: 'Username field cannot be empty',
    },
  ],
  email: [
    {
      isValid: (value) => !(/^\s+$|^$|^undefined$/.test(value)),
      message: 'Email field cannot be empty',
    },
  ],
  password: [
    {
      isValid: (value) => !(/^\s+$|^$|^undefined$/.test(value)),
      message: 'Password field cannot be empty',
    },
  ],
  phone: [
    {
      isValid: (value) => !(/^\s+$|^$|^undefined$/.test(value)),
      message: 'Phone field cannot be empty',
    },
  ],
};

export default validationConfig;
