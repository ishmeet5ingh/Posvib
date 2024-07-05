import React from 'react'
import  authService  from '../appwrite/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import {login as authLogin} from '../store/authSlice'
import { Input, Button, AuthContainer, ErrorContainer } from "./index";
import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react'
import {
  emailValidation,
  passwordValidation,
} from "./validation/validationRules";
import {FaStar} from 'react-icons/fa'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function Login() {

  const [error, setError] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {register, handleSubmit, formState: { errors }} = useForm()
  const authUser = useSelector(state => state.auth.userData)

  
  const login = async (data) => {
    toast("Logging in...", {
      autoClose: 3000
    })
    setError("");
    try {
      const session = await authService.login(data)
      if (session) {
        const userData = await authService.getUserData();
        if (userData) dispatch(authLogin({userData}));
        navigate("/");
        toast.success("Successfully logged in")
      }
    } catch (error) {
      toast("invalid Credentials")
    }
  };


  const onError = (errors) => {
    Object.values(errors).forEach(error => {
      toast.error(error.message, {
        className: "hidden xmd:flex",
        autoClose: 3000
      });
    });
  };



  return (
    <AuthContainer inup={"in"}>
      <form className='flex flex-col gap-3 text-white' onSubmit={handleSubmit(login, onError)}>
      <Input
          label="Email: "
          type="email"
          className=""
          placeholder="Enter Email"
          {...register("email", emailValidation)}
        />
        {errors.email && <ErrorContainer>{errors.email.message}</ErrorContainer>}
        
       
        <div>
        <Input
          label="Password: "
          type="password"
          className=""
          placeholder="Enter password"
          {...register("password", passwordValidation)}
        />
        {errors.password ? <ErrorContainer>{errors.password.message}</ErrorContainer> : 
          <p className="text-xs text-gray-400 flex gap-1"><FaStar style={{marginTop: '3px'}}/>  Password must contain at least one uppercase letter, one lowercase letter, and one number.</p>
        }
        </div>
          <p className="text-white text-sm my-2 text-center">

            Don&apos;t have any account?&nbsp;
            <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
            >
            Sign Up
          </Link>
        </p>
        <Button
          children="Submit"
          type='submit'
          className='py-2 rounded-xl'
        />
      </form>
      </AuthContainer>
  )
}

export default Login