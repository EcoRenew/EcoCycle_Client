import React from "react";
import Logo from "../../common/Logo/Logo";
import GoogleButton from "../../common/GoogleButton/GoogleButton";
import Divider from "../../common/Divider/Divider";
import FormButton from "../../common/FormButton/FormButton";
import AuthSideImage from "../AuthSideImage/AuthSideImage";
import registerImg from "../../../assets/register.png";
import { useFormik } from "formik";
import { useAuth } from "../../../context/AuthContext";
import FormAlert from "../../common/FormAlert/FormAlert";
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";
import { Link, useNavigate } from "react-router-dom";
import AuthSwitchLink from "../AuthSwitchLink/AuthSwitchLink";

export default function Register() {
  let navigate = useNavigate();
  const { register } = useAuth();
  async function handleRegister(values, { setStatus }) {
    try {
      const res = await register(values.name, values.email, values.password);
      if (res.success) {
        setStatus({ type: "success", message: res.message });
        navigate("/login");
      } else {
        setStatus({ type: "error", message: res.message });
      }
    } catch (error) {
      console.log(error);
    }
  }
  function validateForm(values) {
    let errors = {};
    if (!values.name) {
      errors.name = "Name is Required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = "Invalid email format";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    if (!/^.{8,}$/.test(values.password)) {
      errors.password = "Password must be at least 8 characters";
    }
    return errors;
  }
  let formic = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: validateForm,
    onSubmit: handleRegister,
  });
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden dark:text-white">
      <div className="flex-grow">
        <div className="grid md:grid-cols-2 min-h-screen">
          <div className="flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
            <div className="mx-auto w-full max-w-sm lg:w-96 ">
              <div>
                <Logo />
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white ">
                  Create your EcoCycle account
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-white/60">
                  Join the community and start making a difference.
                </p>
              </div>
              <div className="mt-8">
                <GoogleButton />
                <Divider />
                <div className="mt-6">
                  <form onSubmit={formic.handleSubmit} className="space-y-6">
                    <div>
                      <label className="sr-only" htmlFor="full-name">
                        Full Name
                      </label>
                      <input
                        className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                        id="full-name"
                        name="name"
                        value={formic.values.name}
                        onChange={formic.handleChange}
                        onBlur={formic.handleBlur}
                        placeholder="Full Name"
                        required=""
                        type="text"
                      />
                    </div>
                    {formic.errors.name && formic.touched.name ? (
                      <FormAlert message={formic.errors.name} />
                    ) : null}
                    <div>
                      <label className="sr-only" htmlFor="email-address">
                        Email address
                      </label>
                      <input
                        className="relative block w-full appearance-none border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                        id="email-address"
                        name="email"
                        value={formic.values.email}
                        onChange={formic.handleChange}
                        onBlur={formic.handleBlur}
                        placeholder="Email address"
                        required=""
                        type="email"
                      />
                    </div>
                    {formic.errors.email && formic.touched.email ? (
                      <FormAlert message={formic.errors.email} />
                    ) : null}
                    <div>
                      <label className="sr-only" htmlFor="password">
                        Password
                      </label>
                      <input
                        className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                        id="password"
                        name="password"
                        value={formic.values.password}
                        onChange={formic.handleChange}
                        onBlur={formic.handleBlur}
                        placeholder="Password"
                        required=""
                        type="password"
                      />
                    </div>
                    {formic.errors.password && formic.touched.password ? (
                      <FormAlert message={formic.errors.password} />
                    ) : null}
                    {formic.isSubmitting ? (
                      <LoadingSpinner />
                    ) : (
                      <FormButton>Create Account</FormButton>
                    )}
                    {formic.status && (
                      <FormAlert
                        message={formic.status.message}
                        type={formic.status.type}
                      />
                    )}
                  </form>
                  <AuthSwitchLink>
                    <span className="dark:text-white/60">
                      Already have an account?
                    </span>
                    <Link
                      to="/login"
                      className="font-medium text-primary-600 hover:text-primary-500"
                    >
                      Log In
                    </Link>
                  </AuthSwitchLink>
                </div>
              </div>
            </div>
          </div>

          <AuthSideImage
            src={registerImg}
            alt="Inside of a recycling factory with a conveyor belt of broken electronics being sorted."
          />
        </div>
      </div>
    </div>
  );
}
