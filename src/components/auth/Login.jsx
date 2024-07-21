import React, { useEffect } from "react";
import authService from "../../appwrite/auth";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { login as authLogin } from "../../store/authSlice";
import { Input, Button, AuthContainer, ErrorContainer, InfoMessage } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  emailValidation,
  passwordValidation,
} from "../validation/validationRules";
import {
  FaEye,
  FaEyeSlash,
  FaInfo,
  FaInfoCircle,
  FaStar,
} from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearError } from "../../store/errorSlice";

function Login() {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("")

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const authUser = useSelector((state) => state.auth.userData);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const login = async (data) => {
    toast("Logging in...", {
      autoClose: 3000,
    });
    try {
      const session = await authService.login({...data}, setError);
      if (session) {
        const userData = await authService.getUserData();
        if (userData) dispatch(authLogin({ userData }));
        navigate("/");
        toast.success("Successfully logged in");
      }
    } catch (error) {
      toast("invalid Credentials");
    }
  };

  useEffect(()=> {
    if(error){
      toast.error(error)
      setError("")
    }
  }, [error])


  const onError = (errors) => {
    Object.values(errors).forEach((error) => {
      toast.error(error.message, {
        className: "hidden xmd:flex",
        autoClose: 3000,
      });
    });
  };

  return (
    <AuthContainer inup={"in"}>
      <form
        className="flex flex-col gap-3 text-white"
        onSubmit={handleSubmit(login, onError)}
      >
        <Input
          label="Email: "
          type="email"
          placeholder="Enter Email"
          {...register("email", emailValidation)}
        />
        {errors.email && (
          <ErrorContainer>{errors.email.message}</ErrorContainer>
        )}

        <div className="relative">
          <Input
            label="Password: "
            autoComplete="new-password"
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Enter password"
            {...register("password", passwordValidation)}
          />
          {errors.password ? (
            <ErrorContainer>{errors.password.message}</ErrorContainer>
          ) : (
           <InfoMessage message=" Password must contain at least one uppercase letter, one
                  lowercase letter, and one number."/>
          )}
          <button
            type="button"
            className="absolute text-white right-3 top-[35%]  text-xl"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
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
        <Button children="Submit" type="submit" className="py-2 rounded-xl" />
      </form>
    </AuthContainer>
  );
}

export default Login;
