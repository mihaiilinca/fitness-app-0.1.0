import React from 'react';
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button.tsx";
import Header from "../components/Header.tsx";
import InputElement from "../components/InputElement.tsx";
import LoginImg from "../components/LoginImg.tsx";
import {
  getLoginError,
  loginAsync,
  selectIsLoggedIn,
} from "../redux/slices/userSlice.tsx";
import { motion } from "framer-motion";

function Login() {
  const dispatch = useDispatch();
  const loginError = useSelector(getLoginError);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  let navigate = useNavigate();

  let inputValues = useRef({ email: null, password: null });

  useEffect(() => {
    if (isLoggedIn === true) {
      navigate("/chooseProfile");
      return;
    }
  }, [isLoggedIn]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0 } }}
    >
      <Header isRegisterPage={false} isLogoutPage={false} />
      <div className="flex flex-col p-5 sm:p-0 sm:flex-row justify-between mt-6">
        <LoginImg />

        <div className="flex flex-col gap-y-3 p-10 mb-10 sm:mb-6 sm:w-1/2 sm:mr-3 justify-center rounded-lg shadow-2xl ">
          <div className="mb-6 mx-6 mt-5 ">
            <h2 className=" text-center ">
              Email und Passwort eingeben, um dich einzuloggen.
            </h2>
          </div>

          <InputElement
            label={"Email"}
            type={"email"}
            onChange={(event) =>
              (inputValues.current.email = event.target.value)
            }
          />
          <InputElement
            label={"Passwort"}
            type={"password"}
            onChange={(event) =>
              (inputValues.current.password = event.target.value)
            }
          />

          {loginError && <div>{loginError}</div>}

          <Button
            onClick={async () => {
              dispatch(
                loginAsync({
                  email: inputValues.current.email,
                  password: inputValues.current.password,
                })
              );
            }}
            label={"Login"}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default Login;
