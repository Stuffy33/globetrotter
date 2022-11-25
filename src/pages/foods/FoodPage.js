import { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Food from "./Food";

function FoodPage() {
  const { id } = useParams();
  const [food, setFood] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: food }] = await Promise.all([
          axiosReq.get(`/foods/${id}`),
        ]);
        setFood({ results: [food] });
      } catch (err) {
        // console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Container>
      <Col>
        <Food {...food.results[0]} setFood={setFood} foodPage />
      </Col>
    </Container>
  );
}

export default FoodPage;
