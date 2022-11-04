import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BiErrorCircle } from "react-icons/bi";

//making schema using yup

const form = () => {
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
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Mismatched passwords")
      .required("Please confirm your password"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(
    {
      resolver: yupResolver(schema),
    },
    { mode: "onChange" }
  );

  const getData = (data) => console.log(data);
  return (
    <>
      <form
        className=' bg-sky-700 flex flex-col p-4 w-1/5 rounded-md'
        onSubmit={handleSubmit(getData)}>
        <h1 className=' text-white font-semibold text-3xl'>Register</h1>
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
            <BiErrorCircle className=' inline-block mr-2' />
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
            <BiErrorCircle className=' inline-block mr-2' />
            {errors.password.message}
          </p>
        )}
        <label className='text-white mt-3' htmlFor=''>
          Confirm Password:
        </label>
        <input
          className='border-2 border-sky-500 rounded-md p-1'
          type='password'
          {...register("confirmPassword", { required: true })}
        />
        {errors.confirmPassword && (
          <p className=' text-red-400 bg-slate-700 mt-3 p-2 rounded-md'>
            <BiErrorCircle className=' inline-block mr-2' />
            {errors.confirmPassword.message}
          </p>
        )}

        <button
          className='mt-3 bg-sky-300 text-white font-medium text-xl p-2 rounded-lg hover:bg-sky-400'
          type='submit'>
          Submit
        </button>
      </form>
    </>
  );
};

export default form;
