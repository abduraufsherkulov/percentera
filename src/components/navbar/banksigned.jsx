import React, { Component } from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { NavItem, NavLink, Button } from "reactstrap";
import { Link } from "react-router-dom";
import thumbnail from "../../img/style/thumbnail.png";
export class BankSigned extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    localStorage.clear();
  }
  render() {
    if (localStorage.getItem("signed")) {
      let badgeClass = "badge badge-";
      if (localStorage.getItem("status") === "Anonymous") {
        badgeClass += "secondary";
      } else if (localStorage.getItem("status") === "Verified") {
        badgeClass += "primary";
      } else if (localStorage.getItem("status") === "Citizen") {
        badgeClass += "yellow";
      }
      return (
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            <img alt={thumbnail} src={thumbnail} />{" "}
            {localStorage.getItem("signed")}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem disabled>
              Status:{" "}
              <span className={badgeClass}>
                {localStorage.getItem("status")}
              </span>
            </DropdownItem>
            <DropdownItem tag={Link} to="/notifications">
              Notifications
            </DropdownItem>
            <DropdownItem tag={Link} to="/mycredits">
              My Credits
            </DropdownItem>
            <DropdownItem tag={Link} to="/myaccount">
              My Account
            </DropdownItem>
            <DropdownItem tag={Link} to="/fininfo">
              Financial Information
            </DropdownItem>
            <DropdownItem href="#" onClick={this.handleClick}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      );
    } else {
      return (
        <React.Fragment>
          <NavItem>
            <NavLink tag={Link} to="/signup">
              Sign Up
            </NavLink>
          </NavItem>
          <Button color="yellow" tag={Link} to="/signin">
            Sign In
          </Button>
        </React.Fragment>
      );
    }
  }
}
