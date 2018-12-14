import React, { Component } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { Alert } from "reactstrap";
import axios from "axios";
import { AccountAdded } from "./accountadded";

library.add(faTrashAlt, faPen);

export class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      card_holder_name: "",
      user_id: localStorage.getItem("userId"),
      card_number: "",
      expire_date: "",
      mycards: [],
      bank_card_id: "",
      card_added: false,
      card_error: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const myurl = `http://mycontract.uz/frontend/web/profile/get?id=${localStorage.getItem(
      "userId"
    )}`;
    axios({
      method: "post",
      url: myurl,
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(response => {
        this.setState({
          card_holder_name: `${response.data.first_name} ${
            response.data.surname
          }`
        });
      })
      .catch(function(error) {
        console.log(error);
      });

    const url = "https://hidden-oasis-96512.herokuapp.com/getUserCards";
    const mydata = JSON.stringify({
      user_id: this.state.user_id
    });
    axios({
      method: "post",
      url: url,
      data: mydata,
      headers: { "Content-Type": "application/json" }
    })
      .then(response => {
        //handle success
        this.setState({
          mycards: response.data
        });
      })
      .catch(function(response) {
        //handle error
        console.log(response);
      });
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    //const { history } = this.props;
    const url = "https://hidden-oasis-96512.herokuapp.com/checkCard";
    const mydata = JSON.stringify({
      card_number: this.state.card_number,
      expire_date: this.state.expire_date
    });
    axios({
      method: "post",
      url: url,
      data: mydata,
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(response => {
        this.setState(
          {
            bank_card_id: response.data[0].id
          },
          () => {
            const inurl =
              "https://hidden-oasis-96512.herokuapp.com/userCardAdd";
            const indata = JSON.stringify({
              user_id: this.state.user_id,
              bank_card_id: this.state.bank_card_id,
              card_holder_name: this.state.card_holder_name,
              title: this.state.title
            });
            axios({
              method: "post",
              url: inurl,
              data: indata,
              headers: {
                "Content-type": "application/json"
              }
            })
              .then(response => {
                this.setState(
                  {
                    card_added: true
                  },
                  () => {
                    if (localStorage.getItem("status") !== "Citizen") {
                      const thislink =
                        "https://hidden-oasis-96512.herokuapp.com/updateStatus";

                      const thisdata = JSON.stringify({
                        user_id: localStorage.getItem("userId"),
                        user_status: "Citizen"
                      });

                      axios({
                        method: "post",
                        url: thislink,
                        data: thisdata,
                        headers: { "Content-Type": "application/json" }
                      })
                        .then(response => {
                          localStorage.setItem("status", "Citizen");
                        })
                        .catch(response => {
                          console.log(response);
                        });
                    }

                    const { history } = this.props;
                    if (this.state.card_added === true) {
                      setTimeout(function() {
                        history.push("/myaccount");
                      }, 3000);
                    }
                  }
                );
              })
              .catch(response => {
                console.log(response);
              });
          }
        );
      })
      .catch(response => {
        this.setState({
          card_error: true
        });
      });
    event.preventDefault();
  }
  render() {
    let thisClass = "form-control ";
    thisClass += this.state.card_error === true ? "is-invalid" : "";
    let alertme =
      this.state.card_added === false ? (
        ""
      ) : (
        <Alert style={{ margin: "0 auto" }} color="yellow w-50 text-center">
          Your card has successfully verified
        </Alert>
      );
    return (
      <section id="mycards" className="coverUp">
        <div className="container">
          <div className="row">
            <h1 className="w-100 text-center mb-3 big-h1">My Account</h1>
            <form
              onSubmit={this.handleSubmit}
              className="col-md-8 offset-md-2 col mb-5"
            >
              {alertme}
              <div className="row">
                {this.state.mycards.map((response, n) => (
                  <AccountAdded
                    key={n}
                    balance={response.balance}
                    card_holder_name={response.card_holder_name}
                    card_number={response.card_number}
                    expire_date={response.expire_date}
                    title={response.title}
                  />
                ))}
                <div className="addcard w-100 bg-white pb-5 mt-4">
                  <h1 className="w-100 pl-4 py-4">Add Card</h1>
                  <div className="mx-4">
                    <div className="row">
                      <div className="col-md-6">
                        <div>
                          <label className="pt-2" htmlFor="card_title">
                            Title
                          </label>
                          <input
                            onChange={this.handleChange}
                            name="title"
                            type="text"
                            className={thisClass}
                            id="card_title"
                            placeholder="Main card"
                            required
                          />
                          <div className="valid-feedback">Looks good!</div>
                          <div className="invalid-feedback">
                            Something went wrong, please try again!
                          </div>
                        </div>
                        <div>
                          <label className="pt-2" htmlFor="expire_date">
                            Expire date
                          </label>
                          <input
                            onChange={this.handleChange}
                            name="expire_date"
                            type="text"
                            className={thisClass}
                            id="expire_date"
                            placeholder="04/20"
                            required
                          />
                          <div className="valid-feedback">Looks good!</div>
                          <div className="invalid-feedback">
                            Something went wrong, please try again!
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div>
                          <label className="pt-2" htmlFor="card_number">
                            Card number
                          </label>
                          <input
                            onChange={this.handleChange}
                            name="card_number"
                            type="number"
                            className={thisClass}
                            id="card_number"
                            placeholder="6295 3244 1202 7856"
                            required
                          />
                          <div className="valid-feedback">Looks good!</div>
                          <div className="invalid-feedback">
                            Something went wrong, please try again!
                          </div>
                        </div>
                        <div className="float-right d-flex mt-5">
                          <button className="btn btn-yellow px-4">
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
}
