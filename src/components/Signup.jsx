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

function Signup() {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const error = useSelector((state) => state.error.error);
  const [showPassword, setShowPassword] = useState(false);

  const signup = async (data) => {
    try {
      const userAccount = await authService.createAccount(data);
      if (userAccount) {
        const userData = await authService.getUserData();
        if (userData) {
          dispatch(authLogin({ userData }));
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContainer inup={"up"}>
      <form className="flex  flex-col" onSubmit={handleSubmit(signup)}>
        <Input
          label="Name: "
          type="text"
          className=""
          placeholder="Enter name"
          {...register("name", nameValidation)}
        />
        {errors.name && <ErrorContainer>{errors.name.message}</ErrorContainer>}

        <Input
          label="Username: "
          type="text"
          className=""
          placeholder="Enter Username"
          {...register("username", usernameValidation)}
        />
        {errors.username && <ErrorContainer>{errors.username.message}</ErrorContainer>}

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
        
        {errors.password && <ErrorContainer>{errors.password.message}</ErrorContainer>}
        </div>

        <p className="my-2 text-center text-[14px] text-base">
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
