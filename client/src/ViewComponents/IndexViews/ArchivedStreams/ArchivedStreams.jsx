import React, { Component } from 'react';  
import { connect } from 'react-redux';  
import rubyImg from '../../../images/ruby.png';
import phpImg from '../../../images/php.png';
import pythonImg from '../../../images/python.png';
import javascriptImg from '../../../images/javascript.png';
import csharpImg from '../../../images/csharp.png';
import htmlcssImg from '../../../images/htmlcss.png';
import { streamsActions } from '../../../redux/_actions';
import { Link, withRouter, Route } from 'react-router-dom';

class ArchivedStreams extends Component { 
  
  componentDidMount() {
    this.props.fetchArchivedStreams();
  }

  GetStreamId = (streamClicked) => {
    console.log(streamClicked);
  }

  MakeStreamCard = (props) => {
    const { title, user, description, scheduledDate, streamID, languageImage } = props;
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
      <Link className="link-container" to={`/archived/${streamID}`}> 
        <div className="stream-card active-archived" key={ streamID } onClick={ () => this.GetStreamId(streamID) }>
          <div className="stream-banner">
            <div className="title-container">
              <div className="title">
                <h3>{ title }</h3>
                <h5>{ user }</h5>
              </div>
              <p className="date-time">
                { scheduledDate }
              </p>
            </div>
            <img className="card-img" src={ image } />
          </div>
          <div className="description">
            { description }
          </div>
        </div>
      </Link>
    )
  }

  render() {  
    console.log(this.props.archivedStreams)
    
    const renderStreams = this.props.archivedStreams.map( (stream) => {
      return this.MakeStreamCard(stream);  
    });

    return (
      <div className="stream-container">
        <h1 className="index-header">Archived Streams</h1>
        <main className="streams">
          { renderStreams }
        </main>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    archivedStreams: state.streams.archivedStreams
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchArchivedStreams: () => dispatch(streamsActions.fetchArchivedStreams())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArchivedStreams));