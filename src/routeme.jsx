import React, { Component } from "react";
import styled from "styled-components";

import MainFooter from "./components/mainfooter";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Route, Switch, withRouter } from "react-router-dom";
import { Home } from "./components/home";
import { SignUp } from "./components/signup";
import { SignIn } from "./components/signin";
import { Recover } from "./components/recover";
import { BorrowMoney } from "./components/borrowmoney";
import { BorrowerList } from "./components/borrowerlist";
import { InvestMoney } from "./components/investmoney";
import { InvestorList } from "./components/investorlist";
import { MyCards } from "./components/mycards";
import { Personal } from "./components/personal";
import { NoMatch } from "./components/nomatch";
import { BankOfPercentera } from "./components/bankofpercentera";
import { BorrowIn } from "./components/borrowin";
import { CreditsIn } from "./components/creditsin";
import { InvestIn } from "./components/investin";
import { MyCredits } from "./components/mycredits";
import { MyInvestments } from "./components/myinvestments";
import { GiveCredit } from "./components/fininst/givecredit";
import { ListOfCredits } from "./components/fininst/listofcredits";
import { FinInfo } from "./components/fininst/fininfo";
import { MyAccount } from "./components/fininst/myaccount";
import { CreditsInStat } from "./components/creditsinstat";
import { InvestInStat } from "./components/investinstat";
import { ListOfCreditsIn } from "./components/fininst/listofcreditsin";
import pourLoad from "./img/style/pourload.png";

