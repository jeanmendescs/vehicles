import { Col, Input, Row } from "antd";
import React from "react";
import { ReactSVG } from "react-svg";

import DropIcon from "../../assets/icons/drop.svg";

interface IHeader {
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Header({ onSearch }: IHeader) {
  return (
    <header className="header">
      <Row align="middle" className="header__row">
        <Col span={12} className="icon-column">
          <ReactSVG
            src={DropIcon}
            alt="Drop Icon"
            beforeInjection={(svg) => svg.classList.add("header__icon")}
          />
          <h1 className="icon-column__title">FULLSTACK</h1>
        </Col>
        <Col span={12} className="search-column">
          <Input
            size="large"
            onChange={onSearch}
            placeholder="SEARCH for a vehicle"
            className="search-column__search"
          />
        </Col>
      </Row>
    </header>
  );
}

export default Header;
