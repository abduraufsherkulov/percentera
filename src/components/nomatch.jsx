import React, { Component } from "react";

export class NoMatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: localStorage.getItem("status")
    };
  }
  render() {
    let showerr = "";
    if (this.state.status === "Anonymous") {
      showerr += "Please fill in your profile info.";
    } else if (this.state.status === "Verified") {
      showerr += "Please add your card.";
    } else if (this.state.status === "Citizen") {
      showerr += "";
    } else {
      showerr += "Please sign in to procceed";
    }
    return (
      <section id="nomatch">
        <div className="container">
          <div className="row">
            <h4 className="text-center col mt-5">
              You don't have permission to access this page! {showerr}
            </h4>
          </div>
        </div>
      </section>
    );
  }
}