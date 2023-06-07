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
    </div>
  );
}

export default ShowInfoModal;
