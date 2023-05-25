import React from "react";
import "../css/ShowInfoModal.css";

interface ShowInfoModalProps {
  subtitle: string;
  shortdescription: string;
  closeModal: () => void;
}

function ShowInfoModal(props: ShowInfoModalProps) {
  return (
    <div className="Modal-container">
      <p>{props.subtitle}</p>
      <p>{props.shortdescription}</p>
      {/* <img
        onClick={props.closeModal}
        alt={props.subtitle}
        src="./icons/placeholder.png"
      /> */}
    </div>
  );
}

export default ShowInfoModal;
