import * as Yup from "yup";

const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
export const userSchema = Yup.object().shape({
    user: Yup.object({
      firstName: Yup.string()
      .min(3, 'Must be more than 3 char')
      .max(15, 'Must be 15 chars or less')
      .required('Please provide your First name'),
      lastName: Yup.string()
      .min(3, 'Must be more than 3 char')
      .max(15, 'Must be 15 chars or less')
      .required('Please provide your Last name'),
      userName: Yup.string(),
      password: Yup.string()
      .min(8,'password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special')
      .required("Please provide a password")
      .matches(passwordRules, "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"),
      email: Yup.string().required("Please provide your Email")
    })
    
});

export const loginSchema = Yup.object().shape({
  user: Yup.object({
    password: Yup.string()
    .min(8,'password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special')
    .required("Please provide a password")
    .matches(passwordRules, "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"),
    email: Yup.string().required("Please provide your Email")
  })
  
});

