import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./app/App";
import "./index.css";
import registerServiceWorker from "./lib/scripts/registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
registerServiceWorker();
