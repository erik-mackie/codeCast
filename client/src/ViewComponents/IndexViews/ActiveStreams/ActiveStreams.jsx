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
import Stream from '../../../StreamComponents/StreamIndex.jsx';


class ActiveStreams extends Component {  

  componentDidMount() {
    console.log("Spaghetti");
    this.props.fetchActiveStreams();
  }

  GetStreamId = (streamClicked) => {
    console.log(streamClicked);
  }

  MakeActiveStreamCard = (props) => {
    const { title, user, description, streamID, languageImage } = props;
    // missing image path
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
      <Link className="link-container" to={`/active/${streamID}`}>
        <div className="stream-card active-archived" key={ streamID } onClick={ () => this.GetStreamId(streamID) }>
          <div className="stream-banner">
            <div className="title-container">
              <div className="title">
                <h3>{ title }</h3>
                <h5>{ user }</h5>
              </div>
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
    const renderStreams = this.props.activeStreams
      .reverse()
      .map( (stream) => {
        return this.MakeActiveStreamCard(stream);  
    });

    return (
      <div className="stream-container">
        <h1 className="index-header">Streaming Now</h1>
        <main className="streams">
          { renderStreams }
        </main>
      </div>
      
    );
  }

}

const mapStateToProps = (state) => {
  return {
    activeStreams: state.streams.activeStreams
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchActiveStreams: () => dispatch(streamsActions.fetchActiveStreams())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ActiveStreams));