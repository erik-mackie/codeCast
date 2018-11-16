import React from 'react';
import { Tree } from 'antd';
import { connect } from 'react-redux';
import { fileActions } from '../../redux/_actions';

const TreeNode = Tree.TreeNode;

class FileDirectory extends React.Component {

  constructor() {
    super();
    this.state = {
      fileDir: {key: 'whoops'}
    };
  }


  //tree click handler
  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
    // if treeNode is a leaf, handle call render function
    if (info.node.isLeaf() === true) {

      console.log(selectedKeys[selectedKeys.length - 1]);
      this.props.sendFileID(selectedKeys[selectedKeys.length - 1]);
      // need script to disable click event on currently active file
    }
  }
  // take in file object and create nested Tree nodes
  buildTree = (treeFrom) => {
   
    let result = [];
    const fileDir = treeFrom;
    // for each item in the file state, build node based of if object or string
    for (let file in fileDir) {
      if (fileDir[file].fileIDs !== undefined) { //is file
        result.push(<TreeNode 
          title={ fileDir[file].fileNames[fileDir[file].fileNames.length - 1] } 
          key={ fileDir[file].fileIDs[fileDir[file].fileIDs.length - 1] } 
        />)

      } else { // is directory TODO handle edge cases
        result.push(<TreeNode title={ file } key={ file + ((Math.random()*10).toString().slice(2,6)) }>
          { this.buildTree(fileDir[file]) }
        </TreeNode>)
      }
    }
    return result;
  }
  
  render() {
    const fileDir = this.props.fileDir;
    return (
      <Tree
        showLine
        // defaultExpandedKeys={[0-0-0']}
        onSelect={this.onSelect}
      >
        {this.buildTree(fileDir)}
      </Tree>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    fileDir: state.directory.directoryStructure
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendFileID: (fileID) => dispatch(fileActions.updateFile(fileID))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FileDirectory);


