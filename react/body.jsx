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
  componentWillReceiveProps(nextProps){
    this.setState({kv_array : [...this.state.kv_array, nextProps.kv]})
  }
  render(){
    var me = this;
    return (
      <div className='row body'>
        <div className='row label'>Key/Value Pair List</div>
        <div className='row'>
          <div className='left-area'>
            <select className='kv-list' multiple size='10'>
            {
              me.state.kv_array.map(function(c,i){
                return <option key={i} value={i}>{c.key + '=' + c.value}</option>
              })
            }
            </select>
            <textarea readOnly className='kv-xml'></textarea>
          </div>
          <div className='right-area'>
            <div className='row'><button className='order-value-button'>OrderByValue</button></div>
            <div className='row'><button className='order-key-button'>OrderByKey</button></div>
            <div className='row'><button className='delete-button'>Delete</button></div>
            <div className='row'><button className='show-xml'>ShowXML</button></div>
            <div className='row'><button className='show-list'>ShowList</button></div>
            <div className='row'><button className='load-json'>LoadData</button></div>
            <div className='row'><button className='save-json'>SaveData</button></div>
          </div>
        </div>
      </div>
    )
  }
}
export default body
