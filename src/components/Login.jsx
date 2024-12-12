import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CommonForm from "./CommonForm";
import * as Yup from "yup";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

 /******************* 
  @purpose : Used for user validation
  @param:{value}
  @author:"ketan"
********************/
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required").min(6).max(16),
  });

/******************* 
  @purpose : Used for submit user 
  @param:{value}
  @author:"ketan"
********************/
  const onSubmit = (values) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === values.email && u.password === values.password
    );

    if (user) {
      navigate("/account");
      localStorage.setItem("LoggedInUser", JSON.stringify(user));
      localStorage.setItem("authenticated", "true");
      toast.success("User Login successfullu!");
    } else {
      Swal.fire("Error", "Invalid credentials!", "error");
    }
  };

  const fields = [
    { name: "email", type: "email", label: "Email" },
    { name: "password", type: "password", label: "Password" },
  ];

  return (
    <div className='card p-5 '>
      <h2 className='text-center'>Login</h2>
      <CommonForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        fields={fields}
        buttonLabel='Login'
      />
      <p className='text-center mt-3'>
        Don't have an account? <a href='/register'>Register here</a>
      </p>
    </div>
  );
}

export default Login;
