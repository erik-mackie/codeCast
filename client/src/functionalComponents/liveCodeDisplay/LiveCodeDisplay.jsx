import React from 'react';  
import {connect} from 'react-redux';  
import {bindActionCreators} from 'redux';

//code mirror
import Codemirror from 'react-codemirror';  

// syntax highlighting
import 'codemirror/mode/javascript/javascript.js' 

// add ons 
import 'codemirror/addon/selection/active-line.js';
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/edit/closetag.js';
// import 'codemirror/addon/edit/matchtags.js';

//themes
import "codemirror/lib/codemirror.css"; 
import "codemirror/theme/dracula.css";  
import "codemirror/theme/3024-day.css";
import "codemirror/theme/3024-night.css";
import "codemirror/theme/abcdef.css";
import "codemirror/theme/ambiance.css";
import "codemirror/theme/base16-dark.css";
import "codemirror/theme/bespin.css";
import "codemirror/theme/base16-light.css";
import "codemirror/theme/blackboard.css";
import "codemirror/theme/cobalt.css";
import "codemirror/theme/colorforth.css";
import "codemirror/theme/dracula.css";
import "codemirror/theme/duotone-dark.css";
import "codemirror/theme/duotone-light.css";
import "codemirror/theme/eclipse.css";
import "codemirror/theme/elegant.css";
import "codemirror/theme/erlang-dark.css";
import "codemirror/theme/gruvbox-dark.css";
import "codemirror/theme/hopscotch.css";
import "codemirror/theme/icecoder.css";
import "codemirror/theme/isotope.css";
import "codemirror/theme/lesser-dark.css";
import "codemirror/theme/liquibyte.css";
import "codemirror/theme/lucario.css";
import "codemirror/theme/material.css";
import "codemirror/theme/mbo.css";
import "codemirror/theme/mdn-like.css";
import "codemirror/theme/midnight.css";
import "codemirror/theme/monokai.css";
import "codemirror/theme/neat.css";
import "codemirror/theme/neo.css";
import "codemirror/theme/night.css";
import "codemirror/theme/oceanic-next.css";
import "codemirror/theme/panda-syntax.css";
import "codemirror/theme/paraiso-dark.css";
import "codemirror/theme/paraiso-light.css";
import "codemirror/theme/pastel-on-dark.css";
import "codemirror/theme/railscasts.css";
import "codemirror/theme/rubyblue.css";
import "codemirror/theme/seti.css";
import "codemirror/theme/shadowfox.css";
import "codemirror/theme/solarized.css";
import "codemirror/theme/the-matrix.css";
import "codemirror/theme/tomorrow-night-bright.css";
import "codemirror/theme/tomorrow-night-eighties.css";
import "codemirror/theme/ttcn.css";
import "codemirror/theme/twilight.css";
import "codemirror/theme/vibrant-ink.css";
import "codemirror/theme/xq-dark.css";
import "codemirror/theme/xq-light.css";
import "codemirror/theme/yeti.css";
import "codemirror/theme/idea.css";
import "codemirror/theme/darcula.css";
import "codemirror/theme/zenburn.css";



class LiveCodeDisplay extends React.Component {  

  constructor(props) {  
    super(props)  
    this.state = {
      theme: 'dracula'
    } 
  }  

  // // componentDidMount() {
  // // }

  // updateThemeInState(newText) {  
  //   this.setState({code: newText}) 
  // }  

  changeDisplayTheme = evt => {
    // typeof evt.target.value
    this.setState({theme: evt.target.value})
  }

  render() {  

    // codemirror options
    const options = {
       lineNumbers: true,
       styleActiveLine: true,
       matchBrackets: true,
       mode: 'javascript', // reference options in folder
       theme: this.state.theme
      //  readOnly: 'nocursor'    //remove for read only, obviously.... -_-
    }

    return (
      <div>
        <h1>Lookit this shit bruh</h1>
        <Codemirror 
          value={
            'const stuff = [1,2,3,4];',
            'var test = function() {a + b};'
          }

          // value={this.state.code}      //renders text given
          // onChange={this.updateCodeInState.bind(this)}    //remove for read only
          options={options} />

        <p>Select a theme: <select defaultValue='dracula' onChange={this.changeDisplayTheme} id='select'>
          <option>3024-day</option>
          <option>3024-night</option>
          <option>abcdef</option>
          <option>ambiance</option>
          <option>base16-dark</option>
          <option>base16-light</option>
          <option>bespin</option>
          <option>blackboard</option>
          <option>cobalt</option>
          <option>colorforth</option>
          <option>darcula</option>
          <option>dracula</option>
          <option>duotone-dark</option>
          <option>duotone-light</option>
          <option>eclipse</option>
          <option>elegant</option>
          <option>erlang-dark</option>
          <option>gruvbox-dark</option>
          <option>hopscotch</option>
          <option>icecoder</option>
          <option>idea</option>
          <option>isotope</option>
          <option>lesser-dark</option>
          <option>liquibyte</option>
          <option>lucario</option>
          <option>material</option>
          <option>mbo</option>
          <option>mdn-like</option>
          <option>midnight</option>
          <option>monokai</option>
          <option>neat</option>
          <option>neo</option>
          <option>night</option>
          <option>oceanic-next</option>
          <option>panda-syntax</option>
          <option>paraiso-dark</option>
          <option>paraiso-light</option>
          <option>pastel-on-dark</option>
          <option>railscasts</option>
          <option>rubyblue</option>
          <option>seti</option>
          <option>shadowfox</option>
          <option>solarized dark</option>
          <option>solarized light</option>
          <option>the-matrix</option>
          <option>tomorrow-night-bright</option>
          <option>tomorrow-night-eighties</option>
          <option>ttcn</option>
          <option>twilight</option>
          <option>vibrant-ink</option>
          <option>xq-dark</option>
          <option>xq-light</option>
          <option>yeti</option>
          <option>zenburn</option>
      </select>
      </p>
      </div>
     )
  }
}




export default LiveCodeDisplay;