import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Buttons.module.css";
import Asset from "../../components/Asset";
import { useRedirect } from "../../hooks/useRedirect";

/**
 * Render CreateArticleForm.
 * Supply user with input fields to create an Article.
 */
function CreateFoodForm() {
  useRedirect("loggedOut");

  const [errors, setErrors] = useState({});

  const [foodData, setFoodData] = useState({
    title: "",
    content: "",
    image: "",
    dress_code: "",
    kids_friendly: "",
  });

  const { title, content, image, dress_code, kids_friendly } = foodData;

  const imageInput = useRef(null);
  const history = useHistory();

  /**
   * Populate FoodData strings.
   */
  const handleChange = (event) => {
    setFoodData({
      ...foodData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setFoodData({
        ...foodData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", imageInput.current.files[0]);
    formData.append("dress_code", dress_code);
    formData.append("kids_friendly", kids_friendly);

    try {
      const { data } = await axiosReq.post("/foods/", formData);
      history.push(`/foods/${data.id}`);
    } catch (err) {
      // console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <Container className={styles.FormAlignment}>
      <h2>Share Food!</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
            aria-label="title"
          />
        </Form.Group>
        {errors?.title?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group>
          <Form.Label>Content:</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            name="content"
            value={content}
            onChange={handleChange}
            aria-label="content"
          />
        </Form.Group>
        {errors?.content?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group>
          <Form.Label>Dress Code:</Form.Label>
          <Form.Control
            as="select"
            defaultValue="Choose..."
            name="dress_code"
            onChange={handleChange}
            aria-label="dress_code"
          >
            <option value="beach_vibes">Beach Vibes</option>
            <option value="casual">Casual</option>
            <option value="button_up">Button up</option>
            <option value="fancy">Fancy</option>
          </Form.Control>
        </Form.Group>
        {errors?.dress_code?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group>
          <Form.Label>Kids Friendly?:</Form.Label>
          <Form.Control
            as="select"
            defaultValue="Choose..."
            name="kids_friendly"
            onChange={handleChange}
            aria-label="kids_friendly"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="unknown">Unknown</option>
          </Form.Control>
        </Form.Group>
        {errors?.kids_friendly?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group className="text-center">
          {image ? (
            <>
              <figure>
                <Image className={appStyles.Image} src={image} rounded />
              </figure>
              <div>
                <Form.Label htmlFor="image-upload" className={btnStyles.Button}>
                  Change image
                </Form.Label>
              </div>
            </>
          ) : (
            <Form.Label
              className="d-flex justify-content-center"
              htmlFor="image-upload"
            >
              <Col>
                <span>
                  <i className="fa-solid fa-cloud-arrow-up" />
                </span>
                <Asset message="Upload image" />
              </Col>
            </Form.Label>
          )}

          <Form.File
            id="image-upload"
            accept="image/*"
            onChange={handleChangeImage}
            ref={imageInput}
            className="d-none"
          />
        </Form.Group>
        {errors?.image?.map((message, idx) => (
          <Alert variant="danger" key={idx}>
            {message}
          </Alert>
        ))}

        <br />
        <Row className={styles.RowSpacing}>
          <Button type="submit" className={btnStyles.Button}>
            Submit
          </Button>

          <Button onClick={() => history.goBack()} className={btnStyles.Button}>
            Cancel
          </Button>
        </Row>
        <br />
      </Form>
    </Container>
  );
}

export default CreateFoodForm;
