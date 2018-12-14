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
import { UserSigned } from "./usersigned";
export class ForPerson extends Component {
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
          <DropdownToggle nav>Borrowing Options</DropdownToggle>
          <DropdownMenu right>
            <DropdownItem tag={Link} to="/borrowmoney">
              Borrow Money
            </DropdownItem>
            <DropdownItem tag={Link} to="/borrowerlist">
              Borrower's List
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav>Institutional offers</DropdownToggle>
          <DropdownMenu right>
            <DropdownItem tag={Link} to="/listofcredits">
              List of credits
            </DropdownItem>
            <DropdownItem tag={Link} to="/listofcreditors">
              List of creditors
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <UserSigned />
      </Nav>
    );
  }
}
