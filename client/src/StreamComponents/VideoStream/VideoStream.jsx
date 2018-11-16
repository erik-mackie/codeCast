import React, { Component } from 'react';

class Video extends Component {
  render() {
    return (
      <div className='video-main'>
        <iframe className='iframe' src="https://www.youtube.com/embed/KY2kM3Tzg-w" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
      </div>
    );
  };
}

export default Video;
