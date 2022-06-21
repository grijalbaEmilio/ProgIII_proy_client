import { Card, Image } from "antd";
import { Link } from "react-router-dom";

import "./Card.scss"

const { Meta } = Card;
/* { path: "mani", image: "", avatar: "", title: "", description: "" } */
export default function card(content) {
  const { children } = content;
  const { path, image, title, description } = children;
  return (
      <Card
        className="card"
        hoverable
        style={{ width: 240 }}
        cover={<Image width={240} src={image} />}
      >
        <Meta title={<Link to = {path}>{title}</Link>} description={description} />
      </Card>
  );
}
