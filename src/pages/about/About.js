import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import appStyles from "../../App.module.css";
import styles from "../../styles/About.module.css";

function About() {
  return (
    <Row className={styles.Row}>
        <Container className={`${appStyles.Content} p-4 text-center`}>
          <h2 className={styles.Header}>
            <strong>About us</strong>
          </h2>
          <hr />
          <p>Welcome to GlobeTrotter</p>
          <p>
            GlobeTrotter is a place where turist and locals can meet and
            exchange activites. Currently we are based in Cape town, South
            africa.
          </p>
          <p>
            Our goal is to make a comunity that shares new and exciting
            experiance with eachother thats not the typical turist traps but
            instead less seen golden nuggets that Cape town has to offer.
          </p>

          <p>
            Think of it as knowing a local guide when you travle to Cape town.
            example: where to eat, whats the best hikes, Which Wine farm to go
            to or maybe a hidden beach.
          </p>

          <p>Join our comunity and share your golden nuggets!</p>
          <br />
        </Container>
    </Row>
  );
}

export default About;
