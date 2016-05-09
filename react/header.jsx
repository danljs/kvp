import React from 'react';

class header extends React.Component{
  constructor(props) {
    super(props)
  }

  componentDidMount(){
  }

  render(){
    return (
      <div className='row header'>
        <div className='label'>Key/Value Pair</div>
        <div className='row'>
        <div className='left-area'><input id='kv-input' type='text'/></div>
        <div className='right-area'><button id='add-button'>Add</button></div>
        </div>
        <div className='row' id='message'></div>
      </div>
    )
  }
}
export default header