class RouteMe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isRated: localStorage.getItem("rating")
    };
  }
  handleLoad = loadProp => {
    this.setState({
      isLoading: loadProp
    });
  };

  render() {
    let loader = (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          zIndex: "99",
          position: "fixed",
          fontSize: "100px",
          top: "0%",
          /* right: 50%, */
          background: "rgb(0, 0, 0, 0.7)"
        }}
      >
        <div className="d-flex align-items-center justify-content-center h-100">
          <Scoper>
            <img src={pourLoad} alt={pourLoad} className="img-fluid" />
          </Scoper>
        </div>
      </div>
    );
    let routeThis;
    if (localStorage.getItem("signed")) {
      if (localStorage.getItem("user_type") === "Individual") {
        if (localStorage.getItem("status") === "Anonymous") {
          routeThis = (
            <Switch location={this.props.location}>
              <Route
                exact
                path="/"
                render={() => (
                  <Home loadme={this.handleLoad} history={this.props.history} />
                )}
              />
              <Route
                exact
                path="/borrowerlist"
                render={() => (
                  <BorrowerList
                    loadme={this.handleLoad}
                    history={this.props.history}
                  />
                )}
              />
              <Route
                exact
                path="/personal"
                render={props => (
                  <Personal loadme={this.handleLoad} {...props} />
                )}
              />
              <Route
                exact
                path="/listofcredits"
                render={() => (
                  <ListOfCredits
                    loadme={this.handleLoad}
                    history={this.props.history}
                  />
                )}
              />
              <Route
                exact
                path="/listofcredits"
                render={() => (
                  <ListOfCredits
                    loadme={this.handleLoad}
                    history={this.props.history}
                  />
                )}
              />
              <Route
                exact
                path="/bankofpercentera"
                render={props => (
                  <BankOfPercentera loadme={this.handleLoad} {...props} />
                )}
              />
              <Route component={NoMatch} />
            </Switch>
          );
        } else if (localStorage.getItem("status") === "Verified") {
          routeThis = (
            <Switch location={this.props.location}>
              <Route
                exact
                path="/"
                render={() => (
                  <Home loadme={this.handleLoad} history={this.props.history} />
                )}
              />
              <Route
                exact
                path="/borrowerlist"
                render={() => (
                  <BorrowerList
                    loadme={this.handleLoad}
                    history={this.props.history}
                  />
                )}
              />
              <Route
                exact
                path="/listofcredits"
                render={() => (
                  <ListOfCredits
                    loadme={this.handleLoad}
                    history={this.props.history}
                  />
                )}
              />
              <Route
                exact
                path="/bankofpercentera"
                render={props => (
                  <BankOfPercentera loadme={this.handleLoad} {...props} />
                )}
              />
              <Route
                exact
                path="/personal"
                render={props => (
                  <Personal loadme={this.handleLoad} {...props} />
                )}
              />
              <Route
                exact
                path="/mycards"
                render={props => (
                  <MyCards loadme={this.handleLoad} {...props} />
                )}
              />
              <Route component={NoMatch} />
            </Switch>
          );
        } else if (localStorage.getItem("status") === "Citizen") {
          routeThis = (
            <Switch location={this.props.location}>
              <Route
                exact
                path="/"
                render={() => (
                  <Home loadme={this.handleLoad} history={this.props.history} />
                )}
              />
              <Route
                exact
                path="/borrowmoney"
                render={() => (
                  <BorrowMoney
                    loadme={this.handleLoad}
                    history={this.props.history}
                  />
                )}
              />
              <Route
                exact
                path="/borrowerlist"
                render={() => (
                  <BorrowerList
                    loadme={this.handleLoad}
                    history={this.props.history}
                  />
                )}
              />
              <Route exact path="/investmoney" component={InvestMoney} />
              <Route exact path="/investorlist" component={InvestorList} />
              <Route exact path="/investin/:id" component={InvestIn} />
              <Route
                exact
                path="/creditsin/:id"
                render={props => (
                  <CreditsIn loadme={this.handleLoad} {...props} />
                )}
              />
              <Route
                exact
                path="/personal"
                render={() => (
                  <Personal
                    loadme={this.handleLoad}
                    history={this.props.history}
                  />
                )}
              />
              <Route
                exact
                path="/mycards"
                render={props => (
                  <MyCards loadme={this.handleLoad} {...props} />
                )}
              />
              <Route
                exact
                path="/borrowin/:id"
                render={props => (
                  <BorrowIn loadme={this.handleLoad} {...props} />
                )}
              />
              <Route
                exact
                path="/creditsin/:borrow_id/creditsinstat/:id"
                render={props => (
                  <CreditsInStat loadme={this.handleLoad} {...props} />
                )}
              />
              <Route
                exact
                path="/investmentin/:borrow_id/investinstat/:id"
                render={props => (
                  <InvestInStat loadme={this.handleLoad} {...props} />
                )}
              />
              <Route
                exact
                path="/listofcreditsin/:id"
                render={props => (
                  <ListOfCreditsIn loadme={this.handleLoad} {...props} />
                )}
              />
              <Route
                exact
                path="/mycredits"
                render={props => (
                  <MyCredits loadme={this.handleLoad} {...props} />
                )}
              />
              <Route
                exact
                path="/myinvestments"
                render={props => (
                  <MyInvestments loadme={this.handleLoad} {...props} />
                )}
              />
              <Route
                exact
                path="/listofcredits"
                render={props => (
                  <ListOfCredits loadme={this.handleLoad} {...props} />
                )}
              />
              <Route component={NoMatch} />
            </Switch>
          );
        }
      } else if (localStorage.getItem("user_type") === "Financial") {
        if (localStorage.getItem("status") === "Anonymous") {
          routeThis = (
            <Switch location={this.props.location}>
              <Route
                exact
                path="/signup"
                render={() => (
                  <SignUp
                    loadme={this.handleLoad}
                    history={this.props.history}
                  />
                )}
              />
              <Route
                exact
                path="/signin"
                render={props => <SignIn loadme={this.handleLoad} {...props} />}
              />
              <Route exact path="/recover" component={Recover} />
              <Route
                exact
                path="/"
                render={() => (
                  <Home loadme={this.handleLoad} history={this.props.history} />
                )}
              />
              <Route
                exact
                path="/listofcredits"
                render={() => (
                  <ListOfCredits
                    loadme={this.handleLoad}
                    history={this.props.history}
                  />
                )}
              />
              <Route
                exact
                path="/fininfo"
                render={props => (
                  <FinInfo loadme={this.handleLoad} {...props} />
                )}
              />
              <Route component={NoMatch} />
            </Switch>
          );
        } else if (localStorage.getItem("status") === "Verified") {
          routeThis = (
            <Switch location={this.props.location}>
              <Route
                exact
                path="/signup"
                render={() => (
                  <SignUp
                    loadme={this.handleLoad}
                    history={this.props.history}
                  />
                )}
              />
              <Route
                exact
                path="/signin"
                render={props => <SignIn loadme={this.handleLoad} {...props} />}
              />
              <Route exact path="/recover" component={Recover} />
              <Route
                exact
                path="/"
                render={() => (
                  <Home loadme={this.handleLoad} history={this.props.history} />
                )}
              />
              <Route
                exact
                path="/listofcredits"
                render={() => (
                  <ListOfCredits
                    loadme={this.handleLoad}
                    history={this.props.history}
                  />
                )}
              />
              <Route
                exact
                path="/fininfo"
                render={props => (
                  <FinInfo loadme={this.handleLoad} {...props} />
                )}
              />
              <Route exact path="/myaccount" component={MyAccount} />
              <Route
                exact
                path="/bankofpercentera"
                render={props => (
                  <BankOfPercentera loadme={this.handleLoad} {...props} />
                )}
              />
              <Route component={NoMatch} />
            </Switch>
          );
        } else if (localStorage.getItem("status") === "Citizen") {
          routeThis = (
            <Switch location={this.props.location}>
              <Route
                exact
                path="/signup"
                render={() => (
                  <SignUp
                    loadme={this.handleLoad}
                    history={this.props.history}
                  />
                )}
              />
              <Route
                exact
                path="/signin"
                render={props => <SignIn loadme={this.handleLoad} {...props} />}
              />
              <Route exact path="/recover" component={Recover} />
              <Route
                exact
                path="/listofcredits"
                render={props => (
                  <ListOfCredits loadme={this.handleLoad} {...props} />
                )}
              />
              <Route
                exact
                path="/mycredits"
                render={props => (
                  <MyCredits loadme={this.handleLoad} {...props} />
                )}
              />
              <Route
                exact
                path="/"
                render={() => (
                  <Home loadme={this.handleLoad} history={this.props.history} />
                )}
              />
              <Route
                exact
                path="/givecredit"
                render={props => (
                  <GiveCredit loadme={this.handleLoad} {...props} />
                )}
              />
              <Route
                exact
                path="/fininfo"
                render={props => (
                  <FinInfo loadme={this.handleLoad} {...props} />
                )}
              />
              <Route exact path="/myaccount" component={MyAccount} />
              <Route
                exact
                path="/listofcreditsin/:id"
                render={() => (
                  <ListOfCreditsIn loadme={this.handleLoad} {...this.props} />
                )}
              />
              <Route component={NoMatch} />
            </Switch>
          );
        }
      }
    } else {
      routeThis = (
        <Switch location={this.props.location}>
          <Route
            exact
            path="/signup"
            render={() => (
              <SignUp loadme={this.handleLoad} history={this.props.history} />
            )}
          />
          <Route
            exact
            path="/signin"
            render={() => (
              <SignIn loadme={this.handleLoad} history={this.props.history} />
            )}
          />
          <Route exact path="/recover" component={Recover} />
          <Route
            exact
            path="/"
            render={() => (
              <Home loadme={this.handleLoad} history={this.props.history} />
            )}
          />
          <Route
            exact
            path="/listofcredits"
            render={() => (
              <ListOfCredits
                loadme={this.handleLoad}
                history={this.props.history}
              />
            )}
          />
          <Route
            exact
            path="/borrowerlist"
            render={() => (
              <BorrowerList
                loadme={this.handleLoad}
                history={this.props.history}
              />
            )}
          />
          <Route component={NoMatch} />
        </Switch>
      );
    }
    return (
      <Wrapper>
        <TransitionGroup className="transition-group">
          <CSSTransition
            key={this.props.location.key}
            timeout={{ enter: 300, exit: 300 }}
            classNames="fade"
          >
            <section className="route-section">
              {this.state.isLoading === true ? loader : ""}
              {routeThis}
              <MainFooter />
            </section>
          </CSSTransition>
        </TransitionGroup>
      </Wrapper>
    );
  }
}
const Scoper = styled.div`
  @keyframes myfirst {
    from {
      transform: rotateY(0deg);
    }
    to {
      transform: rotateY(360deg);
    }
  }
  img {
    width: 100px;
    -webkit-animation: myfirst 5s linear 2s infinite alternate; /* Safari 4.0 - 8.0 */
    animation: myfirst 2s linear 0s infinite;
  }
`;
const Wrapper = styled.div`
  .fade-enter {
    opacity: 0.01;
  }

  .fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 300ms ease-in;
  }

  .fade-exit {
    opacity: 1;
  }

  .fade-exit.fade-exit-active {
    opacity: 0.01;
    transition: opacity 300ms ease-in;
  }

  div.transition-group {
    position: relative;
  }

  section.route-section {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
  }
`;
export default withRouter(RouteMe);
