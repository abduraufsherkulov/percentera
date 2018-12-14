import React, { Component } from "react";

import {
  Button,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { Link } from "react-router-dom";
import { BankSigned } from "./banksigned";

export class ForBank extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Nav className="ml-auto d-flex align-items-center" navbar>
        <Button outline color="yellow" tag={Link} to="/bankofpercentera">
          Bank of Percentera
        </Button>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav>Institutional offers</DropdownToggle>
          <DropdownMenu right>
            <DropdownItem tag={Link} to="/givecredit">
              Give credit
            </DropdownItem>
            <DropdownItem tag={Link} to="/listofcredits">
              List of credits
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <BankSigned />
      </Nav>
    );
  }
}
