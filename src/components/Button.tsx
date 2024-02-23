import React from "react";

function Button(props) {
  return (
    <div className="flex justify-center mt-10">
      <button
        className={`px-10 py-2 rounded-lg ${
          props.color ? props.color : "bg-slate-200"
        }  mb-5 transition transform hover:scale-110`}
        onClick={props.onClick}
      >
        {props.label}
      </button>
    </div>
  );
}

export default Button;
