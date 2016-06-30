var storage_firebase = (function (){
  var config = {
    apiKey: "AIzaSyDHuh3SVr5Bokp17PBVDd0vh1xWS3ZHJAI",
    authDomain: "my-firebase-test-80eb9.firebaseapp.com",
    databaseURL: "https://my-firebase-test-80eb9.firebaseio.com",
    storageBucket: "my-firebase-test-80eb9.appspot.com",
  };
  firebase.initializeApp(config);
  firebase.database().ref('/groups/techpioneers').once('value').then(function(snapshot){
    console.log(snapshot.val());
  });
}());

var storage = (function (){
  
}());

var model = (function(){
	var kv_array = [], selected = -1;
	return{
		add : function(key, value){
			kv_array.push({key : key,value : value});
		},
		set_selected : function(index){
			selected = index;
		},
		remove : function(){
		    selected !== -1 ? kv_array.splice(selected, 1) : '';
		    selected = -1;
		},
		sort_key : function(){
			kv_array.sort(function(a, b){
			    var aa = a.key, bb = b.key;
			    return aa < bb ? -1 : (aa > bb ? 1 : 0);
			});
			return kv_array;
		},
		sort_value : function(){
			kv_array.sort(function(a, b){
			    var aa = a.value, bb = b.value;
			    return aa < bb ? -1 : (aa > bb ? 1 : 0);
			});
			return kv_array;
		},
		xml : function(){
			var kv_xml = "<!DOCTYPE html>\n";
			kv_xml += "<html>\n<body>\n";

			kv_xml += "<select id='kv-list' size='10'>\n";
			kv_array.map(function(c, i){
				kv_xml += "<option value='" + c.key + "'" ;
		    	kv_xml += selected === i ? " selected" : "" ;
		        kv_xml += ">" + c.key + '=' + c.value + "</option>\n";
			});
		    kv_xml += "</select>";
		    kv_xml += "\n</body>\n</html>\n";
		    return kv_xml;
		},
		get_data : function(){
			return kv_array;
		}
	}
}());

//================================================================
function $(id){return document.getElementById(id)}
(function(){
	$('kv-input').addEventListener('keypress', function(e){
		e.keyCode === 13?on_click_add() : '';
	});
	$('add-button').addEventListener('click', on_click_add);
	$('order-value-button').addEventListener('click', function(e){
		reload_kv(model.sort_value());
	});

	$('order-key-button').addEventListener('click', function(e){
		reload_kv(model.sort_key());
	});

	$('delete-button').addEventListener('click', function(e){
		model.remove();
		var kv_list = $('kv-list');
	    for(var i = kv_list.options.length - 1; i >= 0; i--) {
	        kv_list.options[i].selected ? kv_list.remove(i) : '';
	    };
	});

	$('show-xml').addEventListener('click', function(e){
		$('kv-xml').value = model.xml();
		show_list(false);
	});

	$('show-list').addEventListener('click', function(e){
		show_list(true);
	});

	$('kv-list').addEventListener('change', function(e){
		model.set_selected(e.srcElement.selectedIndex);
	});
	var new_promise = function(func){
		return new Promise(function(resolve, reject){
			func.call(this,resolve,reject)
		});
	}
	$('load-json').addEventListener('click', function(e){
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
				JSON.parse(e.target.result).map(function(e, i){
					add(e.key, e.value);
					model.add(e.key, e.value);
				});
			},
			function(){
				console.log('Something wrong...');
			}
		)
	});

	$('save-json').addEventListener('click', function(e){
	    var x = document.createElement('a');    
	    x.href = 'data:text/json;charset=utf-8,' + JSON.stringify(model.get_data());
	    x.style = 'visibility:hidden';
	    x.download = 'kv.json';
	    document.body.appendChild(x);
	    x.click();
	    document.body.removeChild(x);
	});

	function show_list(status){
		$('kv-xml').style.display = status?'none':'block';
		$('kv-list').style.display = status?'block':'none';
		$('show-xml').style.display = status?'block':'none';
		$('show-list').style.display = status?'none':'block';
	}

	function reload_kv(arr) {
		var kv_list = $('kv-list');
		while (kv_list.options.length > 0){kv_list.remove(0)};
		arr.map(function(c){
			kv_list.options.add(new Option(c.key + '=' + c.value, c.key))
		});
	}

	function add(key,value) {
		$('kv-list').options.add(new Option(key + '=' + value,key));
		$('kv-input').value = '';
	}

	function on_click_add(e){
		$('message').innerHTML = '';
		var kv = $('kv-input').value;
		var patt0 = /\w+\s*=\s*\w+/g;
		var patt1 = /(^[a-zA-Z0-9\s*]*$)/g;
		if(patt0.test(kv) && patt1.test(kv.replace('=', ''))){
			kv = kv.split('=');
			kv[0] = kv[0].trim();
			kv[1] = kv[1].trim();
			add(kv[0], kv[1]);
			model.add(kv[0], kv[1]);
		}else{
			$('message').innerHTML = 'Invalid key/value pair';
		}
	}
})();