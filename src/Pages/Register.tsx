import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button.tsx";
import Header from "../components/Header.tsx";
import InputElement from "../components/InputElement.tsx";
import RegisterImg from "../components/RegisterImg.tsx";
import { loginAsync } from "../redux/slices/userSlice.tsx";
import authService from "../services/auth.tsx";
import { motion } from "framer-motion";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registrationDataRef = useRef({
    firstname: "",
    lastname: "",
    street: "",
    postcode: "",
    city: "",
    country: "",
    phone: "",
    password: "",
    email: "",
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0 } }}
    >
      <Header isRegisterPage={true} isLogoutPage={false} />
      <div className="flex flex-col p-5 sm:flex-row mt-6">
        <RegisterImg />

        <div className="flex flex-col p-10 gap-y-4 mb-10 sm:mb-6 sm:w-1/2 sm:mr-3 rounded-lg shadow-2xl">
          <div className="mb-6 mx-6 mt-5 text-center">
            <h2>
              Registriere dich noch heute, um deine persönlichen Aktivitäten
              regelmäßig aufzuzeichen.
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row justify-center">
            <InputElement
              label={"Vorname"}
              name={"firstname"}
              onChange={(event) =>
                (registrationDataRef.current.firstname = event.target.value)
              }
            />
            <InputElement
              label={"Nachname"}
              name={"lastname"}
              onChange={(event) =>
                (registrationDataRef.current.lastname = event.target.value)
              }
            />
          </div>

          <div className="flex flex-col lg:flex-row justify-center ">
            <InputElement
              label={"Straße, Hausnummer"}
              name={"street"}
              onChange={(event) =>
                (registrationDataRef.current.street = event.target.value)
              }
            />
          </div>
          <div className="flex flex-col lg:flex-row justify-center">
            <InputElement
              label={"PLZ"}
              name={"postcode"}
              onChange={(event) =>
                (registrationDataRef.current.postcode = event.target.value)
              }
            />
            <InputElement
              label={"Ort"}
              name={"city"}
              onChange={(event) =>
                (registrationDataRef.current.city = event.target.value)
              }
            />
          </div>

          <div className="flex flex-col lg:flex-row justify-center">
            <InputElement
              label={"Land"}
              name={"country"}
              onChange={(event) =>
                (registrationDataRef.current.country = event.target.value)
              }
            />
            <InputElement
              label={"Telefonnummer"}
              name={"phone"}
              onChange={(event) =>
                (registrationDataRef.current.phone = event.target.value)
              }
            />
          </div>

          <div className="flex flex-col lg:flex-row justify-center">
            <InputElement
              label={"Email"}
              type={"email"}
              onChange={(event) =>
                (registrationDataRef.current.email = event.target.value)
              }
            />
            <InputElement
              label={"Passwort"}
              type={"password"}
              onChange={(event) =>
                (registrationDataRef.current.password = event.target.value)
              }
            />
          </div>

          <Button
            onClick={async () => {
              const response = await authService.registerUser(
                registrationDataRef
              );
              if (response.status === 201) {
                dispatch(
                  loginAsync({
                    email: registrationDataRef.current.email,
                    password: registrationDataRef.current.password,
                  })
                );
                navigate("/login");
              }
            }}
            label={"Registrieren"}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default Register;
