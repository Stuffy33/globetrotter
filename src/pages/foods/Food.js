import React from "react";
import styles from "../../styles/Food.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";

import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";

function Food(props) {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    modified_on,
    title,
    content,
    image,
    foodPage,
    dress_code,
    kids_friendly,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/foods/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/foods/${id}/`);
      history.goBack();
    } catch (err) {
      //   console.log(err);
    }
  };

  return (
    <Card className={styles.Food}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`profiles/${profile_id}`} className={styles.Username}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{modified_on}</span>
            {is_owner && foodPage && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/foods/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {content && <Card.Text>{content}</Card.Text>}
        <i className={`fas fa-tshirt ${styles.Shirt}`} />
        {dress_code}
        <p>Kids friendly: {kids_friendly}</p>
      </Card.Body>
    </Card>
  );
}

export default Food;
