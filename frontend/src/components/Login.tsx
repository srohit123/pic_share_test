import React, { useEffect } from "react";
import { useFormik, FormikErrors } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AUTHENTICATE } from "../utils/actionConstants";

import { AuthState } from "../redux/slices/authSlice";

export interface Auth {
  auth: AuthState
}
interface InputValues {
  username: string;
}

const Login: React.FC = () => {
  const dispatch = useDispatch()
  const { isLogin } = useSelector((state: Auth) => state.auth);
  const navigate = useNavigate();
  const validate = (values: InputValues) => {
    const errors: FormikErrors<InputValues> = {};
    if (!values.username) {
      errors.username = "Required";
    } else if (values.username.trim() === "") {
      errors.username = "Please enter a valid username";
    }
    return errors;
  };

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik<InputValues>({
      initialValues: {
        username: "",
      },
      onSubmit: (values) => {
        const { username } = values;
        dispatch({ type: AUTHENTICATE, username: username.trim() })
      },
      validate,
    });

  useEffect(() => {
    if (isLogin) {
      navigate('/home');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin])

  return (
    <main className="main-section">
      <div className="container">
        <section className="login-section">
          <div className="login-wrap">
            <img src="assets/images/logo.svg"
              className="img-fluid d-block mx-auto logo-img"
              alt="Logo Img" />
            <p className="title-text">Login to start sharing</p>
            <form className="form-box" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  autoComplete="off"
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="Username"
                  onChange={handleChange}
                  value={values.username}
                  onBlur={handleBlur}
                />
                {touched.username &&
                  errors.username ?
                  (<small className="text-danger">{errors.username}</small>)
                  : null}
              </div>
              <div className="text-center">
                <button type="submit" className="btn primary-btn">Log In</button>
              </div>
            </form>
          </div>
        </section>
      </div >
    </main >
  )
}

export default React.memo(Login);