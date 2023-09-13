import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useDispatch } from "react-redux";
import { register } from "../../redux/reducer/userSlice";


const Register: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [valueRegister, setvalueRegister] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChangeInputRegister = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setvalueRegister({ ...valueRegister, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userRegister = valueRegister;
      await dispatch(register(userRegister) as any).unwrap();
      navigate("/Login");
    } catch (err) {
      console.log(err);
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
              <input
                onChange={handleChangeInputRegister}
                className="first-name"
                type="text"
                name="firstName"
                placeholder="First Name"
              />
              <input
                onChange={handleChangeInputRegister}
                className="last-name"
                type="text"
                name="lastName"
                placeholder="Last Name"
              />
            </div>
            <input
              onChange={handleChangeInputRegister}
              className="email"
              name="email"
              type="email"
              placeholder="Email.."
            />
            <input
              onChange={handleChangeInputRegister}
              className="password"
              name="password"
              type="password"
              placeholder="Password.."
            />
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
