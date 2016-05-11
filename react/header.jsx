import React from 'react';

class header extends React.Component{
  constructor(props) {
    super(props)
    this.state={
      message: '',
      kv_input: '',

    }
  }

  componentDidMount(){
  }

  render(){
    var me = this
    return (
      <div className='row header'>
        <div className='label'>Key/Value Pair</div>
        <div className='row'>
        <div className='left-area'>
          <input id='kv-input' type='text' ref='kv_input'
          onKeyPress={
            function(e){

            } 
          }
          /></div>
        <div className='right-area'>
          <button id='add-button'
            onClick={function(e){
              me.setState({message : ''})
              var kv = e.target.value;
              var patt0 = /\w+\s*=\s*\w+/g;
              var patt1 = /(^[a-zA-Z0-9\s*]*$)/g;
              if(patt0.test(kv) && patt1.test(kv.replace('=', ''))){
                kv = kv.split('=');
                kv[0] = kv[0].trim();
                kv[1] = kv[1].trim();
                me.props.add(kv[0], kv[1]);
              }else{
                me.setState({message : 'Invalid key/value pair'});
              }
            }}
          >Add</button></div>
        </div>
        <div className='row' id='message'>{me.state.message}</div>
      </div>
    )
  }
}
export default header
