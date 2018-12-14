import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import uzcard from "../img/cards/logo-f.png";

export class AddedCards extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="w-100 listborder bg-white">
        <div className="form-group mx-4 my-5">
          <div className="row">
            <div className="col-md-6 cardleft">
              <div className="w-100 cardpart">
                <div className="mx-4">
                  <img src={uzcard} alt="card_image" />
                  <div className="card_number">{this.props.card_number}</div>
                  <div className="exp_date">
                    <span>Expiration date</span>
                    <span className="ml-2">{this.props.expire_date}</span>
                  </div>
                  <div className="owner">
                    {this.props.card_holder_name.toUpperCase()}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 cardright">
              <div className="innerinfo">
                <div className="namepart">
                  <span className="top-tit">Title</span>
                  <h1>
                    {this.props.title}
                    <span className="float-right">
                      <FontAwesomeIcon icon="pen" />
                    </span>
                  </h1>
                </div>
                <div className="balance">
                  <span className="top-tit">Balance</span>
                  <h1>
                    {this.props.balance}
                    <span className="float-right">
                      <FontAwesomeIcon icon="trash-alt" />
                    </span>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
