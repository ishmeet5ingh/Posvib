import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../appwrite/auth";
import { login as authLogin } from "../../store/authSlice";
import { v4 as uuidv4 } from "uuid";

import {
  Input,
  Button,
  AuthContainer,
  ErrorContainer,
  InfoMessage,
} from "../index";
import {
  nameValidation,
  usernameValidation,
  emailValidation,
  passwordValidation,
} from "../validation/validationRules";
import { FaEye, FaEyeSlash, FaInfoCircle, FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const dispatch = useDispatch();
  const [error, setError] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [show, setShow] = useState(false);

  const signup = async (data) => {
    toast("Signing up...");
    const id = uuidv4();
    try {
      const userAccount = await authService.createAccount(id,{...data}, setError);
      if (userAccount) {
        const userData = await authService.getUserData();
        if (userData) {
          dispatch(authLogin({ userData }));
          navigate("/");
          toast.success("Successfully signed up.");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=> {
    if(error === "Document with the requested ID already exists. Try again with a different ID or use ID.unique() to generate a unique ID."){
      toast.error("Username already taken.", {
        autoClose: 3000
      })
      setError("")
    }else if(error=== "A user with the same id, email, or phone already exists in this project."){
      toast.error("Email already taken.")
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
    <AuthContainer inup={"up"}>
      <form
        className="flex flex-col gap-3 text-white"
        onSubmit={handleSubmit(signup, onError)}
      >
        <div>
          <Input
            label="Name: "
            type="text"
            placeholder="Enter name"
            {...register("name", nameValidation)}
          />
          {errors.name ? (
            <ErrorContainer>{errors.name.message}</ErrorContainer>
          ) : (
            <InfoMessage message="Name can only contain letters, numbers and spaces." />
          )}
        </div>

        <div>
          <Input
            label="Username: "
            type="text"
            placeholder="Enter Username"
            {...register("username", usernameValidation)}
          />
          {errors.username ? (
            <ErrorContainer>{errors.username.message}</ErrorContainer>
          ) : (
            <InfoMessage message="Username can only contain letters, numbers, and underscores." />
          )}
        </div>

        <div>
          <Input
            label="Email: "
            type="email"
            placeholder="Enter Email"
            {...register("email", emailValidation)}
          />
          {errors.email && (
            <ErrorContainer>{errors.email.message}</ErrorContainer>
          )}
        </div>

        <div className="relative">
          <Input
            label="Password: "
            type={isPasswordVisible ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Enter password"
            {...register("password", passwordValidation)}
          />
          {errors.password ? (
            <ErrorContainer>{errors.password.message}</ErrorContainer>
          ) : (
            <InfoMessage
              message=" Password must contain at least one uppercase letter, one
                  lowercase letter, and one number."
            />
          )}
          <button
            type="button"
            className="absolute text-white right-3 top-[35%]  text-xl"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <p className="my-2 text-sm text-white text-center ">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        <Button children="Submit" type="submit" className="py-2 rounded-xl" />
      </form>
    </AuthContainer>
  );
}

export default Signup;
