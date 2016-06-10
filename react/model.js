export default (function(){
	var kv_array = [], selected = [];
	return{
		add : function(key, value){
			kv_array.push({key : key,value : value});
		},
		add_array : function(array){
			kv_array = kv_array.concat(array);
		},
		set_selected : function(index){
			selected = index;
		},
		remove : function(){
			kv_array = kv_array.filter(function(c,i){
				return selected.indexOf(i+'') < 0;
			});
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
	};
}())