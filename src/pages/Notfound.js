import { Empty, Button } from "antd";
import { Link } from "react-router-dom";

import './Notfound.scss'

export default function LayoutNotFound(props) {

  return (
    <div>
      <Empty className="img"
        image="https://cdn.dribbble.com/users/932640/screenshots/2470471/jq.gif"
        imageStyle={{
          height: 400,
        }}
        description={<h1>Lo sentimos, Página no encontrada!</h1>}
      >
        <Button type="primary" ><a href="https://http.cat/404">Saber más</a></Button>
      </Empty>
    </div>
  );
}
