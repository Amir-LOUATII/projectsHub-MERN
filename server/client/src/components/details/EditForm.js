import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import classes from "./Comments.module.css";
import UseHttp from "../../hooks/useHttp.";

const EditForm = (props) => {
  const [editedName, setEditedName] = useState("");
  const [editedRepositryURL, setEditedRepositryURL] = useState("");
  const [editedSiteURL, setEditedSiteURL] = useState("");
  const [editedTags, setEditedTags] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [tagError, setErrorTag] = useState(null);
  const { isPending, error, sendRequest, success } = UseHttp();

  useEffect(() => {
    if (props.project && !success) {
      const { projectName, siteURL, repositryURL, tags, description } =
        props.project;
      setEditedName(projectName);
      setEditedRepositryURL(repositryURL);
      setEditedTags(tags);
      setEditedSiteURL(siteURL);
      setEditedDescription(description);
    }
  }, [props.project, success]);
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
    sendRequest(
      {
        url: `/api/v1/projects/${props.project._id}`,
        method: "PATCH",
        data: {
          projectName: editedName,
          siteURL: editedSiteURL,
          repositryURL: editedRepositryURL,
          tags: editedTags,
          description: editedDescription,
        },
        headers: { "Content-type": "application/json" },
      },
      (data) => {
        return;
      }
    );
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        props.onHide();
      }, 2000);
      window.location.reload();
    }
  }, [success]);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="h4">
          Edit project
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.project && (
          <Form
            className="mx-auto w-75 bg-light mt-3 p-3"
            onSubmit={submitHandler}
          >
            <Form.Group className="mb-2">
              <Form.Label className="h5">Project Name:</Form.Label>
              <Form.Text className="d-block">
                Include some of the tools and techniques you used to complete
                the project..
              </Form.Text>
              <Form.Control
                type="text"
                required
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                placeholder="eg: Responsive landing page using CSS Grid"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="respositry ">
              <Form.Label className="h5">RepositryURL:</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                required
                value={editedRepositryURL}
                onChange={(e) => setEditedRepositryURL(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3 " controlId="Url">
              <Form.Label className="h5">Live site URL:</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                required
                value={editedSiteURL}
                onChange={(e) => setEditedSiteURL(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="tags">
              <Form.Label className="h5">Tags:</Form.Label>
              <Select
                isMulti
                components={AnimatedComponent}
                options={options}
                onChange={(option) => {
                  setEditedTags(option.map((item) => item.value));
                }}
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
                onChange={(e) => setEditedDescription(e.target.value)}
                value={editedDescription}
              />
            </Form.Group>

            {success && (
              <p className="text-capitalize bg-success text-center">
                Project successfully edited
              </p>
            )}
            <div className="w-100 d-flex justify-content-end ">
              <Button
                onClick={props.onHide}
                className={`${classes["close-btn"]} d-block me-3`}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className={` ${classes.btn}  ms-3 d-block`}
                disabled={isPending}
                onClick={submitHandler}
              >
                {!isPending ? "Edit" : "Loading..."}
              </Button>
            </div>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default EditForm;
