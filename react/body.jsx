import React from 'react';

class body extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      kv_array : [], 
      selected : -1
    }
  }

  componentDidMount(){
  }

  render(){
    return (
      <div className='row body'>
        <div className='row label'>Key/Value Pair List</div>
        <div className='row'>
          <div className='left-area'>
            <select id='kv-list' size='10'></select>
            <textarea readOnly id='kv-xml'></textarea>
          </div>
          <div className='right-area'>
            <div className='row'><button id='order-value-button'>OrderByValue</button></div>
            <div className='row'><button id='order-key-button'>OrderByKey</button></div>
            <div className='row'><button id='delete-button'>Delete</button></div>
            <div className='row'><button id='show-xml'>ShowXML</button></div>
            <div className='row'><button id='show-list'>ShowList</button></div>
            <div className='row'><button id='load-json'>LoadData</button></div>
            <div className='row'><button id='save-json'>SaveData</button></div>
          </div>
        </div>
      </div>
    )
  }
}
export default body
