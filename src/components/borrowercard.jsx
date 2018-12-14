import React, { Component } from "react";
import moment from "moment";
import styled from "styled-components";

import { Link } from "react-router-dom";
import { Button, Progress } from "reactstrap";
export class BorrowerCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      id,
      //borrow_dead_line,
      borrow_interest,
      borrow_needed,
      borrow_why,
      date,
      first_name,
      last_name,
      credit_type,
      user_id,
      tempbalance
    } = this.props;
    let userStatus = localStorage.getItem("status");
    let userId = parseInt(localStorage.getItem("userId"), 10);
    let viewButton =
      userStatus === "Anonymous" ||
      userStatus === "Verified" ||
      userId === user_id ||
      userStatus === null ? (
        <Button color="yellow" disabled={true}>
          View
        </Button>
      ) : (
        <Button color="yellow" to={`/borrowin/${id}`} tag={Link}>
          View
        </Button>
      );
    let prog = (100 * tempbalance) / borrow_needed;
    const Example = () => {
      return (
        <Wrapper>
          <div className="text-center">{prog}%</div>
          <Progress
            style={{ flex: "none" }}
            animated
            color="yellow"
            value={prog}
          />
        </Wrapper>
      );
    };
    let truncate = width => {
      return `
        width: ${width}%;
      `;
    };
    const Wrapper = styled.div`
      .progress-bar {
        flex: none !important;
        width: 0;
        animation: progress 1.5s ease-in-out forwards,
          progress-bar-stripes 1s linear infinite;
      }
      @keyframes progress {
        from {
          width: 0;
        }
        to {
          ${truncate()}%;
        }
      }
    `;
    return (
      <div className="w-100 listborder">
        <div className="col-12">
          <div className="form-group mx-md-4 my-4">
            <label htmlFor="validationServer01">
              <i>For </i>
              {borrow_why}
            </label>
            <div className="d-flex justify-content-around">
              <div>
                <span>Borrower</span>
                <h1>
                  {first_name} {last_name}
                </h1>
              </div>
              <div>
                <span>Amount</span>
                <h1>{borrow_needed}</h1>
              </div>
              <div>
                <span>Interest rate</span>
                <h1>
                  {borrow_interest}% {credit_type}
                </h1>
              </div>
              <div>
                <span>Deadline</span>
                <h1>{moment(date).format("MMM D, YYYY")}</h1>
              </div>
            </div>
            <div className="if-completed">
              <Example />
            </div>
            <div className="status-button d-flex justify-content-between align-items-center my-2">
              <span>
                Last checked: <b>20 minutes ago</b>
              </span>
              {viewButton}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
