import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import SearchForm from "../components/users/SearchForm";
import User from "../components/users/User";
import { useUsersContext } from "../context/usersContext";
import Loading from "../UI/Loading";

const Users = () => {
  const { users, isPending, error, success, getAllUsers, filteredUsers } =
    useUsersContext();
  const [isEmpty, setIsEmpty] = useState(false);
  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (filteredUsers.length) {
      setIsEmpty(false);
    } else setIsEmpty(true);
  }, [filteredUsers.length]);

  if (isPending)
    return (
      <h1 className="text-center text-muted">
        <Loading />
      </h1>
    );

  if (error)
    return (
      <h2 className="text-muted text-center">
        Sorry we cannot get users, please try later.
      </h2>
    );

  return (
    <section className="pt-3 w-100">
      <h1 className="h2 text-center ">All Users</h1>
      <Container>{success && <SearchForm />}</Container>
      <Container className="py-3">
        {!isEmpty && success && (
          <Row className="gy-4">
            {filteredUsers.map((user, index) => {
              return (
                <Col xs={12} md={12} lg={6} xl={4} key={index}>
                  <User {...user} key={user.id} />
                </Col>
              );
            })}
          </Row>
        )}
        <Row>
          {success && !filteredUsers.length && (
            <h1 className="text-center text-muted">No Users.</h1>
          )}
        </Row>
      </Container>
    </section>
  );
};

export default Users;
