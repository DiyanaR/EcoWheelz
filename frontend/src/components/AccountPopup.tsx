import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "./ContextProvider";
import axios from "axios";

interface prop {
  setPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AccountPopup({ setPopup }: prop) {
  const { login, setLogin } = useContext(LoginContext);
  const navigate = useNavigate();

  async function logoutUser() {
    if (login) {
      setLogin(null);
      localStorage.removeItem("token");

      try {
        await axios.post("http://localhost:8080/logout", {
          headers: { Authorization: `Bearer ${login.token}` },
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <AccPopup>
      {login ? (
        <>
          <Link to="/orders">My orders</Link>
          <button
            onClick={() => {
              logoutUser();
              setPopup(false);
              navigate("/");
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <div className="btn-container">
            <Link
              onClick={() => {
                setPopup(false);
              }}
              to="/login"
            >
              <button>Login</button>
            </Link>
            <Link
              onClick={() => {
                setPopup(false);
              }}
              to="/signup"
            >
              <button>Sign up</button>
            </Link>
          </div>
        </>
      )}
    </AccPopup>
  );
}

const AccPopup = styled.div`
  height: 140px;
  width: 170px;
  padding-bottom: 5px;

  position: absolute;
  top: calc(100% + 18px);
  left: 50%;
  transform: translateX(-50%);

  background-color: #222222;
  border-radius: 16px;
  border: 2px solid #9ae5bd;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;

  font-family: "Red Hat Display";
  color: white;
  font-size: 18px;
  font-weight: 700;

  .btn-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  button {
    color: inherit;
    font-family: inherit;
    background-color: transparent;
    border: 2px solid #9ae5bd;
    border-radius: 12px;
    padding: 6px 18px;
    font-size: inherit;
    font-weight: inherit;
    cursor: pointer;

    &:hover {
      background-color: #9ae5bd;
      color: #222222;
    }
  }
`;
