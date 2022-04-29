import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useAuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

import classes from "./createProject.module.css";
import UseHttp from "../hooks/useHttp.";

const Create = () => {
  const [projectName, setProjectName] = useState("");
  const [repositryURL, setRepositryURL] = useState("");
  const [siteURL, setSiteURL] = useState("");
  const [tags, setTags] = useState([]);
  const [tagError, setErrorTag] = useState(null);
  const [description, setDescription] = useState("");
  const { isPending, success, error, sendRequest: createProject } = UseHttp();

  const { user } = useAuthContext();

  const navigate = useNavigate();

  const AnimatedComponent = makeAnimated();
  const options = [
    { value: "React", label: "React" },
    { value: "Vanilla js", label: "Vanilla js" },
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "Express js", label: "Express js" },
    { value: "Node js", label: "Node js" },
    { value: "Mongo DB", label: "Mongo DB" },
    { value: "Firebase", label: "Firebase" },
    { value: "Bootstrap", label: "Bootstrap" },
    { value: "Tailwind", label: "Tailwind" },
    { value: "Material UI", label: "Material UI" },
    { value: "Php", label: "Php" },
    { value: "Laravel", label: "Laravel" },
  ];

  const submitHandler = async (e) => {
    e.preventDefault();

    setErrorTag(null);
    const project = {
      projectName,
      repositryURL,
      siteURL,
      tags,
      description,
    };
    if (tags.length < 1) {
      setErrorTag("You must select at least one tag");
      return;
    }
    createProject(
      {
        url: "/api/v1/projects",
        method: "POST",
        data: project,
        headers: { "Content-type": "application/json" },
      },
      (data) => {
        return;
      }
    );
  };

  useEffect(() => {
    if (success) {
      navigate("/");
    }
  }, [success]);
  return (
    <section className="pt-3 w-100">
      <h1 className="h2 text-center">Create A New Project</h1>
      <Form className="mx-auto w-75 bg-light mt-3" onSubmit={submitHandler}>
        <Form.Group className="mb-2">
          <Form.Label className="h5">Project Name:</Form.Label>
          <Form.Text className="d-block">
            Include some of the tools and techniques you used to complete the
            project..
          </Form.Text>
          <Form.Control
            type="text"
            required
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="eg: Responsive landing page using CSS Grid"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="respositry ">
          <Form.Label className="h5">RepositryURL:</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            required
            value={repositryURL}
            onChange={(e) => setRepositryURL(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3 " controlId="Url">
          <Form.Label className="h5">Live site URL:</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            required
            value={siteURL}
            onChange={(e) => setSiteURL(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="tags">
          <Form.Label className="h5">Tags:</Form.Label>
          <Form.Text
            className="d-block
           my-0"
          >
            You must select al least one tag.
          </Form.Text>
          <Select
            isMulti
            components={AnimatedComponent}
            options={options}
            onChange={(option) => {
              setTags(option.map((item) => item.value));
            }}
            className={classes["select-container"]}
          />
          {tagError && (
            <Form.Text className="text-danger">{tagError}</Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label className="h5">Description (optional):</Form.Label>
          <Form.Control
            as="textarea"
            style={{ height: "180px" }}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </Form.Group>
        {error && <p className="text-danger">{error}</p>}
        {!isPending && (
          <Button
            type="submit"
            className={`${classes.btn} d-flex ms-auto`}
            disabled={isPending}
          >
            Add project
          </Button>
        )}
        {isPending && (
          <Button
            className={`${classes.btn} d-flex ms-auto`}
            disabled={isPending}
          >
            Loading...
          </Button>
        )}
      </Form>
    </section>
  );
};

export default Create;
