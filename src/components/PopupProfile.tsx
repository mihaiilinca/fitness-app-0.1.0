import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeProfile,
  fetchProfiles,
  selectCurrentProfile,
} from "../redux/slices/profileSlice.tsx";
import { selectCookie, selectUser } from "../redux/slices/userSlice.tsx";
import profileService from "../services/profiles.tsx";
import InputElement from "./InputElement.tsx";
import { motion } from "framer-motion";

function PopupProfile(props) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const cookie = useSelector(selectCookie);
  const profile = useSelector(selectCurrentProfile);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [sex, setSex] = useState("0");

  const inputValues = useRef({
    name: null,
    age: null,
    height: null,
    weight: null,
    sex: 0,
    userId: user,
  });

  useEffect(() => {
    if (props.isEditing === true) {
      setName(profile.name);
      inputValues.current.name = profile.name;
      setAge(profile.age);
      inputValues.current.age = profile.age;
      setHeight(profile.height);
      inputValues.current.height = profile.height;
      setWeight(profile.weight);
      inputValues.current.weight = profile.weight;
      setSex(profile.sex);
      inputValues.current.sex = profile.sex;
    }
  }, [profile, props.isEditing]);

  const clearInput = () => {
    setName("");
    setAge("");
    setHeight("");
    setWeight("");
    inputValues.current = {
      name: null,
      age: null,
      height: null,
      weight: null,
      sex: 0,
      userId: user,
    };
  };

  return props.trigger ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.2 } }}
      exit={{ opacity: 0 }}
      className="flex fixed inset-0 w-full h-screen bg-slate-400 bg-opacity-50 justify-center items-center"
    >
      <div className="p-6 w-full max-w-sm bg-white rounded-xl">
        <div className="flex flex-col">
          <div className="flex justify-end">
            <button
              onClick={() => {
                if (props.isEditing === true) {
                  props.setIsEditing(false);
                }
                props.setShowPopup(false);
                dispatch(changeProfile({ newProfile: null }));
                clearInput();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <h3 className="flex justify-center text-2xl font-semibold">
            Profil {props.isEditing ? "bearbeiten" : "erstellen"}
          </h3>
          <div className="flex flex-col gap-y-3 mt-5">
            <InputElement
              value={name}
              label={"Name"}
              type={"text"}
              onChange={(event) => {
                setName(event.target.value);
                inputValues.current.name = event.target.value;
              }}
            />
            <InputElement
              value={age}
              label={"Alter"}
              onChange={(event) => {
                setAge(event.target.value);
                inputValues.current.age = event.target.value;
              }}
            />

            <InputElement
              value={height}
              label={"Höhe"}
              onChange={(event) => {
                setHeight(event.target.value);
                inputValues.current.height = event.target.value;
              }}
            />
            <InputElement
              value={weight}
              label={"Gewicht"}
              onChange={(event) => {
                setWeight(event.target.value);
                inputValues.current.weight = event.target.value;
              }}
            />
            <div className="flex justify-center ">
              <div className="justify-center max-w-xs">
                <div>Geschlecht</div>
                <select
                  value={sex === 0 ? "Mann" : "Frau"}
                  name="gender"
                  onChange={(event) => {
                    const value = event.target.value;
                    inputValues.current.sex = value === "Mann" ? 0 : 1;
                    setSex(value === "Mann" ? 0 : 1);
                  }}
                >
                  <option>Mann</option>
                  <option>Frau</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button
              className="px-10 py-2 rounded-lg bg-slate-200 transition transform hover:scale-110"
              onClick={async () => {
                if (props.isEditing) {
                  inputValues.current.profileId = profile._id;
                  await profileService.updateProfileById(
                    cookie,
                    inputValues.current
                  );
                } else {
                  await profileService.addProfile(cookie, inputValues.current);
                }

                dispatch(fetchProfiles({ userId: user, cookie: cookie }));
                props.setShowPopup(false);
                clearInput();
              }}
            >
              {props.isEditing ? "Speichern" : "Erstellen"}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  ) : (
    ""
  );
}

export default PopupProfile;
