import { useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useDispatch, useSelector } from "react-redux";
import {
  changeDay,
  changeSelectedDate,
  fetchDays,
  selectDays,
  selectDayStatus,
  selectSelectedDate,
} from "../redux/slices/daySlice.tsx";
import { selectExercises } from "../redux/slices/exerciseSlice.tsx";
import { selectFood } from "../redux/slices/foodSlice.tsx";
import { selectCurrentProfile } from "../redux/slices/profileSlice.tsx";
import { selectCookie } from "../redux/slices/userSlice.tsx";

export function CalendarPersonalData({ dayExists }) {
  const dispatch = useDispatch();
  const selectedDate = useSelector(selectSelectedDate);
  const profile = useSelector(selectCurrentProfile);
  const exercises = useSelector(selectExercises);
  const food = useSelector(selectFood);
  const cookie = useSelector(selectCookie);

  const dayStatus = useSelector(selectDayStatus);
  const days = useSelector(selectDays);

  useEffect(() => {
    if (dayStatus === "idle" && profile !== null) {
      dispatch(fetchDays({ profileId: profile._id, cookie: cookie }));
    }

    if (days) {
      if (days.find((obj) => obj.date === selectedDate) ? true : false) {
        dispatch(
          changeDay({
            newDay: days[days.findIndex((obj) => obj.date === selectedDate)],
          })
        );
      }
    }
  }, [days]);

  if (days == null) {
    return "";
  }

  const findDay = (dateObj) => {
    return days[days.findIndex((obj) => obj.date === dateObj)];
  };

  const getBurnedEnergy = () => {
    const dayForCalculation = findDay(selectedDate);
    if (dayForCalculation == null) return 0;

    return parseInt(
      dayForCalculation.exercise.reduce((total, obj) => {
        const exerciseForCalculation = exercises.find(
          (exc) => exc._id === obj.exerciseId
        );
        if (!exerciseForCalculation) return total + 0;
        return (
          total +
          (exerciseForCalculation.energyBurned /
            exerciseForCalculation.baseTime) *
            obj.timeInMinutes
        );
      }, 0)
    );
  };

  const getEatedEnergy = () => {
    const dayForCalculation = findDay(selectedDate);
    if (dayForCalculation == null) return 0;

    return parseInt(
      dayForCalculation.food.reduce((total, obj) => {
        const foodForCalculation = food.find((fd) => fd._id === obj.foodId);
        if (!foodForCalculation) return total + 0;
        return (
          total +
          (foodForCalculation.energy / foodForCalculation.baseAmount) *
            obj.amount
        );
      }, 0)
    );
  };

  const getProteinAte = () => {
    const dayForCalculation = findDay(selectedDate);
    if (dayForCalculation == null) return 0;

    return parseInt(
      dayForCalculation.food.reduce((total, obj) => {
        const foodForCalculation = food.find((fd) => fd._id === obj.foodId);
        if (!foodForCalculation) return total + 0;
        return (
          total +
          (foodForCalculation.protein / foodForCalculation.baseAmount) *
            obj.amount
        );
      }, 0)
    );
  };

  const getCarbsAte = () => {
    const dayForCalculation = findDay(selectedDate);
    if (dayForCalculation == null) return 0;

    return parseInt(
      dayForCalculation.food.reduce((total, obj) => {
        const foodForCalculation = food.find((fd) => fd._id === obj.foodId);
        if (!foodForCalculation) return total + 0;
        return (
          total +
          (foodForCalculation.carbohydrates / foodForCalculation.baseAmount) *
            obj.amount
        );
      }, 0)
    );
  };

  const getFatAte = () => {
    const dayForCalculation = findDay(selectedDate);
    if (dayForCalculation == null) return 0;

    return parseInt(
      dayForCalculation.food.reduce((total, obj) => {
        const foodForCalculation = food.find((fd) => fd._id === obj.foodId);
        if (!foodForCalculation) return total + 0;
        return (
          total +
          (foodForCalculation.fat / foodForCalculation.baseAmount) * obj.amount
        );
      }, 0)
    );
  };

  const getKcalPerDay = () => {
    var sum = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age;
    sum = sum + (profile.sex === 0 ? 5 : -161);
    return sum;
  };

  return (
    <div className="flex flex-col items-center mt-5">
      <Calendar
        onChange={(newDateValue) => {
          dispatch(
            changeSelectedDate({
              newSelectedDate: newDateValue.toDateString(),
            })
          );

          if (
            days.find((obj) => obj.date === newDateValue.toDateString())
              ? true
              : false
          ) {
            dispatch(
              changeDay({
                newDay: findDay(newDateValue.toDateString()),
              })
            );
          }
        }}
        value={new Date(selectedDate)}
      />
      <div>
        <h1 className="text-lg font-bold mt-2">{`Tag: ${selectedDate}`}</h1>
      </div>
      <div className="mt-5">
        <h1>{`Deine Kalorien am Tag laut Formal: ${getKcalPerDay()}`}</h1>
        <h1>{`Verbrannte Kalorien: ${getBurnedEnergy()}`}</h1>
        <h1>{`Zu dir genommene Kalorien: ${getEatedEnergy()}`}</h1>
        <h1>{`Defizit: ${
          getKcalPerDay() + getBurnedEnergy() - getEatedEnergy()
        }`}</h1>
        <h1>{`Zu dir genommenes Eiweiß: ${getProteinAte()} (von ${parseInt(
          profile.weight * 0.793664791
        )})`}</h1>
        <h1>{``}</h1>
        <h1>{`Zu dir genommene Kohlenhydrate: ${getCarbsAte()} (von ${parseInt(
          getKcalPerDay() / 2 / 4
        )})`}</h1>
        <h1>{`Zu dir genommenes Fett: ${getFatAte()} (von ${parseInt(
          (getKcalPerDay() * 0.3) / 9
        )})`}</h1>
      </div>
    </div>
  );
}
