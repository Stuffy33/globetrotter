import React from "react";
import appStyles from "../../App.module.css";
import { useRedirect } from "../../hooks/useRedirect";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const Confirmations = () => {
  useRedirect("loggedOut");
  return (
    <Row>
      <Col>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1>Thanks</h1>
          <p className="text-center">
            We have recived your message, we contact you soon!
          </p>
        </Container>
      </Col>
    </Row>
  );
};

export default Confirmations;
