import React, { Component } from 'react';  
import { connect } from 'react-redux';
import rubyImg from '../../../images/ruby.png';
import phpImg from '../../../images/php.png';
import pythonImg from '../../../images/python.png';
import javascriptImg from '../../../images/javascript.png';
import csharpImg from '../../../images/csharp.png';
import htmlcssImg from '../../../images/htmlcss.png';
import { streamsActions } from '../../../redux/_actions';
import { Link, withRouter } from 'react-router-dom';

class ScheduledStreams extends Component {

  componentDidMount() {
    this.props.fetchScheduledStreams();
  }


  MakeStreamCard = (props) => {
    const { title, user, description, scheduledDate, languageImage, streamID } = props;

    let image
    if (languageImage === 'javascript') {
      image = javascriptImg
    }
    if (languageImage === 'ruby') {
      image = rubyImg
    }
    if (languageImage === 'csshtml') {
      image = htmlcssImg
    }
    if (languageImage === 'csharp') {
      image = csharpImg
    }
    if (languageImage === 'python') {
      image = pythonImg
    }
    if (languageImage === 'php') {
      image = phpImg
    }

    return (
      <Link className="link-container" to={`/scheduled`}>
        <div className="stream-card scheduled" key={(Math.random()*10).toString().slice(2,6)}>
          <div className="stream-banner">
            <div className="scheduled-title-container">
              <div className="title">
                <h3>{ title }</h3>
                <h5>{ user }</h5>
              </div>
              <p className="date-time">
                { scheduledDate }
              </p>
            </div>
          </div>
          <div className="card-content">
            <p className="scheduled-description">
              { description }
            </p>
          </div>
          <img className="card-img" src={ image } />
        </div>
      </Link>
    )
  }

  render() {
    
    const renderStreams = this.props.scheduledStreams
      .map((stream) => this.MakeStreamCard(stream));

    return (
      <div className="stream-container">
        <h1 className="index-header">Upcoming Streams</h1>
        <main className="streams">
          { renderStreams }
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    scheduledStreams: state.streams.scheduledStreams
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchScheduledStreams: () => dispatch(streamsActions.fetchScheduledStreams())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ScheduledStreams));