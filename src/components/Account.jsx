import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CommonForm from "./CommonForm";
import * as Yup from "yup";
import { toast } from "react-toastify";

/******************* 
@purpose : Used for render user account data
@param:{}
@author:"ketan"
********************/
function Account() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("LoggedInUser")) || [];
  const authenticatedUser = user;

  /******************* 
   @purpose : Used for intial value
   @author:"ketan"
  ********************/
  const initialValues = {
    name: authenticatedUser?.name || "",
    email: authenticatedUser?.email || "",
    password: authenticatedUser?.password || "",
  };

  /******************* 
   @purpose : Used for create validationSchema
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
   @purpose : Used for update user values
   @param:{values}
   @author:"ketan"
  ********************/
  const onSubmit = (values) => {
    const users = JSON.parse(localStorage.getItem("users"));
    const updatedUsers = users.map((user) =>
      user.email === authenticatedUser.email ? values : user
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("LoggedInUser", JSON.stringify(values));
    toast.success("Account details updated successfully!");
  };

  const fields = [
    { name: "name", type: "text", label: "Name" },
    { name: "email", type: "email", label: "Email" },
    { name: "password", type: "password", label: "Password" },
  ];

  /******************* 
   @purpose : Used for logout user
   @param:{}
   @author:"ketan"
  ********************/
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to access your account until you log in again!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("LoggedInUser");
        toast.success("User Logout successful!x");
        navigate("/login");
      }
    });
  };

  /******************* 
   @purpose : Used for urender html
   @author:"ketan"
  ********************/
  return (
    <div className='card p-4'>
      <h2 className='text-center'>Account Information</h2>
      <CommonForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        fields={fields}
        buttonLabel='Update'
      />
      <button className='btn btn-danger w-100 mt-3' onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Account;
