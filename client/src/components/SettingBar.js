import React from 'react';
import '../styles-scss/settingbar.scss';
import toolState from "../store-mobx/toolState";

const SettingBar = () => {
  return (
    <div className={"settingbar"}>
      <label className={"settingbar__label"} htmlFor={"settingbar__lineW"}>Толщина линии</label>
      <input
        onChange={e => toolState.setLineWidth(e.target.value)}
        type={"number"}
        id={"settingbar__lineW"}
        className={"settingbar__lineW"}
        min={1}
        max={50}
        defaultValue={1}
      />

      <label className={"settingbar__label"} htmlFor={"settingbar__color"}>Цвет линии</label>
      <input
        onChange={e => toolState.setStrokeColor(e.target.value)}
        type={"color"}
        id={"settingbar__color"}
        className={"settingbar__color"}
        defaultValue={"black"}
      />
    </div>
  );
};

export default SettingBar;
