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

  add(){
    this.setState({message : ''})
    var kv = this.refs.kv_input.value;
    var patt0 = /\w+\s*=\s*\w+/g;
    var patt1 = /(^[a-zA-Z0-9\s*]*$)/g;
    if(patt0.test(kv) && patt1.test(kv.replace('=', ''))){
      kv = kv.split('=');
      kv[0] = kv[0].trim();
      kv[1] = kv[1].trim();
      this.props.add(kv[0], kv[1]);
    }else{
      this.setState({message : 'Invalid key/value pair'});
    }
  };

  render(){
    var me = this
    return (
      <div className='row header'>
        <div className='label'>Key/Value Pair</div>
        <div className='row'>
        <div className='left-area'>
          <input className='kv-input' type='text' ref='kv_input'
            onKeyPress={function(e){e.charCode === 13 ? me.add() : '';}}
          /></div>
        <div className='right-area'>
          <button className='add-button'
            onClick={function(e){me.add()}}
          >Add</button></div>
        </div>
        <div className='row message'>{me.state.message}</div>
      </div>
    )
  }
}
export default header
