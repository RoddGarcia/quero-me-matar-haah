import React from "react";
import "./Popup.css";

function Popup(props) {
  return props.trigger ? (
    <>
      <div className="popup">
        <div className="popup-inner">
          <button className="close-btn" onClick={props.onClose}>
            X
          </button>
          <div className="cardContent">{props.children}</div>
        </div>
      </div>
    </>
  ) : null;
}

export default Popup;
