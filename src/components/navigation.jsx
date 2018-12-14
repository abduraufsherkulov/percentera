import React, { Component } from "react";
import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand
} from "reactstrap";
import { ForPerson } from "./navbar/forperson";
import { ForBank } from "./navbar/forbank";
import Logo from "../img/style/percentera.png";
import { Link } from "react-router-dom";

export class Navigation extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    let navBar =
      localStorage.getItem("user_type") === "Financial" ? (
        <ForBank />
      ) : (
        <ForPerson />
      );
    return (
      <div>
        <Navbar light expand="md">
          <Container>
            <NavbarBrand to="/" tag={Link}>
              <img alt="Percentera" src={Logo} />
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              {navBar}
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default Navigation;
