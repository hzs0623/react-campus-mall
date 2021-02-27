import React from "react";
import { render } from "react-dom";
import "./index.less";
import "antd/dist/antd.css";
import reportWebVitals from "./utils/reportWebVitals";
import Router from "./routes";

render(<Router />, document.querySelector("#app"));

reportWebVitals();
