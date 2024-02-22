import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomeHeaderIcon from "../components/HomeHeaderIcon.tsx";
import { resetDays } from "../redux/slices/daySlice.tsx";
import {
  changeProfile,
  resetProfiles,
  selectCurrentProfile,
} from "../redux/slices/profileSlice.tsx";
import { logoutAsync } from "../redux/slices/userSlice.tsx";

function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}

function HomeHeader(props) {
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const dispatch = useDispatch();
  const profile = useSelector(selectCurrentProfile);
  let navigate = useNavigate();

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div className="flex flex-col shadow-md bg-slate-200 sm:sticky sm:top-0 ">
      <div className="flex p-5 justify-between">
        <button onClick={() => navigate("/home")}>
          <h1>{windowSize.innerWidth <= 640 ? "MFT" : "My Fitness Thomas"}</h1>
        </button>

        {profile && !props.isEditing && (
          <div className="flex flex-row gap-x-5">
            <HomeHeaderIcon
              label={"Übungen"}
              Icon={
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
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
              }
              onClick={() => navigate("/home/exercises")}
            />
            <HomeHeaderIcon
              label={"Mahlzeiten"}
              Icon={
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
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              }
              onClick={() => navigate("/home/food")}
            />
            <HomeHeaderIcon
              label={"Profile"}
              Icon={
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
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              }
              onClick={() => {
                dispatch(resetDays());
                dispatch(changeProfile({ newProfile: null }));
                navigate("/chooseProfile");
              }}
            />
          </div>
        )}

        <div className="flex items-center">
          <button
            className="flex justify-between sm:mx-3 sm:pl-3 transition transform hover:scale-110 bg-white rounded-lg py-2 px-2 "
            onClick={async () => {
              dispatch(logoutAsync());
              dispatch(resetProfiles());
            }}
          >
            {windowSize.innerWidth <= 640 ? "" : "Logout"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </div>
      </div>

      {profile && !props.isEditing && (
        <div className="flex justify-center text-xs">{`Profil: ${profile.name}`}</div>
      )}
    </div>
  );
}

export default HomeHeader;
