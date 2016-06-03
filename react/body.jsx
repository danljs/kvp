import React from 'react';
import model form './model'

class body extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      kv_array : [], 
      selected : []
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
            <select className='kv-list' multiple={true} size='10' onChange={function(e){
              var options = e.target.options
              var selected = []
              for(var i = 0 ; i < options.length ; i++){
                options[i].selected ? selected.push(i) : ''
              }
              me.setState({selected: selected})
            }}>
            {
              me.state.kv_array.map(function(c,i){
                return <option key={i} value={i}>{c.key + '=' + c.value}</option>
              })
            }
            </select>
            <textarea readOnly className='kv-xml'></textarea>
          </div>
          <div className='right-area'>
            <div className='row'><button className='order-value-button' onClick={function(e){
              
            }}>OrderByValue</button></div>
            <div className='row'><button className='order-key-button' onClick={function(e){

            }}>OrderByKey</button></div>
            <div className='row'><button className='delete-button' onClick={function(e){

            }}>Delete</button></div>
            <div className='row'><button className='show-xml' onClick={function(e){

            }}>ShowXML</button></div>
            <div className='row'><button className='show-list' onClick={function(e){

            }}>ShowList</button></div>
            <div className='row'><button className='load-json' onClick={function(e){

            }}>LoadData</button></div>
            <div className='row'><button className='save-json' onClick={function(e){

            }}>SaveData</button></div>
          </div>
        </div>
      </div>
    )
  }
}
export default body
