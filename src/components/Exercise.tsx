import { useDispatch, useSelector } from "react-redux";
import {
  changeExercise,
  fetchExercises,
} from "../redux/slices/exerciseSlice.tsx";
import { selectCookie } from "../redux/slices/userSlice.tsx";
import exerciseService from "../services/exercises.tsx";

function Exercise(props) {
  const dispatch = useDispatch();
  const cookie = useSelector(selectCookie);

  return (
    <div className=" flex flex-row sm:flex-col bg-slate-200 rounded-xl px-6 sm:px-0">
      <div>
        <div className="flex flex-row gap-x-3 p-5 items-center">
          <div>
            <div>Name:</div>
            <div>Zeit:</div>
            <div>Kalorien:</div>
          </div>
          <div>
            <h2>{props.exercise.name}</h2>
            <h2>{`${props.exercise.baseTime} min`}</h2>
            <h2>{props.exercise.energyBurned}</h2>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-row items-center gap-x-5 ml-5 sm:gap-x-0 sm:ml-0 justify-evenly mb-3">
        <button
          className="transition transform hover:scale-125"
          onClick={() => {
            dispatch(changeExercise({ newExercise: props.exercise }));
            props.setIsEditing(true);
            props.setShowPopup(true);
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
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </button>
        <button
          className="transition transform hover:scale-125"
          onClick={async () => {
            await exerciseService.deleteExercise(props.exercise._id, cookie);
            dispatch(fetchExercises());
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Exercise;
