import React, { useContext, useState, useEffect } from "react";
import Card from "./Card/Card";
import { AppContext, State, CovidStats } from "../app/AppStore";
import { getPreviousDate } from "../utils/DateUtils";

interface Stats {
  c: number;
  d: number;
}

const USATotal: React.FunctionComponent<{}> = props => {
  const {
    state: { covidTimeSeries, selection : {date, state, county} }
  } = useContext(AppContext);
  const [confirmed, setConfirmed] = useState<number>(0);
  const [dead, setDead] = useState<number>(0);
  const [previousConfirmed, setPreviousConfirmed] = useState<number>(0);
  const [previousDead, setPreviousDead] = useState<number>(0);

  useEffect(() => {
    let currentStats: Stats;
    let previousStats: Stats;
    const previousDate = getPreviousDate(date);
    if (county !== undefined) {
      currentStats = {
        c: covidTimeSeries[date].counties[county].Confirmed,
        d: covidTimeSeries[date].counties[county].Dead,
      };
      previousStats = {
        c: covidTimeSeries[previousDate].counties[county].Confirmed,
        d: covidTimeSeries[previousDate].counties[county].Dead,
      }
    } else if (state !== undefined) {
      console.log(state)
      console.log(covidTimeSeries[date].states)
      const CountyIDs = covidTimeSeries[date].states[state].CountyIDs;
      if (CountyIDs !== undefined) {
        const counties = CountyIDs.map((id: string) => covidTimeSeries[date].counties[id])
        const previousCounties = CountyIDs.map((id: string) => covidTimeSeries[previousDate].counties[id])
        currentStats = countCases(counties);
        previousStats = countCases(previousCounties);
      } else {
        throw Error("CountyIDs not defiened")
      }
    } else {
      currentStats = countCases(Object.values(covidTimeSeries[date].states));
      previousStats = countCases(Object.values(covidTimeSeries[previousDate].states));
    }
    setConfirmed(currentStats.c);
    setDead(currentStats.d);
    setPreviousConfirmed(previousStats.c);
    setPreviousDead(previousStats.d);
  }, [covidTimeSeries, date, state, county]);

  const countCases = (data: CovidStats[]): Stats => {
    let c = 0;
    let d = 0;
    data.forEach((stats: CovidStats) => {
      c += stats.Confirmed;
      d += stats.Dead;
    });
    return { c, d};
  }

  const renderChange = (current: number, previous: number): string => {
    const change = current - previous;
    return `${change >= 0 ? "+" : "-"}${change}`
  };

  return (
    <div style={{ display: "flex", textAlign: "center" }}>
      <Card header="Confirmed">{confirmed} ({renderChange(confirmed, previousConfirmed)})</Card>
      <Card header="Dead">{dead} ({renderChange(dead, previousDead)})</Card>
    </div>
  );
};

export default USATotal;