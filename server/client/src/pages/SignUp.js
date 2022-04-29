import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import UseHttp from "../hooks/useHttp.";
import classes from "./Signup.module.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [job, setJob] = useState("");
  const { dispatch } = useAuthContext();

  const { isPending, success, error, sendRequest: signup } = UseHttp();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password || !job || !name) {
      return;
    }

    signup(
      {
        method: "POST",
        url: "/api/v1/auth/register",
        data: { password, email, job, name },
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
      <h1 className="h1 text-center">Sign up</h1>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label
          className="h5
        "
        >
          DisplayName
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
      </Form.Group>
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
        <Form.Text className="text-muted">
          Password should contains at least 6 caracters.
        </Form.Text>
      </Form.Group>
      {/* select input */}
      <Form.Group className="mb-3">
        <Form.Label
          className="h5
        "
        >
          Your job:
        </Form.Label>
        <Form.Select aria-label="job" onChange={(e) => setJob(e.target.value)}>
          <option>Select your current job</option>
          <option value=" junior frontend developper">
            Junior frontend developper
          </option>
          <option value="senior frontend developper">
            Senior frontend developper
          </option>
          <option value="junior backend developper">
            Junior backend developper
          </option>
          <option value="senior backend developper">
            Senior backend developper
          </option>
          <option value="junior fullstack developper">
            Junior fullstack developper
          </option>
          <option value="senior fullstack developper">
            Senior fullstack developper
          </option>
          <option value={"junior UI&UX degsiner"}>
            {" Junior UI&UX degsiner"}
          </option>
          <option value={"junior UI&UX degsiner"}>
            {" Senior UI&UX degsiner"}
          </option>
        </Form.Select>
      </Form.Group>

      {error && (
        <Form.Text className="text-danger text-capitalize">{error}</Form.Text>
      )}

      {!isPending && (
        <Button
          type="submit"
          variant="primary"
          className={`${classes.btn} d-block ms-auto mt-3`}
        >
          Sign up
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
    </Form>
  );
};

export default Signup;
