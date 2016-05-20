import React from 'react';
import Header from './header'
import Body from './body'
class all extends React.Component{
  constructor(props) {
    super(props)
    this.state={
      new_kv : {}
    }
  }

  componentDidMount(){
  }

  render(){
    var me = this;
    return (
      <div className="all">
        <Header add={function(key, value){
          me.setState({new_kv : {key : key,value : value}});
        }}/>
        <hr/>
        <Body kv={me.state.new_kv}/>
      </div>
    )
  }
}
export default all
