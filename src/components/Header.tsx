import { useNavigate } from "react-router-dom";

function Header(props) {
  let navigate = useNavigate();

  return (
    <div className="flex p-5 justify-between shadow-md bg-slate-200 sm:sticky sm:top-0 items-center">
      <h1>My Fitness Thomas</h1>
      <div className="flex items-center">
        <div className="invisible sm:visible">
          {props.isLogoutPage
            ? "Wir sehen uns bald wieder"
            : props.isRegisterPage
            ? "Du hast bereits einen Account?"
            : "Noch keinen Account? Jetzt"}
        </div>

        <button
          className="flex justify-between mx-3 sm:pl-3 transition transform hover:scale-110 bg-white rounded-lg py-2 px-2"
          onClick={() =>
            props.isLogoutPage
              ? navigate("/login")
              : navigate(props.isRegisterPage ? "/login" : "/register")
          }
        >
          {props.isLogoutPage
            ? "Login"
            : props.isRegisterPage
            ? "Login"
            : "Registrieren"}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Header;
