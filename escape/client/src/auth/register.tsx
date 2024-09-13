/* eslint-disable @typescript-eslint/no-explicit-any */
import { userSchema } from './schema';
import { InferType } from 'yup';
import { Formik } from 'formik';
import {registerUser} from '../services/authServices';
import {Response} from '../services/response';


import './auth.css';
import { useNavigate } from 'react-router-dom';
import { MSGs, PROMTPS } from '../constants/messages';

const Register = () => {
  type User = InferType<typeof userSchema>;

  const initialValue:User = {
    user: {
      firstName: "",
      lastName: "",
      userName:"",
      email: "",
      password: ""
    }
  }
    
    const navigate = useNavigate();


    return (
    <div className="Eform space-grotesk-body">
      <div className="jumbotron">
      <h1 className='space-grotesk-h1'>{MSGs.LOGIN_HEADING}</h1>
      <hr className="my-4"></hr>
      </div>
      <Formik
        initialValues={initialValue}
        validationSchema={userSchema}
         onSubmit={async (values, {resetForm})=>{
          const response = await registerUser(values.user);
          //console.log(response)
           if(response.success){
             navigate("/", {state:response});
             resetForm();
           }
          

        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched
    
        }) => (
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-6">
          <input 
            type="text" 
            className="form-control" 
            placeholder="First name (required)" 
            id="firstName"
            onChange={handleChange('user.firstName')}
            onBlur={handleBlur('user.firstName')}
            value={values.user.firstName}
            />
            {errors.user?.firstName && touched.user?.firstName ? (
             <div className="formErrors">{errors.user?.firstName}</div>) : null}
        </div>
       <div className="col-6">
        <input 
          type="text" 
          className="form-control" 
          id="lastName"
          placeholder="Last name (required)" 
          onChange={handleChange('user.lastName')}
          onBlur={handleBlur('user.lastName')}
          value={values.user.lastName}
          />
          {errors.user?.lastName && touched.user?.lastName ? (
             <div className="formErrors">{errors.user?.lastName}</div>) : null}
        </div>
        <div className="col-10">
          <input 
            type="text" 
            className="form-control" 
            placeholder="User name"
            id="userName" 
            aria-describedby="nameHelp" 
            onChange={handleChange('user.userName')}
            onBlur={handleBlur('user.userName')}
            value={values.user.userName}
             />
          <div id="nameHelp" className="form-text fst-italic">{PROMTPS.USER_NAME}</div>
        </div>
        <div className="col-12">          
          <input 
            type="email" 
            className="form-control" 
            id="email" 
            placeholder="Email (required)"
            aria-describedby="emailHelp" 
            onChange={handleChange('user.email')}
            onBlur={handleBlur('user.email')}
            value={values.user.email}
            />
          <div id="emailHelp" className="form-text fst-italic">{MSGs.ASSURANCE}</div>
        </div>
        <div className="col-10">
          <input 
            type="password" 
            className="form-control col-6" 
            id="password" 
            placeholder="Password (required)"
            onChange={handleChange('user.password')}
            onBlur={handleBlur('user.password')}
            value={values.user.password}
            />
          {errors.user?.password && touched.user?.password ? (
             <div className="formErrors">{errors.user?.password}</div>) : null}
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Sign Up</button>
        </div>
        <div className="col-12">
          <label className="form-label">{PROMTPS.LOGIN} </label>
          <button type="submit" className="btn btn-primary">Sign In</button>
        </div>
      </form>
      )}
      </Formik>
    </div>
    );
};

export default Register;