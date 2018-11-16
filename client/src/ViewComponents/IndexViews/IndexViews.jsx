import React from 'react';
import { Route, Switch, withRouter } from "react-router-dom";

import ActiveStreams from './ActiveStreams/ActiveStreams.jsx';
import ScheduledStreams from './ScheduledStreams/ScheduledStreams.jsx';
import ArchivedStreams from './ArchivedStreams/ArchivedStreams.jsx';
import IndexHeader from './IndexHeader.jsx';
import Stream from '../../StreamComponents/StreamIndex.jsx';
import Nav from '../Nav.jsx';

function IndexViews (){

	return (
		<div className="pageGrid">
			<div className="header-container">
				<div className="nav-container">
					<Route exact path={["/", "/active", "/scheduled", "/archived"]} component={ Nav } className="app-nav" />
				</div>
				<div className="index-container">
					<Route exact path={["/", "/active", "/scheduled", "/archived"]} component={ IndexHeader } />
				</div>
			</div>
			<div className="stream-views">
				<Switch>
					<Route exact path="/" render={() => (
						<div className="welcome-message">
							<h1>Welcome to CodeCast!</h1>
							<p>CodeCast is a platform for streaming live videos and tutorials to anyone, anywhere.</p>
							<p>Stream video, terminal output and your project directory, allowing you to reach and teach your viewers like never before!</p>
							<p>Choose one of the links in the top nav to check out upcoming, past and active streams!</p>
						</div>
					)} />
					<Route exact path="/active" component={ ActiveStreams } className="index-view active" />
          <Route exact path="/scheduled" component={ ScheduledStreams } className="index-view scheduled" />
          <Route exact path="/archived" component={ ArchivedStreams } className="index-view archived" />
					<Route path="/archived/:id" component={ Stream } />
          <Route path="/active/:id" component={ Stream } />
				</Switch>
			</div>
		</div>
	)
}

export default withRouter(IndexViews);