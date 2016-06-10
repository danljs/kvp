import React from 'react'
import model from './model'

class body extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      model : model,
      kv_array : [],
      toggle_list: true
    }
  }

  componentDidMount(){
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      kv_array : [...this.state.kv_array, nextProps.kv],
      model : model
    })
  }
  render(){
    var me = this;
    return (
      <div className='row body'>
        <div className='row label'>Key/Value Pair List</div>
        <div className='row'>
          <div className='left-area'>
            <div hidden={!me.state.toggle_list}>
              <select className='kv-list' multiple={true} size='10' onChange={function(e){
                var options = e.target.options
                var selected = []
                for(var i = 0 ; i < options.length ; i++){
                  options[i].selected ? selected.push(i + '') : ''
                }
                model.set_selected(selected);
              }}>
              {
                me.state.model.get_data().map(function(c,i){
                  return <option key={i} value={i}>{c.key + '=' + c.value}</option>
                })
              }
              </select>
            </div>
            <div hidden={me.state.toggle_list}>
              <textarea readOnly className='kv-xml' defaultValue={me.state.model.xml()}></textarea>
            </div>
          </div>
          <div className='right-area'>
            <div className='row'><button className='order-value-button' onClick={function(e){
              var model = me.state.model;
              model.sort_value();
              me.setState({model:model});
            }}>OrderByValue</button></div>
            <div className='row'><button className='order-key-button' onClick={function(e){
              var model = me.state.model;
              model.sort_key();
              me.setState({model:model});
            }}>OrderByKey</button></div>
            <div className='row'><button className='delete-button' onClick={function(e){
              var model = me.state.model;
              model.remove();
              me.setState({model:model});
            }}>Delete</button></div>
            <div className='row' hidden={!me.state.toggle_list}><button className='show-xml' onClick={function(e){
              me.setState({toggle_list : false})
            }}>ShowXML</button></div>
            <div className='row' hidden={me.state.toggle_list}><button className='show-list' onClick={function(e){
              me.setState({toggle_list : true})
            }}>ShowList</button></div>
            <div className='row'><button className='load-json' onClick={function(e){
              new Promise(function(resolve, reject){
                var x = document.createElement('INPUT');
                  x.setAttribute('type', 'file');
                  document.body.appendChild(x);
                  x.style = 'visibility:hidden';
                  x.addEventListener('change', resolve);
                  x.click();
                  document.body.removeChild(x);
              })
              .then(
                function (e){
                  return new Promise(function(resolve, reject){
                    var file = e.target.files[0];
                    if(!file){return;}
                    var reader = new FileReader();
                    reader.onload = resolve;
                    reader.readAsText(file);
                  });
                },
                function(){
                  console.log('Something wrong...');
                }
              )
              .then(
                function (e){
                  var model = me.state.model;
                  model.add_array(JSON.parse(e.target.result));
                  me.setState({model:model});
                },
                function(){
                  console.log('Something wrong...');
                }
              );
            }}>LoadData</button></div>
            <div className='row'><button className='save-json' onClick={function(e){
              var x = document.createElement('a');    
              x.href = 'data:text/json;charset=utf-8,' + JSON.stringify(me.state.model.get_data());
              x.style = 'visibility:hidden';
              x.download = 'kv.json';
              document.body.appendChild(x);
              x.click();
              document.body.removeChild(x);
            }}>SaveData</button></div>
          </div>
        </div>
      </div>
    )
  }
}
export default body
