import React from "react";
import loginImg from "../../../assets/login.png";
import AuthSideImage from "../AuthSideImage/AuthSideImage";
import AuthSwitchLink from "../AuthSwitchLink/AuthSwitchLink";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import FormButton from "../../common/FormButton/FormButton";
import { useAuth } from "../../../context/AuthContext";
import FormAlert from "../../common/FormAlert/FormAlert";
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";
import GoogleButton from "../../common/GoogleButton/GoogleButton";
import Logo from "../../common/Logo/Logo";
import Divider from "../../common/Divider/Divider";

export default function Login() {
  const { login } = useAuth();
  let navigate = useNavigate();
  async function handleLogin(values, { setStatus }) {
    try {
      const res = await login(values.email, values.password);
      if (res.success) {
        setStatus({ type: "success", message: res.message });
        navigate("/");
      } else {
        if (res.email_not_verified) {
          setStatus({
            type: "error",
            message: res.message,
          });
        } else {
          setStatus({ type: "error", message: res.message });
        }
      }
    } catch (error) {
      console.log(error);
      setStatus({ type: "error", message: "Something went wrong" });
    }
  }

  function validateForm(values) {
    let errors = {};
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
      email: "",
      password: "",
    },
    validate: validateForm,
    onSubmit: handleLogin,
  });
  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <Logo />
            <p className="mt-2 text-gray-500  dark:text-white">
              Log in to your account
            </p>
          </div>
          <div className="mt-8">
            <div className="mt-6">
              <form className="space-y-6" onSubmit={formic.handleSubmit}>
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700  dark:text-white"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      className="block w-full appearance-none rounded-md border border-gray-300 bg-gray-50 px-3 py-3 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                      id="email"
                      name="email"
                      value={formic.values.email}
                      onChange={formic.handleChange}
                      onBlur={formic.handleBlur}
                      placeholder="Enter your email"
                      required=""
                      type="email"
                    />
                  </div>
                </div>
                {formic.errors.email && formic.touched.email ? (
                  <FormAlert message={formic.errors.email} />
                ) : null}
                <div className="space-y-1">
                  <label
                    className="block text-sm font-medium text-gray-700  dark:text-white"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      className="block w-full appearance-none rounded-md border border-gray-300 bg-gray-50 px-3 py-3 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                      id="password"
                      name="password"
                      value={formic.values.password}
                      onChange={formic.handleChange}
                      onBlur={formic.handleBlur}
                      placeholder="Enter your password"
                      required=""
                      type="password"
                    />
                  </div>
                  {formic.errors.password && formic.touched.password ? (
                    <FormAlert message={formic.errors.password} />
                  ) : null}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                    />
                    <label
                      className="ml-2 block text-sm text-gray-900  dark:text-white"
                      htmlFor="remember-me"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a
                      className="font-medium text-primary-600 hover:text-primary-500"
                      href="#"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>
                {formic.isSubmitting ? (
                  <LoadingSpinner />
                ) : (
                  <FormButton>log in</FormButton>
                )}

                {formic.status && (
                  <FormAlert
                    message={formic.status.message}
                    type={formic.status.type}
                  />
                )}
              </form>
              <Divider />
              <GoogleButton />
              <AuthSwitchLink>
                <span className="dark:text-white/60">New to EcoCycle?</span>
                <Link
                  to="/register"
                  className="font-medium text-primary-600 hover:text-primary-500"
                >
                  Register now
                </Link>
              </AuthSwitchLink>
            </div>
          </div>
        </div>
      </div>
      <AuthSideImage src={loginImg} alt="Inside of a recycling factory" />
    </div>
  );
}
