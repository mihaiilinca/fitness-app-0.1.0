import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomeHeader from "../components/HomeHeader.tsx";
import PopupProfile from "../components/PopupProfile.tsx";
import Profile from "../components/Profile.tsx";
import {
  fetchProfiles,
  selectProfiles,
  selectProfilesStatus,
} from "../redux/slices/profileSlice.tsx";
import {
  selectCookie,
  selectIsLoggedIn,
  selectUser,
} from "../redux/slices/userSlice.tsx";
import { motion } from "framer-motion";

function ChooseProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const profiles = useSelector(selectProfiles);
  const profilesStatus = useSelector(selectProfilesStatus);
  const user = useSelector(selectUser);
  const cookie = useSelector(selectCookie);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (isLoggedIn === null || isLoggedIn === false) {
      navigate("/login");
      return;
    }

    if (profilesStatus === "idle") {
      dispatch(fetchProfiles({ userId: user, cookie: cookie }));
    }
  }, [isLoggedIn]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0 } }}
      className="flex flex-col min-h-screen"
    >
      <HomeHeader chooseProfile={true} isEditing={isEditing} />
      <div className="flex flex-col gap-y-5 sm:gap-x-5 mt-5 sm:mt-0 sm:px-20 items-center sm:justify-center sm:min-h-screen">
        <div className="flex flex-col gap-y-5 sm:gap-x-5 items-center sm:justify-center sm:flex-row">
          {profiles &&
            profiles.map((profile, i) => (
              <Profile
                key={i}
                profile={profile}
                setIsEditing={setIsEditing}
                setShowPopup={setShowPopup}
              />
            ))}
        </div>

        <div>
          <button
            className="flex flex-col gap-y-3 items-center transition transform hover:scale-110"
            onClick={() => {
              setShowPopup(true);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-28"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
            Profil hinzufügen
          </button>
        </div>
      </div>
      <PopupProfile
        setIsEditing={setIsEditing}
        setShowPopup={setShowPopup}
        trigger={showPopup}
        isEditing={isEditing}
      ></PopupProfile>
    </motion.div>
  );
}

export default ChooseProfile;
