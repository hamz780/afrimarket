import { useState } from "react";
import "./Analytics.css";

export default function DateFilter() {

  const [period, setPeriod] = useState("Last 30 Days");

  return (

    <div className="date-filter">

      <label>📅 Period</label>

      <select
        value={period}
        onChange={(e) => setPeriod(e.target.value)}
      >

        <option>Today</option>

        <option>Last 7 Days</option>

        <option>Last 30 Days</option>

        <option>Last 3 Months</option>

        <option>Last 6 Months</option>

        <option>This Year</option>

      </select>

    </div>

  );

}