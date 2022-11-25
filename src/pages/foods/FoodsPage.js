/* eslint-disable */
import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Food from "./Food";
import Asset from "../../components/Asset";

import appStyles from "../../App.module.css";
import styles from "../../styles/FoodsPage.module.css";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

function FoodsPage({ message, filter = "" }) {
  const [foods, setFoods] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const { data } = await axiosReq.get(`/foods/?${filter}search=${query}`);
        setFoods(data);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };

    setHasLoaded(false);

    const timer = setTimeout(() => {
      fetchFoods();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <i className={`fas fa-search ${styles.SearchIcon}`} />
        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            className="mr-sm-2"
            placeholder="Search posts"
          />
        </Form>

        {hasLoaded ? (
          <>
            {foods.results.length ? (
              <InfiniteScroll
                children={foods.results.map((food) => (
                  <Food key={food.id} {...food} setFoods={setFoods} />
                ))}
                dataLength={foods.results.length}
                loader={<Asset spinner />}
                hasMore={!!foods.next}
                next={() => fetchMoreData(foods, setFoods)}
              />
            ) : (
              <Container>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
    </Row>
  );
}

export default FoodsPage;
