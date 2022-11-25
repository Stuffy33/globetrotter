import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import { useRedirect } from "../../hooks/useRedirect";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { axiosReq } from "../../api/axiosDefaults";

const ContactForm = () => {
  useRedirect("loggedOut");
  const [contactData, setContactData] = useState({
    fname: "",
    lname: "",
    email: "",
    content: "",
  });

  const { fname, lname, email, content } = contactData;
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleChange = (event) => {
    setContactData({
      ...contactData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosReq.post("/contact/", contactData);
      history.push("/confirmations");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Row>
      <Col>
        <Container className={`${appStyles.Content}`}>
          <h1 >Contact Us</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                name="fname"
                value={fname}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.fname?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group>
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                name="lname"
                value={lname}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.lname?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.email?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group>
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                name="content"
                value={content}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.content?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Button className={btnStyles.Button} type="submit">
              Submit
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning" className="mt-3">
                {message}
              </Alert>
            ))}
          </Form>
        </Container>
      </Col>
    </Row>
  );
};

export default ContactForm;
