import React, { useContext } from "react";
import "../pages/Dashboard.scss";
import { AppContext } from "../app/AppStore";
import { getCountyGrandTotal, GrandTotal } from "../utils/calculations";

interface Props {
  state?: string;
  county?: string;
}

const USATotalsAlt: React.FunctionComponent<Props> = props => {
  const { state } = useContext(AppContext);

  const percentChange = (total: number, change: number): number => {
    return Math.round((change / total) * 100);
  };

  const defaultComparator = (a: any, b: any) => (a === b ? 0 : a < b ? -1 : 1);

  // TODO: just make getCountyGrandTotal data be indexed by Date objects?
  const grandTotals: GrandTotal = getCountyGrandTotal(state);
  const dates = Object.keys(grandTotals)
    .sort((a: string, b: string) => defaultComparator(new Date(a), new Date(b)))
    .reverse();

  const total = grandTotals[dates[0]]?.Confirmed;

  const totalWithComma = total.toLocaleString("en");

  const renderChange = (current: number, previous: number) => {
    if (current === undefined || previous === undefined) {
      return "N/A";
    }
    const change = current - previous;
    return `${change >= 0 ? "+" : ""}${change.toLocaleString(
      "en"
    )} (${percentChange(current, change)} %)`;
  };

  const selectedState =
    state.selection.state === undefined
      ? "National"
      : state.covidTimeSeries.states[state.selection.state][0].State;

  const selectedCounty =
    state.selection.county === undefined
      ? undefined
      : `: ` +
        state.covidTimeSeries.counties[state.selection.county][0].County +
        " County";

  return (
    <div className="total-wrap">
      <h1>
        {selectedState}
        {selectedCounty}
      </h1>
      <div className="total-item">
        <label className="usa-label">Confirmed cases</label>
        <span>{totalWithComma}</span>
      </div>
      <div className="total-item">
        <label className="usa-label">24-hour change</label>
        <span>{renderChange(total, grandTotals[dates[1]]?.Confirmed)}</span>
        {/* <Card header="48 hour Change">
          {renderChange(total, grandTotals[dates[2]].Confirmed)}
        </Card> */}
      </div>
    </div>
  );
};

export default USATotalsAlt;
