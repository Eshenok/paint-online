import React from 'react';
import "./styles-scss/app.scss";
import ToolBar from "./components/ToolBar/ToolBar";
import SettingBar from "./components/SettingBar";
import Canvas from "./components/Canvas/components/Canvas";
import { Switch, Route, Redirect } from 'react-router-dom';

const App = () => {
  return (
    <div className={"app"}>
      <Switch>
        <Route path='/:id'>
          <ToolBar />
          <SettingBar />
          <Canvas />
        </Route>
        <Redirect to={`f${(+new Date).toString(16)}`}/>
      </Switch>
    </div>
  );
};

export default App;
