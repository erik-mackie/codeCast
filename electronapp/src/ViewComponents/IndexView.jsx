import React, { Fragment } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import ElectronDashboard from '../ElectronDashboard/ElectronDashboard.jsx';
import LiveStreamNow from '../ElectronDashboard/LiveStreamNow.jsx';
import ScheduleNewStream from '../ElectronDashboard/ScheduleNewStream.jsx';
import StartScheduled from '../ElectronDashboard/StartScheduled.jsx';
import Nav from './Nav.jsx';

// import { EPROTO } from 'constants';

function ReactRouter() {
  return (
    <div className="electron-container">
      <div className="nav-container">
        <Route path={["/", "/LiveStreamNow", "/ScheduledNewStream", "/StartScheduled"]} component={ Nav } />
      </div>
      <div className="view-container">
        <Switch>
          <Route exact path="/" component={ ElectronDashboard } />
          <Route path="/LiveStreamNow" component={ LiveStreamNow } />
          <Route path="/ScheduleNewStream" component={ ScheduleNewStream } />
          <Route path="/StartScheduled" component={ StartScheduled } />
        </Switch>
      </div>
    </div>
  );
};

export default withRouter(ReactRouter);