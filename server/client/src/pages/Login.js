import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import UseHttp from "../hooks/useHttp.";
import classes from "./Signup.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isPending, error, success, sendRequest } = UseHttp();
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const submitHandler = async (e) => {
    e.preventDefault();
    await sendRequest(
      {
        method: "POST",
        url: "/api/v1/auth/login",
        data: { password, email },
      },
      (data) => {
        dispatch({ type: "LOGIN", payload: data.user });
      }
    );
  };

  useEffect(() => {
    if (success) {
      navigate("/");
    }
  }, [success]);
  return (
    <Form
      className={`${classes.form} mx-auto d-block pt-3`}
      onSubmit={submitHandler}
    >
      <h1 className="h1 text-center">Log in</h1>

      {/* email input */}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
          className="h5
        "
        >
          Email address
        </Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      {/* password input */}
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label
          className="h5
        "
        >
          Password
        </Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        {error && <Form.Text className="text-danger">{error}</Form.Text>}
        <Link to="/signup" className="mt-1 d-block ">
          Sign up
        </Link>
        {!isPending && (
          <Button
            type="submit"
            variant="primary"
            className={`${classes.btn} d-block ms-auto mt-3`}
            disabled={isPending}
          >
            Log in
          </Button>
        )}
        {isPending && (
          <Button
            variant="primary"
            className={`${classes.btn} d-block ms-auto mt-3`}
          >
            Loading...
          </Button>
        )}
      </Form.Group>
    </Form>
  );
};

export default Login;
