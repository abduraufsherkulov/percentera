import React, { Component } from "react";
import { Container, Row, Alert } from "reactstrap";
import axios from "axios";
import { Terms } from "./terms";
export class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      repassword: "",
      user_type: "",
      usernamecheck: false,
      emailcheck: false,
      passwordcheck: false,
      userSigned: "",
      alert: {
        message: ""
      },
      err: {
        username: "",
        email: "",
        password: "",
        repassword: "Passwords do not match"
      },
      succ: {
        username: "",
        email: "",
        password: "",
        repassword: "Passwords match"
      },
      isLoading: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    this.setState({
      isLoading: true
    });
    const url = "https://hidden-oasis-96512.herokuapp.com/signup";
    const mydata = JSON.stringify({
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      user_type: this.state.user_type
    });
    console.log(mydata);
    axios({
      method: "post",
      url: url,
      data: mydata,
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(response => {
        if (response.data === "OK") {
          this.setState(
            {
              userSigned: true,
              alert: {
                message: "You have successfully registered!"
              }
            },
            () => {
              window.scrollTo(0, 0);
              this.setState({
                isLoading: false
              });
              const { history } = this.props;
              if (this.state.userSigned === true) {
                setTimeout(function() {
                  history.push("/signin");
                }, 3000);
              }
            }
          );
        }
      })
      .catch(error => {
        this.setState({
          userSigned: false,
          alert: {
            message: "Oops, something went wrong. Please try again!"
          },
          isLoading: false
        });
      });

    event.preventDefault();
  }

  handleChange(event) {
    if (event.target.name === "user_type") {
      console.log(true);
      this.setState({
        user_type: event.target.value
      });
    }
    if (event.target.name === "username") {
      this.setState(
        {
          username: event.target.value
        },
        () => {
          const username =
            "https://hidden-oasis-96512.herokuapp.com/usernamecheck";
          const datausername = JSON.stringify({
            username: this.state.username
          });
          axios({
            method: "post",
            url: username,
            data: datausername,
            headers: {
              "Content-type": "application/json"
            }
          })
            .then(response => {
              if (response.data === false) {
                this.setState({
                  usernamecheck: true,
                  err: {
                    username: "This username is already taken"
                  }
                });
              } else {
                this.setState({
                  usernamecheck: false,
                  succ: {
                    username: "Username is free"
                  }
                });
              }
            })
            .catch(error => {});
        }
      );
    }
    if (event.target.name === "email") {
      this.setState(
        {
          email: event.target.value
        },
        () => {
          const email = "https://hidden-oasis-96512.herokuapp.com/emailcheck";
          const dataemail = JSON.stringify({
            email: this.state.email
          });
          axios({
            method: "post",
            url: email,
            data: dataemail,
            headers: {
              "Content-type": "application/json"
            }
          })
            .then(response => {
              if (response.data === true) {
                this.setState({
                  emailcheck: false,
                  err: {
                    email: "The email is already taken"
                  }
                });
              } else {
                this.setState({
                  emailcheck: true,
                  succ: {
                    email: "You can take this email"
                  }
                });
              }
            })
            .catch(error => {});
        }
      );
    }
    event.preventDefault();
  }

  onPassword = event => {
    this.setState({
      password: event.target.value
    });
  };
  onPasswordcheck = event => {
    this.setState({
      repassword: event.target.value
    });
  };
  onRadioChange = event => {
    this.setState({
      user_type: event.target.value
    });
  };
  componentDidUpdate(prop, state) {
    if (this.state.isLoading !== state.isLoading)
      this.props.loadme(this.state.isLoading);
  }
  componentDidMount() {
    this.setState({
      isLoading: false
    });
  }
  render() {
    //username
    let showErrMessage =
      this.state.username.length < 5
        ? "Username must be longer than 5 letters"
        : this.state.err.username;
    let usernameValidation = "form-control ";
    if (this.state.username.length === 0) {
      usernameValidation += "";
    } else if (this.state.username.length < 5) {
      usernameValidation += "is-invalid";
    } else if (this.state.usernamecheck === true) {
      usernameValidation += "is-valid";
    } else if (this.state.usernamecheck === false) {
      usernameValidation += "is-invalid";
    }
    //email
    let errEmailMessage = this.state.email.includes("@")
      ? this.state.err.email
      : "Invalid email type";
    let emailValidation = "form-control ";
    if (this.state.email.length === 0) {
      emailValidation += "";
    } else if (!this.state.email.includes("@")) {
      emailValidation += "is-invalid";
    } else if (this.state.emailcheck === true) {
      emailValidation += "is-valid";
    } else if (this.state.emailcheck === false) {
      emailValidation += "is-invalid";
    }
    // password
    let passwordValidation = "form-control ";
    if (
      this.state.repassword.length > 0 &&
      this.state.repassword !== this.state.password
    ) {
      passwordValidation += "is-invalid";
    } else if (
      this.state.repassword.length > 0 &&
      this.state.repassword === this.state.password
    ) {
      passwordValidation += "is-valid";
    }
    let btnValidation =
      this.state.usernamecheck !== true ||
      this.state.emailcheck !== true ||
      (passwordValidation === "form-control is-invalid" ||
        passwordValidation === "form-control ") ? (
        <button className="btn btn-yellow w-100 mt-5 big-btn disabled" disabled>
          SUBMIT
        </button>
      ) : (
        <button className="btn btn-yellow w-100 mt-5 big-btn">SUBMIT</button>
      );
    let alertme =
      this.state.userSigned === "" ? (
        ""
      ) : (
        <Alert style={{ margin: "0 auto" }} color="yellow w-50 text-center">
          {this.state.alert.message}
        </Alert>
      );

    return (
      <section id="signup">
        <Container>
          <Row>
            {alertme}
            <h1 className="w-100 text-center mb-3 big-h1">
              Register an account
            </h1>
            <form
              onSubmit={this.handleSubmit}
              className="col-md-4 offset-md-4 col"
            >
              <div className="form-group">
                {/* Username */}
                <div>
                  <label htmlFor="validationServer01" />
                  <input
                    onChange={this.handleChange}
                    name="username"
                    type="text"
                    className={usernameValidation}
                    id="validationServer01"
                    placeholder="Login"
                    required
                    disabled={this.state.isLoading}
                  />
                  <div className="valid-feedback">Username is free</div>
                  <div className="invalid-feedback">{showErrMessage}</div>
                </div>
                {/* Email */}
                <div>
                  <label htmlFor="validationServer02" />
                  <input
                    onChange={this.handleChange}
                    name="email"
                    type="email"
                    className={emailValidation}
                    id="validationServer02"
                    placeholder="E-mail"
                    required
                    disabled={this.state.isLoading}
                  />
                  <div className="valid-feedback">{this.state.succ.email}</div>
                  <div className="invalid-feedback">{errEmailMessage}</div>
                </div>
                <div className="mt-4 d-flex align-items-center justify-content-between">
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      id="radio_01"
                      name="user_type"
                      onChange={this.onRadioChange}
                      className="custom-control-input"
                      value="Financial"
                      required
                    />
                    <label className="custom-control-label" htmlFor="radio_01">
                      Financial institution
                    </label>
                  </div>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      id="radio_02"
                      name="user_type"
                      onChange={this.onRadioChange}
                      className="custom-control-input"
                      value="Individual"
                      required
                    />
                    <label className="custom-control-label" htmlFor="radio_02">
                      Individual
                    </label>
                  </div>
                </div>
                {/* Password */}
                <div>
                  <label htmlFor="validationServer03" />
                  <input
                    onChange={this.onPassword}
                    name="password"
                    type="password"
                    className="form-control"
                    id="validationServer03"
                    placeholder="Password"
                    required
                    disabled={this.state.isLoading}
                  />
                </div>
                {/* Password check */}
                <div>
                  <label htmlFor="validationServer04" />
                  <input
                    onChange={this.onPasswordcheck}
                    name="repassword"
                    type="password"
                    className={passwordValidation}
                    id="validationServer04"
                    placeholder="Repeat password"
                    required
                    disabled={this.state.isLoading}
                  />
                  <div className="valid-feedback">Passwords match</div>
                  <div className="invalid-feedback">Passwords do not match</div>
                </div>
                {/* Button */}
                {btnValidation}
                {/* Remember Me */}
                <div className="custom-control custom-checkbox mb-4 mt-2">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="agree"
                    required
                  />
                  <label
                    className="custom-control-label undertext"
                    htmlFor="agree"
                  >
                    Agree with the
                    <Terms />
                  </label>
                  <div className="invalid-feedback">
                    Example invalid feedback text
                  </div>
                </div>
              </div>
            </form>
          </Row>
        </Container>
      </section>
    );
  }
}

export default SignUp;
