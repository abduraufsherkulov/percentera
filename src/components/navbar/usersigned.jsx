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
export class UserSigned extends Component {
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
      let ratingBadge = "badge badge-";
      let ratingStatus;
      if (localStorage.getItem("rating") === "E") {
        ratingBadge += "danger";
      } else if (localStorage.getItem("rating") === "D") {
        ratingBadge += "secondary";
      } else if (localStorage.getItem("rating") === "C") {
        ratingBadge += "light";
      } else if (localStorage.getItem("rating") === "B") {
        ratingBadge += "primary";
      } else if (localStorage.getItem("rating") === "A") {
        ratingBadge += "success";
      }
      if (localStorage.getItem("status") === "Anonymous") {
        badgeClass += "secondary";
        ratingStatus = "";
      } else if (localStorage.getItem("status") === "Verified") {
        badgeClass += "primary";
        ratingStatus = (
          <DropdownItem disabled>
            Credit Rating:{" "}
            <span className={ratingBadge}>
              {localStorage.getItem("rating")}
            </span>
          </DropdownItem>
        );
      } else if (localStorage.getItem("status") === "Citizen") {
        badgeClass += "yellow";
        ratingStatus = (
          <DropdownItem disabled>
            Credit Rating:{" "}
            <span className={ratingBadge}>
              {localStorage.getItem("rating")}
            </span>
          </DropdownItem>
        );
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
            {ratingStatus}
            <DropdownItem tag={Link} to="/notifications">
              Notifications
            </DropdownItem>
            <DropdownItem tag={Link} to="/mycredits">
              My Credits
            </DropdownItem>
            <DropdownItem tag={Link} to="/myinvestments">
              My Investments
            </DropdownItem>
            <DropdownItem tag={Link} to="/mycards">
              My Cards
            </DropdownItem>
            <DropdownItem tag={Link} to="/personal">
              Personal Information
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
