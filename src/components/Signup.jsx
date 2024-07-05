import React,{useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { login as authLogin } from "../store/authSlice";
import { Input, Button, AuthContainer, ErrorContainer } from "./index";
import {
  nameValidation,
  usernameValidation,
  emailValidation,
  passwordValidation,
} from "./validation/validationRules";
import {FaStar} from 'react-icons/fa'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const error = useSelector((state) => state.error.error);
  const [showPassword, setShowPassword] = useState(false);

  const signup = async (data) => {
    toast("Signing up...")
    try {
      const userAccount = await authService.createAccount(data);
      if (userAccount) {
        const userData = await authService.getUserData();
        if (userData) {
          dispatch(authLogin({ userData }));
          navigate("/");
          toast.success("Successfully signed up")
        }
      }
    } catch (error) {
      console.log(error);
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
    <AuthContainer inup={"up"}>
      <form className="flex flex-col gap-3 text-white" onSubmit={handleSubmit(signup, onError)}>
       
       <div>
       <Input
          label="Name: "
          type="text"
          placeholder="Enter name"
          {...register("name", nameValidation)}
        />
        {errors.name ? <ErrorContainer>{errors.name.message}</ErrorContainer> : 
          <p className="text-xs text-gray-500 flex gap-1 "><FaStar style={{marginTop: '3px'}}/> Name can only contain letters, numbers and spaces.</p>
          
        }
       </div>

        <div>
        <Input
          label="Username: "
          type="text"
          placeholder="Enter Username"
          {...register("username", usernameValidation)}
        />
        {errors.username ? <ErrorContainer>{errors.username.message}</ErrorContainer> : 
          <p className="text-xs text-gray-500 flex gap-1"><FaStar style={{marginTop: '3px'}}/>  Username can only contain letters, numbers, and underscores.</p>
        }
        </div>

       <div>
       <Input
          label="Email: "
          type="email"
          className=""
          placeholder="Enter Email"
          {...register("email", emailValidation)}
        />
        {errors.email && <ErrorContainer>{errors.email.message}</ErrorContainer> }
       </div>

        <div>
        <Input
          label="Password: "
          type="password"
          className=""
          placeholder="Enter password"
          {...register("password", passwordValidation)}
        />
        {errors.password ? <ErrorContainer>{errors.password.message}</ErrorContainer> : 
          <p className="text-xs text-gray-500 flex gap-1"><FaStar style={{marginTop: '3px'}}/>  Password must contain at least one uppercase letter, one lowercase letter, and one number.</p>
        }
        </div>

        <p className="my-2 text-sm text-white text-center ">
          Already have an account?&nbsp;
          <Link to="/login" className="font-medium text-primary transition-all duration-200 hover:underline">
            Sign In
          </Link>
        </p>
        <Button children="Submit" type="submit" className="py-2 rounded-xl" />
      </form>
    </AuthContainer>
  );
}

export default Signup;
