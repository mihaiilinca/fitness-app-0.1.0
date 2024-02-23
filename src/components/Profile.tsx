import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeDay, fetchDays } from "../redux/slices/daySlice.tsx";
import { changeProfile, fetchProfiles } from "../redux/slices/profileSlice.tsx";
import { selectCookie, selectUser } from "../redux/slices/userSlice.tsx";
import profileService from "../services/profiles.tsx";
import React from "react";

function Profile(props) {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const cookie = useSelector(selectCookie);
  const user = useSelector(selectUser);

  return (
    <div className="bg-slate-400 rounded-2xl">
      <div className="flex w-full p-4 justify-between">
        <button
          className="transition transform hover:scale-125"
          onClick={async () => {
            await profileService.deleteProfile(props.profile._id, cookie);
            dispatch(fetchProfiles({ userId: user, cookie: cookie }));
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
        <button
          className="transition transform hover:scale-125"
          onClick={() => {
            dispatch(changeProfile({ newProfile: props.profile }));
            dispatch(changeDay({ newDay: new Date().toString() }));
            dispatch(
              fetchDays({ profileId: props.profile._id, cookie: cookie })
            );
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
      </div>
      <button
        className="flex flex-col items-center transition transform hover:scale-110 rounded-2xl"
        onClick={() => {
          dispatch(changeProfile({ newProfile: props.profile }));
          navigate("/home");
        }}
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-52 p-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="mb-5">{props.profile.name}</div>
      </button>
    </div>
  );
}

export default Profile;
