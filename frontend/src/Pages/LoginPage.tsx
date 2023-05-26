import { Formik } from "formik";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../components/ContextProvider";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ErrorIcon } from "../assets/errorIcon.svg";
import CheckIcon from "../assets/checkIcon.svg";
import styled from "styled-components";
import axios from "axios";
import ErrorPopup from "../components/ErrorPopup";

interface FormErrors {
  invalidLogin?: string;
  somethingWentWrong?: string;
}

interface FormValues extends FormErrors {
  email: string;
  password: string;
  check: boolean;
}

interface MyFormProps {
  onSubmit: (values: FormValues, errors: FormErrors) => void;
}

export default function SignupPage() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState(false);
  const { login, setLogin } = useContext(LoginContext);

  // useEffect(() => {
  //   // Redirect user from login to homepage if the user is already logged in
  //   if (login) {
  //     navigate("/");
  //   }
  // }, []);

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
    <FormSignup>
      <Formik<FormValues, MyFormProps>
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          email: "",
          password: "",
          check: false,
        }}
        validate={async (values) => {
          const errors: FormErrors = {};

          try {
            const res = await axios.post("http://localhost:8080/login", {
              email: values.email,
              password: values.password,
            });

            console.log(res);

            if (res.status === 201 || res.status === 200) {
              // Save the user information in useContext state
              setLogin({
                email: res.data.email,
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                token: res.data.token,
              });

              //Store the token in localstorage to remember the user when revisiting the site
              if (values.check) {
                localStorage.setItem("token", res.data.token);
              }
            } else {
              errors.invalidLogin = "Incorrect username or password";
            }
          } catch (error) {
            //If password is wrong
            if (error?.response?.status === 401) {
              errors.invalidLogin = "Incorrect username or password";
            } else {
              // else message that an error code 500 occured
              setErrorMsg(true);

              setTimeout(() => {
                setErrorMsg(false);
              }, 2500);
            }
          }

          return errors;
        }}
        onSubmit={() => {
          // if all validation succeeds get sent to homepage
          // navigate("/");
        }}
      >
        {({ values, errors, handleSubmit, handleChange }) => (
          <>
            {login && <button onClick={logoutUser}>Logout</button>}
            <span className="headline">Sign in</span>
            <div className="form-border">
              <form onSubmit={handleSubmit}>
                {errors.invalidLogin && (
                  <div className="error-user">
                    <ErrorIcon />
                    <span>{errors.invalidLogin}</span>
                  </div>
                )}

                <div className="email">
                  <label>E-mail</label>
                  <input
                    type="text"
                    name="email"
                    className="valid-input"
                    onChange={handleChange}
                    value={values.email}
                    required
                  />
                </div>

                <div className="password">
                  <label>Password</label>
                  <input
                    type="text"
                    name="password"
                    onChange={handleChange}
                    value={values.password}
                    required
                  />
                </div>

                <label className="remember-container">
                  Remember me
                  <input
                    className={values.check ? "remember active" : "remember"}
                    type="checkbox"
                    name="check"
                    onChange={handleChange}
                    checked={values.check}
                  />{" "}
                </label>

                <button type="submit">Confirm</button>
                <p className="signup">
                  Not a member yet? <Link to="/signup">Join now!!</Link>
                </p>
              </form>
            </div>

            <ErrorPopup
              errorMsg={errorMsg}
              errorText="Something went wrong, please try again later"
            />
          </>
        )}
      </Formik>
    </FormSignup>
  );
}

const FormSignup = styled.div`
  min-height: calc(100dvh - 112px);
  background: linear-gradient(
    180deg,
    #222222 41.15%,
    rgba(34, 34, 34, 0.9) 77.08%,
    rgba(34, 34, 34, 0.95) 92.71%
  );

  font-family: "Red Hat Display";
  color: white;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding-bottom: 80px;

  .form-border {
    width: 480px;
  }

  .error-user {
    color: red;
    font-weight: 600;
    font-size: 14px;

    svg {
      margin: -16px 8px 0 0;
    }
  }

  .headline {
    font-size: 64px;
    font-weight: 700;

    margin-bottom: 20px;
  }

  input[type="text"] {
    background-color: transparent;
    border: 2px solid #9ae5bd;
    padding: 12px 18px;
    border-radius: 16px;
    color: white;
    font-size: 20px;

    outline: none;

    width: 100%;
    &:focus {
      border: 2px solid #3cf793;
    }
  }

  .email {
    margin-bottom: 24px;
  }

  .remember-container {
    font-family: inherit;
    font-size: 20px;
    font-weight: 600;

    width: fit-content;
    margin: 8px 16px;

    .remember {
      appearance: none;
      border: 2px solid #faf9f8;

      padding: 7px;
      border-radius: 3px;
      display: inline-block;
      position: relative;
      margin: 0 8px;
      cursor: pointer;

      transform: translateY(2px);
      position: relative;

      &:checked {
        border: 2px solid white;

        &:before {
          opacity: 1;
        }
      }
    }

    .active {
      &:before {
        content: "";
        background-image: url("${CheckIcon}");
        background-repeat: no-repeat;
        background-size: cover;
        position: absolute;
        top: -1px;
        left: 1px;
        display: block;
        width: 13px;
        height: 13px;
        transition: all 0.3s;
      }
    }
  }

  label {
    display: block;
    font-size: 22px;
    font-weight: 700;
    margin: 8px 0;
  }

  .name-container {
    display: flex;
    justify-content: space-between;
    input {
      width: 370px;
    }
  }

  .phoneNumber-container {
    input {
      width: 370px;
    }
  }

  .details-container {
    input {
      width: 500px;
    }
  }

  button {
    border: 2px solid #9ae5bd;
    background-color: transparent;
    border-radius: 16px;
    color: inherit;
    font-family: inherit;
    padding: 12px 38px;
    font-weight: 700;
    font-size: 22px;

    display: block;
    margin: 34px auto;

    cursor: pointer;
  }

  .signup {
    font-size: 18px;
    font-weight: 800;
    text-align: center;
    color: #fffffff9;
    a {
      color: #9ae5bd;

      &:hover {
        color: #14f87f;
      }
    }
  }
`;
