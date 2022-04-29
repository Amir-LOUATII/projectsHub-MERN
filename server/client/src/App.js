import { Col, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import ProjectDetails from "./pages/ProjectDetails";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import NavbarComponent from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Create from "./pages/CreateProject";
import { useAuthContext } from "./context/authContext";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
import CurrentUserDetails from "./components/CurrentUserDetails";

function App() {
  const { user, authIsReady } = useAuthContext();
  return (
    <Router>
      <>
        {authIsReady && (
          <>
            <NavbarComponent />
            <Container fluid className="p-0">
              <Row className="justify-content-center  g-0">
                {user && (
                  <Col xs={12} md={3} lg={2}>
                    <Sidebar />
                  </Col>
                )}
                <Col
                  xs={12}
                  md={user ? 6 : 12}
                  lg={user ? 8 : 12}
                  className=" d-flex justify-content-center min-vh-100 px-3"
                >
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                      path="/login"
                      element={!user ? <Login /> : <Navigate to="/" />}
                    />
                    <Route
                      path="/signup"
                      element={!user ? <Signup /> : <Navigate to="/" />}
                    />
                    <Route
                      path="/create"
                      element={user ? <Create /> : <Navigate to="/login" />}
                    />
                    <Route
                      path="/project/:id"
                      element={
                        user ? <ProjectDetails /> : <Navigate to="/login" />
                      }
                    />
                    <Route
                      path="/userprofile/:id"
                      element={user ? <Profile /> : <Navigate to="/login" />}
                    />
                    <Route
                      path="/users"
                      element={user ? <Users /> : <Navigate to="/login" />}
                    />
                  </Routes>
                </Col>
                {user && (
                  <Col xs={12} md={3} lg={2} className="d-none d-md-block">
                    <CurrentUserDetails />
                  </Col>
                )}
              </Row>
            </Container>
          </>
        )}
      </>
    </Router>
  );
}

export default App;
