import "./App.css";
import { useState } from "react";
import { AppInsightsContext } from "@microsoft/applicationinsights-react-js";
import { reactPlugin } from "./AppInsights";
import { v1 as uuidv1 } from "uuid";

function App() {
  const [data, setData] = useState([]);
  const fetchData = () => {
    console.log("Getting the data");
    const id = uuidv1();
    reactPlugin.trackEvent(
      { name: "GET Weather Forecast API called" },
      { correlationId: id }
    );
    fetch("https://localhost:7283/WeatherForecast")
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        setData(text);
        reactPlugin.trackTrace(
          { message: text, severity: "Information" },
          { correlationId: id }
        );
      });
  };
  return (
    <AppInsightsContext.Provider value={reactPlugin}>
      <div className="App">
        <header className="App-header">
          <p>This app fetches data and shows on UI</p>
        </header>
        <div className="App-body">
          {/* Add a button to call a HTTP api and display the response */}
          <button onClick={fetchData}>Call Weather API</button>
          <p>{data}</p>
        </div>
      </div>
    </AppInsightsContext.Provider>
  );
}

export default App;
