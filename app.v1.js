//reference to: 
//http://stackoverflow.com/questions/8497833/hello-world-in-mvc-pattern
//
//var M = {}, V = {}, C = {};
//M.data = "hello world";
//V.render = function (M) { alert(M.data); }
//C.handleOnload = function () { V.render(M); }
//window.onload = C.handleOnLoad;
//
// And http://jsfiddle.net/alex_netkachov/ZgBrK/
//
//================================================================
var M = function(){
	this.kv_array = [];
	this.selected = -1;
}
M.prototype.add = function(key,value){
	this.kv_array.push({key:key,value:value});
}
M.prototype.set_selected = function(index){
	this.selected = index ;
}
M.prototype.remove = function(){
    this.selected !== -1?this.kv_array.splice(this.selected, 1):"";
    this.selected = -1
}
M.prototype.sort_key = function(){
	this.kv_array.sort(function(a, b){
	    var aa = a.key, bb = b.key;
	    return aa < bb ? -1 : (aa > bb ? 1 : 0);
	});
	return this.kv_array;
}
M.prototype.sort_value = function(){
	this.kv_array.sort(function(a, b){
	    var aa = a.value, bb = b.value;
	    return aa < bb ? -1 : (aa > bb ? 1 : 0);
	});
	return this.kv_array;
}
M.prototype.xml = function(){
	var kv_xml = "<!DOCTYPE html>\n"
	kv_xml += "<html>\n<body>\n"

	kv_xml += "<select id='kv-list' size='10'>\n"
	this.kv_array.map(function(c,i){
		kv_xml += "<option value='" + c.key + "'" ;
    	kv_xml += this.selected === i ? " selected":"" ;
        kv_xml += ">" + c.key+ '=' + c.value + "</option>\n";
	})
    kv_xml += "</select>" ;
    kv_xml += "\n</body>\n</html>\n" ;
    return kv_xml;
}
M.prototype.data = function(){
	return this.kv_array;
}
//================================================================
function $(id){return document.getElementById(id)}
var V = function(model){
	this._model = model;
}
V.prototype.add = function (key,value) {
	$("kv-list").options.add(new Option(key + '=' + value,key)) ;
	$("kv-input").value = "" ;
}
V.prototype.remove_kv = function () {
	var kv_list = $("kv-list");
    for(var i= kv_list.options.length-1; i >= 0; i--) {
        kv_list.options[i].selected?kv_list.remove(i):"" ;
    }
}
V.prototype.reload_kv = function (arr) {
	var kv_list = $("kv-list") ;
	while (kv_list.options.length > 0) {kv_list.remove(0)}
	arr.map(function(c){kv_list.options.add(new Option(c.key + '=' + c.value,c.key))}) ;
}
V.prototype.addListener = function(listeners){
	listeners.map(function(c){
		$(c.id).addEventListener(c.event,c.listener);
	})
}
V.prototype.get_new_kv=function(){
	$("message").innerHTML="";
	return $("kv-input").value;
}
V.prototype.set_error=function(){
	$("message").innerHTML="Invalid key/value pair";
}
V.prototype.show_list=function(status){
	$("kv-xml").style.display = status?"none":"block" ;
	$("kv-list").style.display = status?"block":"none" ;
	$("show-xml").style.display = status?"block":"none" ;
	$("show-list").style.display = status?"none":"block" ;
}
V.prototype.set_xml=function(kv_xml){
	$("kv-xml").value=kv_xml;
}
//================================================================
var C = function(){
	var _model = new M();
    var _view = new V(_model);
	var me = this;

    _view.addListener([
    	{id:"kv-input", event:"keypress", listener:on_keypress},
    	{id:"add-button", event:"click", listener:on_click_add},
    	{id:"order-value-button", event:"click", listener:on_click_order_value},
    	{id:"order-key-button", event:"click", listener:on_click_order_key},
    	{id:"delete-button", event:"click", listener:on_click_delete},
    	{id:"show-xml" ,event:"click", listener:on_click_show_xml},
    	{id:"show-list" ,event:"click", listener:on_click_show_list},
    	{id:"kv-list" ,event:"change", listener:on_click_kv_list},
    	{id:"load-json" ,event:"click", listener:me.on_click_load_json.bind(me)},
    	{id:"save-json" ,event:"click", listener:me.on_click_save_json.bind(me)}
    ]);

    function on_keypress(e){
		e.keyCode === 13?on_click_add():"";
	}

	function on_click_add(e){
		var kv = _view.get_new_kv();
		load_kv(kv);
	}
	function on_click_order_value(e){
		_view.reload_kv(_model.sort_value())
	}
	function on_click_order_key(e){
		_view.reload_kv(_model.sort_key())
	}
	function on_click_delete(e){
		_model.remove()
		_view.remove_kv();
	}
	function on_click_show_xml(e){
		_view.set_xml(_model.xml())
		_view.show_list(false)
	}
	function on_click_show_list(e){
		_view.show_list(true)
	}
	function on_click_kv_list(e){
		_model.set_selected(e.srcElement.selectedIndex)
	}
	function load_kv(kv){
		if(me.check(kv)){
			kv = kv.split('=');
			kv[0] = kv[0].trim();
			kv[1] = kv[1].trim();
			me.add_kv(kv[0], kv[1])
		}else{
			_view.set_error();
		}
	}

	this.add_kv=function(k,v){
		_view.add(k,v);
		_model.add(k,v);
	}
	this.get_model=function(){
		return _model;	
	} 
}
C.prototype.check=function(new_kv){
	var patt0 = /\w+\s*=\s*\w+/g;
	var patt1 = /(^[a-zA-Z0-9\s*]*$)/g;
	return patt0.test(new_kv) && patt1.test(new_kv.replace('=',''))
}
C.prototype.on_click_load_json=function(e){
	var me = this;
	new Promise(function(resolve, reject){
		var x = document.createElement("INPUT");
	    x.setAttribute("type", "file");
	    document.body.appendChild(x);
	    x.style = "visibility:hidden";
	    x.addEventListener('change',resolve);
	    x.click();
	    document.body.removeChild(x);
	})
	.then(
		function (e){
			return new Promise(function(resolve, reject){
		    	var file = e.target.files[0];
				if (!file) {return;}
				var reader = new FileReader();
				reader.onload = resolve;
				reader.readAsText(file);
			})
    	},
    	function(){
			console.log('Something wrong...');
		}
	)
	.then(
		function (e){
			JSON.parse(e.target.result).map(function(e,i){
				me.add_kv(e.key,e.value)
			});
		},
		function(){
			console.log('Something wrong...');
		}
	)
}
C.prototype.on_click_save_json = function(e){
    var x = document.createElement("a");    
    x.href = 'data:text/json;charset=utf-8,' + JSON.stringify(this.get_model().data());
    x.style = "visibility:hidden";
    x.download = "kv.json";
    document.body.appendChild(x);
    x.click();
    document.body.removeChild(x);
}
//================================================================
window.onload = function(){new C();};