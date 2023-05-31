import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ErrorIcon } from "../assets/errorIcon.svg";
import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import ErrorPopup from "../components/ErrorPopup";

interface FormErrors {
  invalidFirstName?: string;
  invalidLastName?: string;
  invalidPhoneNumber?: string;
  invalidEmail?: string;
  notMatchingPassword?: string;
  notMatchingEmail?: string;
  somethingWentWrong?: string;
}

interface FormValues extends FormErrors {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
}

interface MyFormProps {
  onSubmit: (values: FormValues, errors: FormErrors) => void;
}

export default function SignupPage() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState(false);

  function nameValidation(input: string) {
    return input.replace(/[!@#$%^&*()_+\-={}\[\]|\\:";'<>.,\/?0-9]/g, "");
  }

  return (
    <FormSignup>
      <Formik<FormValues, MyFormProps>
        initialValues={{
          firstName: "",
          lastName: "",
          phoneNumber: "",
          email: "",
          confirmEmail: "",
          password: "",
          confirmPassword: "",
        }}
        validate={async (values) => {
          const errors: FormErrors = {};

          const firstNameValidation = nameValidation(values.firstName);
          if (firstNameValidation.length !== values.firstName.length) {
            errors.invalidFirstName = " •  Invalid name given";
          }

          const lastNameValidation = nameValidation(values.lastName);
          if (lastNameValidation.length !== values.lastName.length) {
            errors.invalidLastName = " •  Invalid name given";
          }

          if (values.phoneNumber.length > 0) {
            const phoneNumberValidation =
              /^\+((?:9[679]|8[035789]|6[789]|5[90]|42|3[578]|2[1-689])|9[0-58]|8[1246]|6[0-6]|5[1-8]|4[013-9]|3[0-469]|2[70]|7|1)(?:\W*\d){0,13}\d$/g.test(
                values.phoneNumber
              );

            if (!values.phoneNumber.includes("+")) {
              errors.invalidPhoneNumber =
                " •  You must insert the country code as the example: +46 707 07 07 07.";
            } else if (phoneNumberValidation) {
              errors.invalidPhoneNumber = " •  Invalid phone number";
            }
          }

          if (values.email.length > 0) {
            const emailValidation = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(
              values.email
            );

            if (!emailValidation) {
              errors.invalidEmail = " •  Invalid email format.";
            }

            if (values.email !== values.confirmEmail) {
              errors.notMatchingEmail = " •  Emails do not match";
            }

            if (values.email.length > 0 && emailValidation) {
              try {
                const checkAvaliableEmail = await axios.get(
                  `http://localhost:8080/validate-email?email=${values.email.toLowerCase()}`
                );

                if (checkAvaliableEmail.data >= 1) {
                  errors.invalidEmail = " •  Email already in use";
                }
              } catch {
                setErrorMsg(true);

                setTimeout(() => {
                  setErrorMsg(false);
                }, 2500);
              }
            }
          }

          if (values.password !== values.confirmPassword) {
            errors.notMatchingPassword = " •  Passwords do not match";
          }

          return errors;
        }}
        onSubmit={async (values) => {
          try {
            await axios.post("http://localhost:8080/signup", {
              email: values.email,
              password: values.password,
              firstName: values.firstName,
              lastName: values.lastName,
              phoneNumber: values.phoneNumber,
            });

            navigate("/login");
          } catch (error) {
            console.log(error);
            setErrorMsg(true);

            setTimeout(() => {
              setErrorMsg(false);
            }, 2500);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleSubmit,
          handleChange,
        }) => (
          <>
            <span className="headline">Register</span>
            <div className="form-border">
              <form onSubmit={handleSubmit}>
                <div className="name-container">
                  <div className="first">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      className="valid-input"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.firstName}
                      placeholder="Jane"
                      required
                    />
                    {errors.invalidFirstName && touched.firstName && (
                      <div className="error-user">
                        <ErrorIcon />
                        <span>{errors.invalidFirstName}</span>
                      </div>
                    )}
                  </div>

                  <div className="last">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastName}
                      placeholder="Doe"
                      required
                    />
                    {errors.invalidLastName && touched.lastName && (
                      <div className="error-user">
                        <ErrorIcon />
                        <span>{errors.invalidLastName}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="phoneNumber-container">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phoneNumber}
                    placeholder="+46 000 00 00 00"
                    required
                  />
                  {errors.invalidPhoneNumber && touched.phoneNumber && (
                    <div className="error-user">
                      <ErrorIcon />
                      <span>{errors.invalidPhoneNumber}</span>
                    </div>
                  )}
                </div>

                <div className="details-container">
                  <label>E-mail</label>
                  <input
                    type="text"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="Jane.Doe@example.com"
                    required
                  />
                  {errors.invalidEmail && (
                    <div className="error-user">
                      <ErrorIcon />
                      <span>{errors.invalidEmail}</span>
                    </div>
                  )}

                  <label>Confirm E-mail</label>
                  <input
                    type="text"
                    name="confirmEmail"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmEmail}
                    placeholder="Jane.Doe@example.com"
                    required
                  />
                  {errors.notMatchingEmail && touched.confirmEmail && (
                    <div className="error-user">
                      <ErrorIcon />
                      <span>{errors.notMatchingEmail}</span>
                    </div>
                  )}

                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    placeholder="password..."
                    required
                  />

                  <label>Password confirm</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                    placeholder="confirm password..."
                    required
                  />
                  {errors.notMatchingPassword && touched.confirmPassword && (
                    <div className="error-user">
                      <ErrorIcon />
                      <span>{errors.notMatchingPassword}</span>
                    </div>
                  )}
                </div>

                <button type="submit">Sign in</button>
                <p className="login">
                  Already have an account? <Link to="/login">Login!</Link>
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
  * {
    box-sizing: border-box;
  }
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
    width: 850px;
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

  input {
    background-color: transparent;
    border: 2px solid #9ae5bd;
    padding: 12px 18px;
    border-radius: 16px;
    color: white;
    font-size: 20px;

    margin-bottom: 12px;
    outline: none;

    &:focus {
      border: 2px solid #3cf793;
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
      width: 402px;
    }
  }

  .phoneNumber-container {
    input {
      width: 402px;
    }
  }

  .details-container {
    input {
      width: 602px;
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

    &:hover {
      background-color: #9ae5bd;
      color: #222222;
    }
  }

  .login {
    font-size: 18px;
    font-weight: 700;
    text-align: center;
    color: #ffffffd5;
    a {
      color: #9ae5bdda;

      &:hover {
        color: #9ae5bd;
      }
    }
  }

  @media (max-width: 880px) {
    input[type="text"] {
      padding: 12px 18px;
      font-size: 14px;
    }

    .form-border {
      width: 80%;
    }

    .name-container {
      display: block;

      input {
        width: 100%;
      }
    }

    .phoneNumber-container {
      input {
        width: 100%;
      }
    }

    .details-container {
      input {
        width: 100%;
      }
    }

    .headline {
      font-size: 48px;
    }

    .form-border {
      width: 90%;
    }

    label {
      font-size: 14px;
      margin: 4px 0;
    }

    button {
      font-size: 16px;
    }

    /* .login {
      font-size: 18px;
      font-weight: 700;
      margin-top: 60px;
    } */
  }
`;
