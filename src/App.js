import React, { Component } from "react";
import { Navigation } from "./components/navigation";
import RouteMe from "./routeme";
import "react-datepicker/dist/react-datepicker.css";
import "../node_modules/react-big-calendar/lib/css/react-big-calendar.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTrashAlt,
  faPen,
  faTimes,
  faCheck,
  faCaretRight,
  faCaretLeft
} from "@fortawesome/free-solid-svg-icons";

library.add(faTrashAlt, faPen, faTimes, faCheck, faCaretRight, faCaretLeft);
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Navigation />
        <RouteMe />
      </div>
    );
  }
}

export default App;
