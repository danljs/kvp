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
var V = function(){
	this._model = new M();
	$("kv-input").addEventListener("keypress", this.on_keypress.bind(this));
	$("add-button").addEventListener("click", this.on_click_add.bind(this));
	$("order-value-button").addEventListener("click", this.on_click_order_value.bind(this,true));
	$("order-key-button").addEventListener("click", this.on_click_order_key.bind(this,false));
	$("delete-button").addEventListener("click", this.on_click_delete.bind(this));
	$("show-xml").addEventListener("click", this.on_click_show_xml.bind(this,true));
	$("show-list").addEventListener("click", this.on_click_show_list.bind(this,false));
	$("kv-list").addEventListener("change", this.on_click_kv_list.bind(this));
	$("load-json").addEventListener("click", this.on_click_load_json.bind(this));
	$("save-json").addEventListener("click", this.on_click_save_json.bind(this));
}
V.prototype.add = function (key,value) {
	$("kv-list").options.add(new Option(key + '=' + value,key)) ;
	$("kv-input").value = "" ;
}

V.prototype.reload_kv = function (arr) {
	var kv_list = $("kv-list") ;
	while (kv_list.options.length > 0) {kv_list.remove(0)}
	arr.map(function(c){kv_list.options.add(new Option(c.key + '=' + c.value,c.key))}) ;
}

V.prototype.show_list=function(status){
	$("kv-xml").style.display = status?"none":"block" ;
	$("kv-list").style.display = status?"block":"none" ;
	$("show-xml").style.display = status?"block":"none" ;
	$("show-list").style.display = status?"none":"block" ;
}

V.prototype.on_keypress=function(e){
	e.keyCode === 13?this.on_click_add():"";
}

V.prototype.on_click_add=function(e){
	$("message").innerHTML="";
	var kv = $("kv-input").value;

	var patt0 = /\w+\s*=\s*\w+/g;
	var patt1 = /(^[a-zA-Z0-9\s*]*$)/g;
	if(patt0.test(kv) && patt1.test(kv.replace('=',''))){
		kv = kv.split('=');
		kv[0] = kv[0].trim();
		kv[1] = kv[1].trim();
		this.add(kv[0],kv[1]);
		this._model.add(kv[0],kv[1]);
	}else{
		$("message").innerHTML="Invalid key/value pair";
	}
}
V.prototype.on_click_order_value=function(e){
	this.reload_kv(this._model.sort_value())
}
V.prototype.on_click_order_key=function(e){
	this.reload_kv(this._model.sort_key())
}
V.prototype.on_click_delete=function(e){
	this._model.remove()
	var kv_list = $("kv-list");
    for(var i= kv_list.options.length-1; i >= 0; i--) {
        kv_list.options[i].selected?kv_list.remove(i):"" ;
    }
}
V.prototype.on_click_show_xml=function(e){
	$("kv-xml").value=this._model.xml();
	this.show_list(false)
}
V.prototype.on_click_show_list=function(e){
	this.show_list(true)
}
V.prototype.on_click_kv_list=function(e){
	this._model.set_selected(e.srcElement.selectedIndex)
}

V.prototype.on_click_load_json=function(e){
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
				me.add(e.key,e.value);
				me._model.add(e.key,e.value);
			});
		},
		function(){
			console.log('Something wrong...');
		}
	)
}
V.prototype.on_click_save_json=function(e){
    var x = document.createElement("a");    
    x.href = 'data:text/json;charset=utf-8,' + JSON.stringify(this._model.data());
    x.style = "visibility:hidden";
    x.download = "kv.json";
    document.body.appendChild(x);
    x.click();
    document.body.removeChild(x);
}
//================================================================
window.onload = new V();