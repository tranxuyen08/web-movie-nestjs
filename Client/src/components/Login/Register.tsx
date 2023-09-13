import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useDispatch } from "react-redux";
import { register } from "../../redux/reducer/userSlice";

const Register: React.FC = () => {
  const [errors, setErrors] = useState({
    lastName: "",
    firstName: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [valueRegister, setvalueRegister] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };

    if (!valueRegister.firstName) {
      newErrors.firstName = "First Name is required.";
      valid = false;
    }

    if (!valueRegister.lastName) {
      newErrors.lastName = "Last Name is required.";
      valid = false;
    }

    if (!valueRegister.email) {
      newErrors.email = "Email is required.";
      valid = false;
    }

    if (!valueRegister.password) {
      newErrors.password = "Password is required.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChangeInputRegister = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setvalueRegister({ ...valueRegister, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const userRegister = valueRegister;
        await dispatch(register(userRegister) as any).unwrap();
        navigate("/Login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <section className="sect-login">
      <div className="bkg-img"></div>
      <div className="container">
        <div className="wrapper-login">
          <h2 className="title-login">Create Account</h2>
          <form
            className="form"
            action="/register"
            method="POST"
            onSubmit={handleRegister}
          >
            <div className="user-name">
              <div className="wrapper-form">
                <input
                  onChange={handleChangeInputRegister}
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                />
                {errors.firstName && (
                  <p className="error">{errors.firstName}</p>
                )}
              </div>
              <div className="wrapper-form">
                <input
                  onChange={handleChangeInputRegister}
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                />
                {errors.lastName && <p className="error">{errors.lastName}</p>}
              </div>
            </div>
            <div className="wrapper-form">
              <input
                onChange={handleChangeInputRegister}
                className="email"
                name="email"
                type="email"
                placeholder="Email.."
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="wrapper-form">
              <input
                onChange={handleChangeInputRegister}
                className="password"
                name="password"
                type="password"
                placeholder="Password.."
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>

            <input className="btn btn-signin" type="submit" value="Register" />
          </form>
          <p className="text-sign-up">
            Not a member?<Link to="/Login"> Sign In</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
