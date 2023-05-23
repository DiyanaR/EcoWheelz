import React from "react";

interface ShowInfoModalProps {
  subtitle: string;
  shortdescription: string;
}

function ShowInfoModal(props: ShowInfoModalProps) {
  return (
    <div>
      <p>{props.subtitle}</p>
      <p>{props.shortdescription}</p>
    </div>
  );
}

export default ShowInfoModal;

<h1>Hej</h1>;
