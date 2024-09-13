import { loginSchema } from './schema';
import { InferType } from 'yup';
import { Formik } from 'formik';

import './auth.css';
import { loginUser } from '../services/authServices';
import { useNavigate } from 'react-router-dom';
import { MSGs } from '../constants/messages';

const SignIn = () => {
    type User = InferType<typeof loginSchema>;
    const initialValue:User = {
        user: {
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
                validationSchema={loginSchema}
                onSubmit={async (values, {resetForm})=>{
                  const response = await loginUser(values.user);
                  console.log(response)
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
                  <button type="submit" className="btn btn-primary">Sign In</button>
                </div>
              </form>
              )}
              </Formik>
            </div>
            );  
}

export default SignIn;