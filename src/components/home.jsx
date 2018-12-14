import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Button,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from "reactstrap";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import "moment/locale/en-gb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import quick from "../img/style/quick.png";
import nopay from "../img/style/nopay.png";
import secure from "../img/style/secure.png";
import one from "../img/style/one.png";
import two from "../img/style/two.png";
import three from "../img/style/three.png";

import opinion from "../img/style/metallica.png";
import opinion2 from "../img/style/metallica2.png";
import opinion3 from "../img/style/metallica3.png";

const localizer = BigCalendar.momentLocalizer(moment);
const items = [
  {
    src: opinion,
    altText: "Soloist Metallica",
    caption: "James Hetfield",
    thought:
      "It was a refreshing to work with a financial services company that cared \nand did everything to make the process fast and simple!"
  },
  {
    src: opinion2,
    altText: "Soloist Metallica",
    caption: "James Hetfield",
    thought:
      "It was a refreshing to work with a financial services company that cared \nand did everything to make the process fast and simple!"
  },
  {
    src: opinion3,
    altText: "Soloist Metallica",
    caption: "James Hetfield",
    thought:
      "It was a refreshing to work with a financial services company that cared \nand did everything to make the process fast and simple!"
  }
];

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: "",
      images: [
        {
          image: quick,
          parag: "Quick and easy",
          spanik: "Fast and transparent \nprocesses"
        },
        {
          image: nopay,
          parag: "No prepayment",
          spanik: "Pay your loan off at \nany time"
        },
        {
          image: secure,
          parag: "Secure process",
          spanik: "We take the safety of \nyour information seriously"
        }
      ],
      how: [
        {
          image: one,
          word: "Tell us about yourself and how much you want to borrow."
        },
        {
          image: two,
          word:
            "Review your monthly payment and interest rate options, and choose the one you like best."
        },
        {
          image: three,
          word: "Your loan is automatically deposited into your bank account."
        }
      ],
      activeIndex: 0,
      percent: +"",
      overall: +"",
      percentOfMoney: +"",
      overallMoney: +"",
      daily: +"",
      dailyPercent: +"",
      amount: +"",
      long: +"",
      ours: 2,
      given: "",
      divided: [],
      events: [],
      applied: false,
      rest_tempbalance: +"",
      err: {
        valid: "",
        message: "",
        validRate: "",
        messageRate: ""
      },
      amount_wanted: "",
      rate_wanted: "",
      duration_wanted: "",
      restrict: ""
    };

    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  handleChange = event => {
    this.props.onView(event.target.value);
  };
  componentDidUpdate(nextprops, nextstate) {
    if (nextstate.isLoading !== this.state.isLoading) {
      this.props.loadme(this.state.isLoading);
    }
    if (nextstate.amount_wanted !== this.state.amount_wanted) {
      //investor + percentera percentage
      let overall = +this.state.rate_wanted;
      //overall percent should be paid ex. overall + 600(PERCENT)
      let percentOfMoney = +this.state.amount_wanted * (overall / 100);
      //overall of money should be paid with percentage 5600
      let overallMoney = +this.state.amount_wanted + percentOfMoney;
      //daily should equal in money
      let daily = overallMoney / this.state.long;
      //daily should equal in percent
      let dailyPercent = overall / this.state.long;

      let i = 1;
      let myArr = [];

      for (i; i <= +this.state.long; i++) {
        let per = i * daily;
        per = per.toFixed(2);
        let add = moment(this.state.given).add(i, "day");
        let a = {
          start: new Date(add),
          end: new Date(moment(add).add(0, "day")),
          title: `${per} Sum`
        };

        myArr.push(a);
      }
      this.setState({
        events: myArr
      });

      this.setState({
        overall: overall,
        percentOfMoney: percentOfMoney,
        overallMoney: overallMoney,
        daily: daily,
        dailyPercent: dailyPercent
      });
    } else if (nextstate.rate_wanted !== this.state.rate_wanted) {
      //investor + percentera percentage
      let overall = +this.state.rate_wanted;
      //overall percent should be paid ex. overall + 600(PERCENT)
      let percentOfMoney = +this.state.amount_wanted * (overall / 100);
      //overall of money should be paid with percentage 5600
      let overallMoney = +this.state.amount_wanted + percentOfMoney;
      //daily should equal in money
      let daily = overallMoney / this.state.long;
      //daily should equal in percent
      let dailyPercent = overall / this.state.long;

      let i = 1;
      let myArr = [];

      for (i; i <= +this.state.long; i++) {
        let per = i * daily;
        per = per.toFixed(2);
        let add = moment(this.state.given).add(i, "day");
        let a = {
          start: new Date(add),
          end: new Date(moment(add).add(0, "day")),
          title: `${per} Sum`
        };

        myArr.push(a);
      }
      this.setState({
        events: myArr
      });

      this.setState({
        overall: overall,
        percentOfMoney: percentOfMoney,
        overallMoney: overallMoney,
        daily: daily,
        dailyPercent: dailyPercent
      });
    }
  }
  handleValueChange = event => {
    if (event.target.name === "amount_wanted") {
      let main_rest = Math.min(
        this.state.restrict,
        this.state.rest_tempbalance
      );
      if (main_rest < event.target.value) {
        this.setState({
          amount_wanted: event.target.value,
          err: {
            valid: false,
            message: `You can only invest less than ${main_rest}`
          }
        });
      } else {
        this.setState({
          amount_wanted: event.target.value,
          err: {
            valid: true,
            message: `It is valid investment`
          }
        });
      }
    } else if (event.target.name === "rate_wanted") {
      let main_rate = event.target.value;
      let higher = +this.state.percent + 10;
      if (event.target.value > higher) {
        this.setState({
          rate_wanted: event.target.value,
          err: {
            validRate: false,
            messageRate: `Are you sure you want to receive ${main_rate}%? Preferred rate is ${
              this.state.percent
            }%`
          }
        });
      } else if (event.target.value < higher) {
        this.setState({
          rate_wanted: event.target.value,
          err: {
            validRate: true
          }
        });
      } else {
        this.setState({
          rate_wanted: event.target.value,
          err: {
            validRate: true
          }
        });
      }
    } else if (event.target.name === "duration_wanted") {
      this.setState({
        duration_wanted: event.target.value
      });
    }
  };
  handleRateChange = event => {
    this.setState({
      rate_wanted: event.target.value
    });
  };
  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === items.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? items.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }
  // componentDidUpdate(prop, state) {
  //   if (this.state.isLoading !== state.isLoading)
  //     this.props.loadme(this.state.isLoading);
  // }
  render() {
    document.onreadystatechange = () => {
      if (document.readyState === "complete") {
        this.setState({
          isLoading: false
        });
      }
    };
    const { activeIndex } = this.state;
    const slides = items.map((item, i) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.thought + i}
        >
          <img src={item.src} alt={item.altText} />
          <CarouselCaption
            captionText={item.thought}
            captionHeader={item.caption}
          />
        </CarouselItem>
      );
    });
    var listItems = (
      <React.Fragment>
        <div className="col-4">
          <div>
            <label>Overall Percent</label>
            <p>{this.state.overall}%</p>
          </div>
          <div>
            <label>Percent with overall investment</label>
            <p className="down-p">{this.state.overallMoney} Sum</p>
          </div>
        </div>
        <div className="col-4">
          <div>
            <label>Daily Amount Will Be Received</label>
            <p>{this.state.daily} Sum</p>
          </div>
          <div>
            <label>Overall amount needed</label>
            <p className="down-p">{this.state.rest_tempbalance} Sum</p>
          </div>
        </div>
        <div className="col-4">
          <div>
            <label>Daily Percentage</label>
            <p>{this.state.dailyPercent}%</p>
          </div>
          <div>
            <label>Preferred percent by borrower</label>
            <p className="down-p">{this.state.percent}%</p>
          </div>
        </div>
      </React.Fragment>
    );

    const toolbar = props => {
      const { onNavigate, label } = props;
      return (
        <div className="rbc-toolbar">
          {/* <button type="button" onClick={() => onNavigate("TODAY")}>
              today
            </button> */}
          <span>
            <FontAwesomeIcon
              icon="caret-left"
              style={{ cursor: "pointer" }}
              className="text-white ml-3"
              onClick={() => onNavigate("PREV")}
            />
          </span>
          <span className="rbc-toolbar-label">{label}</span>
          <span>
            <FontAwesomeIcon
              icon="caret-right"
              style={{ cursor: "pointer" }}
              onClick={() => onNavigate("NEXT")}
              className="text-white mr-3"
            />
          </span>
        </div>
      );
    };
    const dateHeader = props => {
      const { label } = props;
      return <span>{label}</span>;
    };
    return (
      <div className="home">
        <section id="first">
          <Container>
            <Row>
              <div className="inpop d-flex col align-items-center justify-content-center">
                <div className="text-center">
                  <h1 className="text-white">
                    Personal loans up <br /> to{" "}
                    <span className="text-yellow">2,000,000 Sums</span>
                  </h1>
                  <p className="text-white">
                    You are more than your credit score.
                    <br />
                    Percentera helps you to get the rate you deserve.
                  </p>
                  <Button color="yellow px-5" to="/borrowerlist" tag={Link}>
                    BORROW NOW
                  </Button>
                </div>
              </div>
            </Row>
          </Container>
        </section>
        <section
          id="second"
          className="text-center text-center d-flex justify-items-center align-items-center"
        >
          <Container>
            <Row>
              {this.state.images.map(response => (
                <div
                  alt="whatever"
                  key={response.image}
                  className="col-12 col-md-4 py-3"
                >
                  <div>
                    <img alt={response.src} src={response.image} />
                  </div>
                  <div>
                    <p className="mb-1 mt-5">{response.parag}</p>
                    <span>{response.spanik}</span>
                  </div>
                </div>
              ))}
            </Row>
          </Container>
        </section>
        <section
          id="fourth"
          className="text-center text-center d-flex justify-items-center align-items-center"
        >
          <Container>
            <Row>
              <h1 className="w-100 text-center">How Percentera works?</h1>
              {this.state.how.map(response => (
                <div key={response.image} className="col-12 col-md-4">
                  <div className="top-part">
                    <img alt="whatever" src={response.image} />
                  </div>
                  <div className="bottom-part">
                    <p>{response.word}</p>
                  </div>
                </div>
              ))}
            </Row>
          </Container>
        </section>
        <section id="home-calendar">
          <Container>
            <Row>
              <h1 className="w-100 text-center">Construct preferred rate</h1>

              <form
                onSubmit={this.handleSubmit}
                className="col-md-10 offset-md-1 col bg-white px-4 py-4"
              >
                <div className="row">
                  <div className="col-4">
                    <div>
                      <label className="pt-2" htmlFor="amount_wanted">
                        Preferred amount of money you want to invest
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        onChange={this.handleValueChange}
                        name="amount_wanted"
                        type="number"
                        className="form-control"
                        id="amount_wanted"
                        placeholder="100000"
                        value={this.state.amount_wanted}
                        max={this.state.restrict}
                        required
                      />
                      <div className="valid-feedback">Looks good!</div>
                      <div className="invalid-feedback">
                        {this.state.err.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div>
                      <label className="pt-2" htmlFor="rate_wanted">
                        Preferred amount of rate you want to receive
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        onChange={this.handleValueChange}
                        name="rate_wanted"
                        type="number"
                        className="form-control"
                        id="rate_wanted"
                        placeholder="22"
                        value={this.state.rate_wanted}
                        required
                      />
                      <div className="valid-feedback">Looks good!</div>
                      <div className="invalid-feedback">
                        {this.state.err.messageRate}
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div>
                      <label className="pt-2" htmlFor="duration_wanted">
                        Preferred duration
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        onChange={this.handleValueChange}
                        name="duration_wanted"
                        type="number"
                        className="form-control"
                        id="duration_wanted"
                        placeholder="22"
                        value={this.state.duration_wanted}
                        required
                      />
                      <div className="valid-feedback">Looks good!</div>
                      <div className="invalid-feedback">
                        {this.state.err.messageRate}
                      </div>
                    </div>
                  </div>
                  {listItems}
                </div>
              </form>
              <div className="col-md-10 offset-md-1 col bg-white mb-5">
                <div className="row">
                  <div className="w-100 listborder">
                    <BigCalendar
                      localizer={localizer}
                      defaultDate={new Date()}
                      defaultView="month"
                      components={{
                        toolbar: toolbar,
                        month: { dateHeader: dateHeader }
                      }}
                      events={this.state.events}
                      style={{ height: "55vh", width: "100%" }}
                    />
                  </div>
                </div>
              </div>
            </Row>
          </Container>
        </section>
        <section
          id="fifth"
          className="text-center text-center d-flex justify-items-center align-items-center"
        >
          <Container>
            <Row>
              <div className="allin w-100">
                <h1>
                  Are you ready
                  <br />
                  to use Percentera?
                </h1>
                <Button
                  tag={Link}
                  to="/investmoney"
                  className="btn btn-outline-light px-5"
                >
                  INVEST NOW
                </Button>
              </div>
            </Row>
          </Container>
        </section>
        <section id="third">
          <Container>
            <Row>
              <h1 className="text-center w-100">What customers are saying?</h1>
              <div className="slider col">
                <Carousel
                  activeIndex={activeIndex}
                  next={this.next}
                  previous={this.previous}
                  className="text-center"
                >
                  <CarouselIndicators
                    items={items}
                    activeIndex={activeIndex}
                    onClickHandler={this.goToIndex}
                  />
                  {slides}
                  <CarouselControl
                    direction="prev"
                    directionText="Previous"
                    onClickHandler={this.previous}
                  />
                  <CarouselControl
                    direction="next"
                    directionText="Next"
                    onClickHandler={this.next}
                  />
                </Carousel>
              </div>
            </Row>
          </Container>
        </section>
      </div>
    );
  }
}

export default Home;
