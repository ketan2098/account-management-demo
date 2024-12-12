import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CommonForm from "./CommonForm";
import * as Yup from "yup";

/******************* 
  @purpose : Used for register user 
  @author:"ketan"
********************/

function Register() {
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  /******************* 
  @purpose : Used for user validation 
  @param:{value}
  @author:"ketan"
********************/

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  /******************* 
  @purpose : Used for submit user 
  @param:{value}
  @author:"ketan"
********************/

  const onSubmit = (values) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    let usersArr = [users];
    usersArr.push(values);
    localStorage.setItem("users", JSON.stringify(usersArr));
    Swal.fire("Success", "Registration successful!", "success").then(() =>
      navigate("/login")
    );
  };

  const fields = [
    { name: "name", type: "text", label: "Name" },
    { name: "email", type: "email", label: "Email" },
    { name: "password", type: "password", label: "Password" },
  ];

  return (
    <div className='card p-4'>
      <h2 className='text-center'>Register</h2>
      <CommonForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        fields={fields}
        buttonLabel='Register'
      />

      <p className='text-center mt-3'>
        Already have account? <a href='/login'>Login here</a>
      </p>
    </div>
  );
}

export default Register;
