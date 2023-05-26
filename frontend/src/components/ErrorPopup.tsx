import styled from "styled-components";

interface prop {
  errorMsg: boolean;
  errorText: string;
}

export default function ErrorPopup({ errorMsg, errorText }: prop) {
  return (
    <>
      {errorMsg && (
        <Popup>
          <span>
            {errorText} <span className="float-right">(error code 500)</span>
          </span>
        </Popup>
      )}
    </>
  );
}

const Popup = styled.div`
  background: linear-gradient(
    180deg,
    #222222 41.15%,
    rgba(34, 34, 34, 0.9) 77.08%,
    rgba(34, 34, 34, 0.95) 92.71%
  );

  width: 80%;
  padding: 16px;

  border: 3px solid #9ae5bd;
  border-radius: 16px;

  position: fixed;
  left: 50%;
  bottom: 24px;
  transform: translateX(-50%);

  .float-right {
    float: right;
    display: block;
  }
`;
