import React, { useState } from "react";
import { authStore } from "../store/authStore";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { checkingSignup, signUp } = authStore();
  const validateForm = () => {};
  const handleSubmit = (e) => {
    e.PreventDefault();
  };

  return <div>SignUpPage</div>;
};

export default SignUpPage;
