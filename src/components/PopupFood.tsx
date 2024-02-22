import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button.tsx";
import {
  changeFood,
  fetchFood,
  selectCurrentFood,
} from "../redux/slices/foodSlice.tsx";
import { selectCookie } from "../redux/slices/userSlice.tsx";
import foodService from "../services/food.tsx";
import InputElement from "./InputElement.tsx";
import { motion } from "framer-motion";

function PopupFood(props) {
  const dispatch = useDispatch();
  const cookie = useSelector(selectCookie);
  const [name, setName] = useState("");
  const [baseAmount, setBaseAmount] = useState("");
  const [energy, setEnergy] = useState("");
  const [fat, setFat] = useState("");
  const food = useSelector(selectCurrentFood);
  const [carbohydrates, setCarbohydrates] = useState("");
  const [protein, setProtein] = useState("");
  const [salt, setSalt] = useState("");
  const [fiber, setFiber] = useState("");
  const [drink, setDrink] = useState(false);

  useEffect(() => {
    if (props.isEditing === true) {
      setName(food.name);
      setBaseAmount(food.baseAmount);
      setEnergy(food.energy);
      setFat(food.fat);
      setCarbohydrates(food.carbohydrates);
      setProtein(food.protein);
      setSalt(food.salt);
      setFiber(food.fiber);
      setDrink(food.drink);
    }
  }, [food, props.isEditing]);

  const clearInput = () => {
    setName("");
    setBaseAmount("");
    setEnergy("");
    setFat("");
    setCarbohydrates("");
    setProtein("");
    setSalt("");
    setFiber("");
    setDrink(false);
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
                dispatch(changeFood({ newFood: null }));
                props.setShowPopup(false);
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
            Mahlzeit {props.isEditing ? "bearbeiten" : "erstellen"}
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
            <div className="flex flex-row justify-between">
              <InputElement
                width={"w-16"}
                value={baseAmount}
                label={"Gewicht (g)"}
                onChange={(event) => {
                  setBaseAmount(event.target.value);
                }}
              />
              <InputElement
                width={"w-28"}
                value={energy}
                label={"Kalorien"}
                onChange={(event) => {
                  setEnergy(event.target.value);
                }}
              />{" "}
              <InputElement
                width={"w-16"}
                value={fat}
                label={"Fett (g)"}
                onChange={(event) => {
                  setFat(event.target.value);
                }}
              />
            </div>
            <div className="flex flex-row justify-between">
              <InputElement
                width={"w-28"}
                value={carbohydrates}
                label={"Kohlenhydrate (g)"}
                onChange={(event) => {
                  setCarbohydrates(event.target.value);
                }}
              />

              <InputElement
                width={"w-16"}
                value={protein}
                label={"Eiweiß (g)"}
                onChange={(event) => {
                  setProtein(event.target.value);
                }}
              />
              <InputElement
                width={"w-16"}
                value={salt}
                label={"Salz (g)"}
                onChange={(event) => {
                  setSalt(event.target.value);
                }}
              />
            </div>
            <div className="flex flex-row">
              <InputElement
                width={"w-16"}
                value={fiber}
                label={"Balaststoffe (g)"}
                onChange={(event) => {
                  setFiber(event.target.value);
                }}
              />
              <div className="flex flex-col items-center gap-y-2 ml-2">
                <div>
                  <h2>Getränk</h2>
                </div>
                <input type="checkbox"></input>
              </div>
            </div>
          </div>
          <Button
            label={props.isEditing ? "Speichern" : "Erstellen"}
            onClick={async () => {
              if (props.isEditing) {
                await foodService.updateFoodById(cookie, {
                  foodId: food._id,
                  name: name,
                  baseAmount: baseAmount,
                  energy: energy,
                  fat: fat,
                  carbohydrates: carbohydrates,
                  protein: protein,
                  salt: salt,
                  fiber: fiber,
                  drink: drink,
                });
              } else {
                await foodService.addFood(cookie, {
                  name: name,
                  baseAmount: baseAmount,
                  energy: energy,
                  fat: fat,
                  carbohydrates: carbohydrates,
                  protein: protein,
                  salt: salt,
                  fiber: fiber,
                  drink: drink,
                });
              }

              dispatch(fetchFood());
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

export default PopupFood;
