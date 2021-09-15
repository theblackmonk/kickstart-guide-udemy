import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "../routes";
//Link, a react component that renders anchor tags and let user navigate
//Link tag is a generic wrapper component that doesn't add in any html
//instead it wraps it's children with a click event

const Header = () => {
    //in jsx (html) to pass in an object literal use {{ }}
  return (
    <Menu style={{ marginTop: "10px" }}>
      <Link route="/">
        <a className="item">CrowdCoin</a>
      </Link>
      <Menu.Menu position="right">
        <Link route="/">
          <a className="item">Campaigns</a>
        </Link>

        <Link route="/campaigns/new">
          <a className="item">+</a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
