import React from "react";
import { useForm } from "react-hook-form";

const form = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <>
      <form></form>
    </>
  );
};

export default form;
