import React from 'react'
import  authService  from '../appwrite/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import {login as authLogin} from '../store/authSlice'
import {Logo, Input, Button, AuthContainer} from './index'
import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react'
// import { }

function Login() {

  const [error, setError] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {register, handleSubmit} = useForm()
  const authUser = useSelector(state => state.auth.userData)
  
  
  
  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data)
      if (session) {
        const userData = await authService.getUserData();
        if (userData) dispatch(authLogin({userData}));
        navigate("/");
      }
    } catch (error) {
      setError(error);
    }
  };

  console.log("error--",error);

  return (
    <AuthContainer inup={"in"}>
      <form className='flex flex-col' onSubmit={handleSubmit(login)}>
        <Input
          label="email: "
          type="email"
          className=""
          placeholder="Enter Email"
          {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
        />
        <Input
          label="password: "
          type="password"
          className=""
          placeholder="Enter password"
          {...register("password", {
            required: true
          })}
        />
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