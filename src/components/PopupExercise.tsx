import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button.tsx";
import {
  changeExercise,
  fetchExercises,
  selectCurrentExercise,
} from "../redux/slices/exerciseSlice.tsx";
import { selectCookie } from "../redux/slices/userSlice.tsx";
import exerciseService from "../services/exercises.tsx";
import InputElement from "./InputElement.tsx";
import { motion } from "framer-motion";

function PopupExercise(props) {
  const dispatch = useDispatch();
  const cookie = useSelector(selectCookie);
  const exercise = useSelector(selectCurrentExercise);
  const [name, setName] = useState("");
  const [baseTime, setBaseTime] = useState("");
  const [energyBurned, setEnergyBurned] = useState("");

  useEffect(() => {
    if (props.isEditing === true) {
      setName(exercise.name);
      setBaseTime(exercise.baseTime);
      setEnergyBurned(exercise.energyBurned);
    }
  }, [exercise, props.isEditing]);

  const clearInput = () => {
    setName("");
    setBaseTime("");
    setEnergyBurned("");
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
                dispatch(changeExercise({ newExercise: null }));
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
            Übung {props.isEditing ? "bearbeiten" : "erstellen"}
          </h3>
          <div className="flex flex-col gap-y-3 mt-5">
            <InputElement
              value={name}
              label={"Name"}
              type={"text"}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <InputElement
              value={baseTime}
              label={"Zeit (min)"}
              onChange={(event) => {
                setBaseTime(event.target.value);
              }}
            />

            <InputElement
              value={energyBurned}
              label={"Kalorien"}
              onChange={(event) => {
                setEnergyBurned(event.target.value);
              }}
            />
          </div>
          <Button
            label={props.isEditing ? "Speichern" : "Erstellen"}
            onClick={async () => {
              if (props.isEditing) {
                await exerciseService.updateExerciseById(cookie, {
                  name: name,
                  baseTime: baseTime,
                  energyBurned: energyBurned,
                  exerciseId: exercise._id,
                });
              } else {
                await exerciseService.addExercise(cookie, {
                  name: name,
                  baseTime: baseTime,
                  energyBurned: energyBurned,
                });
              }

              dispatch(fetchExercises());
              props.setIsEditing(false);
              props.setShowPopup(false);
              clearInput();
            }}
          />
        </div>
      </div>
    </motion.div>
  ) : (
    ""
  );
}

export default PopupExercise;
