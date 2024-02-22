import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button.tsx";
import DayExerciseElement from "../components/DayExerciseElement.tsx";
import DayFoodElement from "../components/DayFoodElement.tsx";
import {
  fetchDays,
  selectCurrentDay,
  selectDays,
  selectSelectedDate,
} from "../redux/slices/daySlice.tsx";
import { selectExercises } from "../redux/slices/exerciseSlice.tsx";
import { selectFood } from "../redux/slices/foodSlice.tsx";
import { selectCurrentProfile } from "../redux/slices/profileSlice.tsx";
import { selectCookie } from "../redux/slices/userSlice.tsx";
import dayService from "../services/day.tsx";
import { AddDayHint } from "./../components/AddDayHint.tsx";

export function FoodAndExercises({
  setShowPopupEditLabel,
  setShowPopupEdit,
  setFoodElement,
  setAddLabel,
  setShowPopup,
  setExerciseElement,
}) {
  const dispatch = useDispatch();
  const currentDay = useSelector(selectCurrentDay);
  const selectedDate = useSelector(selectSelectedDate);
  const food = useSelector(selectFood);
  const cookie = useSelector(selectCookie);
  const profile = useSelector(selectCurrentProfile);
  const exercises = useSelector(selectExercises);
  const days = useSelector(selectDays);

  if (days == null) {
    return "";
  }

  return days.find((obj) => obj.date === selectedDate) ? (
    <div className="">
      <div className="flex flex-col lg:flex-row lg:gap-x-5 mt-5 items-center gap-y-5">
        <div className="flex flex-col gap-y-3">
          <h1>Mahlzeiten:</h1>
          <div className="flex flex-col w-96 h-40 border-2 rounded-2xl overflow-y-scroll">
            {currentDay &&
              currentDay.food.map((element, i) => (
                <DayFoodElement
                  setShowPopupEditLabel={setShowPopupEditLabel}
                  setShowPopupEdit={setShowPopupEdit}
                  setFoodElement={setFoodElement}
                  profile={profile}
                  cookie={cookie}
                  key={i}
                  food={food}
                  element={element}
                />
              ))}
          </div>
          <Button
            label={"hinzufügen"}
            onClick={() => {
              setAddLabel("Mahlzeit");
              setShowPopup(true);
            }}
          />
        </div>
        <div className="flex flex-col gap-y-3">
          <h1>Übungen:</h1>
          <div className="flex flex-col w-96 h-40 border-2 rounded-2xl overflow-y-scroll">
            {currentDay &&
              currentDay.exercise.map((element, i) => (
                <DayExerciseElement
                  setShowPopupEditLabel={setShowPopupEditLabel}
                  setShowPopupEdit={setShowPopupEdit}
                  setExerciseElement={setExerciseElement}
                  profile={profile}
                  cookie={cookie}
                  key={i}
                  element={element}
                  exercises={exercises}
                />
              ))}
          </div>
          <Button
            label={"hinzufügen"}
            onClick={() => {
              setAddLabel("Übung");
              setShowPopup(true);
            }}
          />
        </div>
      </div>
      <div>
        <Button
          color={"bg-red-500"}
          label={"Tag löschen"}
          onClick={async () => {
            await dayService.deleteDay(currentDay._id, cookie);
            dispatch(
              fetchDays({
                profileId: profile._id,
                cookie: cookie,
              })
            );
          }}
        />
      </div>
    </div>
  ) : (
    <AddDayHint />
  );
}
