import React, { Component } from "react";
import { Container, Row } from "reactstrap";
import axios from "axios";
import { Link } from "react-router-dom";

export class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      loggedUser: "",
      password: "",
      errorMessage: false,
      isLoading: "",
      signed: "",
      userId: "",
      user_type: "",
      status: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.setState({
      isLoading: false
    });
  }
  componentDidUpdate(prop, state) {
    if (this.state.isLoading !== state.isLoading)
      this.props.loadme(this.state.isLoading);
  }
  handleSubmit(event) {
    this.setState({
      isLoading: true
    });
    const url = "https://hidden-oasis-96512.herokuapp.com/signin";
    const mydata = JSON.stringify({
      username: this.state.username,
      password: this.state.password
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
        if (response.data.username) {
          localStorage.setItem("signed", response.data.username);
          localStorage.setItem("userId", response.data.id);
          localStorage.setItem("status", response.data.status);
          localStorage.setItem("user_type", response.data.user_type);
          const getUrl = "https://hidden-oasis-96512.herokuapp.com/getRating";
          const getData = JSON.stringify({
            user_id: localStorage.getItem("userId")
          });
          axios({
            method: "post",
            url: getUrl,
            data: getData,
            headers: { "content-type": "application/json" }
          })
            .then(res => {
              this.setState({
                isLoading: false
              });
              if (res.data[0]) {
                localStorage.setItem("rating", res.data[0].rating);
              }
              this.props.history.push("/");
            })
            .catch(res => {
              console.log(res);
            });
        } else {
          this.setState({
            errorMessage: true,
            isLoading: false
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });

    event.preventDefault();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  render() {
    let classes = "form-control";
    classes += this.state.errorMessage === true ? " is-invalid" : "";
    return (
      <section id="signin">
        <Container>
          <Row>
            <h1 className="w-100 text-center mb-3 big-h1">Sign in</h1>
            <form
              onSubmit={this.handleSubmit}
              className="col-md-4 offset-md-4 col"
            >
              <div className="form-group">
                <div>
                  <label htmlFor="login" />
                  <input
                    onChange={this.handleChange}
                    type="text"
                    className={classes}
                    id="login"
                    name="username"
                    placeholder="Login"
                    required
                    disabled={this.state.isLoading}
                  />
                  <div className="invalid-feedback">
                    Username or password is incorrect
                  </div>
                </div>
                <div>
                  <label htmlFor="password" />
                  <input
                    onChange={this.handleChange}
                    type="password"
                    className={classes}
                    id="password"
                    placeholder="Password"
                    name="password"
                    required
                    disabled={this.state.isLoading}
                  />
                </div>
                <div className="d-flex justify-content-between align-items-baseline mb-4 mt-2">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="rememberme"
                    />
                    <label
                      className="custom-control-label undertext"
                      htmlFor="rememberme"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="custom-control">
                    <Link className="undertext-dif" to="/recover">
                      Forgot Password?
                    </Link>
                  </div>
                </div>
                <button className="btn btn-yellow w-100 mt-2 mb-2 big-btn">
                  SUBMIT
                </button>
                <div className="text-center redir">
                  <label className="undertext mr-1">
                    Not have account yet?
                  </label>
                  <Link className="undertext-dif" to="/signup">
                    Register
                  </Link>
                </div>
              </div>
            </form>
          </Row>
        </Container>
      </section>
    );
  }
}

export default SignIn;
