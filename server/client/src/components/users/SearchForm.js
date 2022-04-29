import React from "react";
import { Form, InputGroup, FormControl } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useUsersContext } from "../../context/usersContext";

import classes from "./SearchForm.module.css";
function SearchForm() {
  const { updateSearchTerm } = useUsersContext();

  return (
    <Form onSubmit={(e) => e.preventDefault()} className="w-75 mx-auto mb-3">
      <InputGroup className="mb-2">
        <FormControl
          id="inlineFormInputGroup"
          placeholder="Search User..."
          className={classes.form}
          onChange={(e) => updateSearchTerm(e.currentTarget.value)}
        />
        <InputGroup.Text className={classes["icon-text"]}>
          <FaSearch className={classes.icon} />
        </InputGroup.Text>
      </InputGroup>
    </Form>
  );
}

export default SearchForm;
