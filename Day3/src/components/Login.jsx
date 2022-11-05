import React from "react";

// import axios from "../api/axios";
// import AuthContext from "../context/AuthProvider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// const LOGIN_URL = "/login";

const Login = () => {
  // const { setAuthenticated } = useContext(AuthContext);
  const schema = yup.object().shape({
    username: yup
      .string()
      .email("mail did not match format - test@example.com")
      .required("Username is required"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const getdata = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(LOGIN_URL, data);
      setAuthenticated(true);
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      console.log(error);
    }
  };
  const [submit, setSubmit] = React.useState(false);
  return (
    <>
      {submit ? (
        <div>Form Submitted Successfully</div>
      ) : (
        <form
          onSubmit={handleSubmit(getdata)}
          className=' bg-sky-700 flex flex-col p-4 w-1/5 rounded-md'>
          <h1 className=' text-white font-semibold text-3xl'>Login</h1>
          <label className='text-white mt-3' htmlFor=''>
            Username:
          </label>
          <input
            type='text'
            className='border-2 border-sky-500 rounded-md p-1'
            {...register("username", { required: true })}
          />
          {errors.username && (
            <p className=' text-red-400 bg-slate-700 mt-3 p-2 rounded-md'>
              {errors.username.message}
            </p>
          )}
          <label className='text-white mt-3' htmlFor=''>
            Password:
          </label>
          <input
            className='border-2 border-sky-500 rounded-md p-1'
            type='password'
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className=' text-red-400 bg-slate-700 mt-3 p-2 rounded-md'>
              {errors.password.message}
            </p>
          )}

          <button
            className='mt-3 bg-sky-300 text-white font-medium text-xl p-2 rounded-lg disabled:bg-sky-200 disabled:text-slate-400 '
            type='submit'>
            Login
          </button>
          <p className=' text-slate-300 mt-2'>Not Registered yet?</p>
          <p className=' text-white text-slate-300 underline'>
            <a href='#'>Sign up</a>
          </p>
        </form>
      )}
    </>
  );
};

export default Login;
