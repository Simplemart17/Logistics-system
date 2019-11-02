const applyValidation = (value, config) => {
  let error = '';

  for (let i = 0; i < config.length; i++) {
    const validator = config[i];

    if (!validator.isValid(value)) {
      error = validator.message;
      break;
    }
  }

  return error;
};

export default applyValidation;
