import React from "react";

function HomeHeaderIcon(props) {
  return (
    <button
      className="flex flex-col items-center transition transform hover:scale-110"
      onClick={props.onClick && props.onClick}
    >
      {props.Icon}
      <div className="text-xs sm:text-base">{props.label}</div>
    </button>
  );
}

export default HomeHeaderIcon;
