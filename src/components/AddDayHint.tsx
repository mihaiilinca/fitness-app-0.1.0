import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button.tsx";
import { fetchDays, selectSelectedDate } from "../redux/slices/daySlice.tsx";
import { selectCurrentProfile } from "../redux/slices/profileSlice.tsx";
import { selectCookie } from "../redux/slices/userSlice.tsx";
import dayService from "../services/day.tsx";
import React from "react";

export function AddDayHint() {
  const dispatch = useDispatch();
  const cookie = useSelector(selectCookie);
  const profile = useSelector(selectCurrentProfile);
  const selectedDate = useSelector(selectSelectedDate);

  return (
    <div className="flex flex-col justify-center mt-10 text-center">
      <h1>Du musst den Tag erst hinzufügen um Daten anlegen zu können.</h1>
      <Button
        label={"Tag anlegen"}
        onClick={async () => {
          await dayService.addDay(cookie, {
            date: selectedDate,
            food: [],
            exercise: [],
            profileId: profile._id,
          });
          dispatch(
            fetchDays({
              profileId: profile._id,
              cookie: cookie,
            })
          );
        }}
      />
    </div>
  );
}
