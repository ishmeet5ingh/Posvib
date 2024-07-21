// src/validationRules.js

// Generic function to create validation rules
const createValidation = ({ required, maxLength, minLength, pattern, patternMessage, customValidate, fieldName }) => {
    const rules = {};
  
    if (required) {
      rules.required = `${fieldName} is required`;
    }
    if (maxLength) {
      rules.maxLength = {
        value: maxLength,
        message: `${fieldName} cannot exceed ${maxLength} characters`,
      };
    }
    if (minLength) {
      rules.minLength = {
        value: minLength,
        message: `${fieldName} must be at least ${minLength} characters long`,
      };
    }
    if (pattern) {
      rules.pattern = {
        value: pattern,
        message: patternMessage || `Invalid ${fieldName}`,
      };
    }
    if (customValidate) {
      rules.validate = customValidate;
    }
  
    return rules;
  };
  
  // Specific validation rules for each field
  const nameValidation = createValidation({
    required: true,
    maxLength: 30,
    minLength: 2,
    pattern: /^[A-Za-z0-9\s]+$/,
    patternMessage: "Name can only contain letters, numbers and spaces",
    customValidate: (value) => value.trim() !== "" || "Name cannot be empty or just spaces",
    fieldName: "Name"
  });
  
  const usernameValidation = createValidation({
    required: true,
    maxLength: 20,
    minLength: 3,
    pattern: /^[A-Za-z0-9_]+$/,
    patternMessage: "Username can only contain letters, numbers, and underscores",
    fieldName: "Username"
  });
  
  const emailValidation = createValidation({
    required: true,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    patternMessage: "Invalid email address",
    fieldName: "Email"
  });
  
  const passwordValidation = createValidation({
    required: true,
    minLength: 8,
    maxLength: 20,
    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
    patternMessage: "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    fieldName: "Password"
  });

  const bioValidation = createValidation({
    maxLength: 150,
    fieldName: "Bio"
  });


  export {
    nameValidation,
    usernameValidation,
    emailValidation,
    passwordValidation,
    bioValidation
  };
  