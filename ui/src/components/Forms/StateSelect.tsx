import React, { useContext } from "react";
import { ActionType, AppContext, State } from "../../app/AppStore";
import UsaSelect from "../Forms/USASelect";

interface Option {
  text: string;
  value: string | undefined;
}

const DEFAULT_TEXT = "All States";
const USATotal: React.FunctionComponent<{}> = props => {
  const { dispatch, state } = useContext(AppContext);

  const options: Option[] = [
    {
      text: DEFAULT_TEXT,
      value: undefined
    }
  ];

  const stateMap: { [ID: string]: Option } = {};
  state.covidTimeSeries.states.forEach(s => {
    stateMap[s.ID] = {
      text: s.State,
      value: s.ID
    };
  });
  Object.values(stateMap).forEach((o: Option) => options.push(o));

  const onUpdate = (stateID: string | undefined) => {
    dispatch({ type: ActionType.UPDATE_SELECTED_STATE, payload: stateID });
    dispatch({ type: ActionType.UPDATE_SELECTED_COUNTY, payload: undefined });
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <UsaSelect
        options={options}
        placeholder={DEFAULT_TEXT}
        name="stateSelect"
        selected={state.selection.state}
        onChange={onUpdate}
        label="State: "
      />
    </div>
  );
};

export default USATotal;
