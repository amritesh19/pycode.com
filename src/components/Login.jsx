import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../context/UserAuthContext";
import { Container, Row, Col } from "react-bootstrap";
import userService from "../services/userService";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();

  const getDate = async () => {
    let currentDate = new Date();
    let cDay = currentDate.getDate();
    let cMonth = currentDate.getMonth() + 1;
    let cYear = currentDate.getFullYear();
    let cdate = cDay + "-" + cMonth + "-" + cYear;
    console.log(cdate);
    try {
      const docSnap = await userService.getDate(cdate);
      // console.log(docSnap);
      // console.log("the record is :", docSnap.data().counter);
      const counter = docSnap.data().counter + 1;
      // console.log(counter);
      const newDate = {
        counter,
      };
      await userService.updateDate(cdate, newDate);
    } catch (ex) {
      console.log(ex);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/python");
      getDate();
      toast("Successfully Logged In");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/python");
      getDate();
      toast("Successfully Logged In");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <>
      <Container style={{ width: "400px", height: "750px" }}>
        <Row>
          <Col>
            <div className="p-4 box">
              <h2 className="mb-3">Firebase Auth Login</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    type="email"
                    placeholder="Email address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button variant="primary" type="Submit">
                    Log In
                  </Button>
                </div>
              </Form>
              <hr />
              <div>
                <GoogleButton
                  className="g-btn"
                  type="dark"
                  onClick={handleGoogleSignIn}
                />
              </div>
            </div>
            <div className="p-4 box mt-3 text-center">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
