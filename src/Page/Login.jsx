import React, { useState } from "react";
import Logo from "../assets/logo.svg";
import useToggle from "../Hooks/useToggle";
import Button from "../Components/Button";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthSliceActions } from "../Store/AuthSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import ErrorMessage from "../Components/ErrorMessage";
import LoadingIcon from "../assets/processing.gif";
export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in

        const user = userCredential.user;
        dispatch(AuthSliceActions.login(user));

        navigate("/");
        setIsLoading(false);
        localStorage.setItem("currentUser", user);
      })
      .catch((error) => {
        setIsLoading(false);
        setError("Email or password is invalid");
      });
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-darkBlue">
      <div
        className="flex flex-col justify-evenly items-center h-full w-full md:justify-normal md:space-y-[5.2rem] md:mt-[4.5rem] 
      "
      >
        <img className="w-[2rem]" src={Logo}></img>
        <form
          onSubmit={handleLogin}
          className="bg-semiDarkBlue w-[90%]  flex flex-col space-y-4 p-8 rounded-xl md:w-[52%] ] lg:w-[28%] "
        >
          <h1 className="text-white text-center">Login</h1>
          <input
            type="email"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          {/* <ReCAPTCHA
            sitekey={import.meta.env.VITE_REACT_RECAPTCHA_KEY}
            ref={captchaRef}
          ></ReCAPTCHA> */}

          <Button name={"Login to your account"}></Button>
          {isLoading && (
            <div className="w-full flex flex-col items-center justify-center text-white">
              <img className="h-auto w-44 mx-auto" src={LoadingIcon}></img>
              <p>Loading...</p>
            </div>
          )}
          {error && <ErrorMessage msg={error}></ErrorMessage>}
        </form>
      </div>
    </div>
  );
}
