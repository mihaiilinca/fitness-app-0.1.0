import React from "react";

function InputElement(props) {
  return (
    <div className="flex flex-col px-2">
      <div>
        <h2>{props.label}</h2>
      </div>
      <div>
        <input
          className={`bg-slate-200 rounded-md  ${
            props.width ? props.width : "min-w-full"
          }  h-9 px-2`}
          type={props.type && props.type}
          name={props.name && props.name}
          value={props.value && props.value}
          onChange={(e) => props.onChange(e)}
        ></input>
      </div>
    </div>
  );
}

export default InputElement;
