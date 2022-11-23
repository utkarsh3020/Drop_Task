const validateName = (value, field) => {
    if (!value) {
      return "Required";
    } else if (!/^[A-Za-z]+$/i.test(value)) {
      return `Invalid ${field}`;
    }
};

const validateUserName = (value, field) => {
  if (!value) {
    return "Required";
  } else if (!/^[A-Za-z0-9]+$/i.test(value)) {
    return `Invalid ${field}`;
  }
};

const validateEmail = (value, field) => {
  var validEmail = /^[A-Za-z._1-9]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6}$/;
  if (!value) {
    return "Requied";
  } else if (validEmail.test(value)) {
    return `Invalid ${field}`;
  }
};

  const validatePassword = (value) => {
    if (!value) {
      return "Required";
    } else if (value.length > 20 || value.length < 8) {
      return "Password must be 8 or more characters";
    }
  };
  
  export default validateName;
  
  export { validateName, validateUserName, validateEmail, validatePassword };
  