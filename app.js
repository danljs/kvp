function $(id){return document.getElementById(id)}

$("kv-input").addEventListener("keypress",e=>{e.keyCode === 13?add_kv():""});
$("add-button").addEventListener("click",add_kv);
$("order-value-button").addEventListener("click",e=>{order_by(1)});
$("order-key-button").addEventListener("click",e=>{order_by(0)});
$("delete-button").addEventListener("click",delete_kv);
$("show-xml").addEventListener("click",show_xml);
$("show-list").addEventListener("click",(e)=>{show_list(true)});

function add_kv(){
	var patt0 = /\w+\s*=\s*\w+/g;
	var patt1 = /(^[a-zA-Z0-9\s*]*$)/g;
	var new_kv = $("kv-input").value;
	$("message").innerHTML="";
	if(!patt0.test(new_kv)||!patt1.test(new_kv.replace('=',''))){
		$("message").innerHTML="Invalid key/value pair";
		return;
	}

	add_to_list(new_kv);
	
	$("kv-input").value = "";
	$("kv-list").style.display==='none'?show_list(true):"";
}

function add_to_list(kv){
	kv = kv.split('=');
	kv[0] = kv[0].trim();
	kv[1] = kv[1].trim();
	$("kv-list").options.add(new Option(kv[0] + '=' + kv[1],kv[0]))
}

function delete_kv(){
    var kv_list = $("kv-list");
    for(var i= kv_list.options.length-1; i >= 0; i--) {
        kv_list.options[i].selected?kv_list.remove(i):"";
    }
    $("kv-list").style.display==='none'?show_list(true):"";
}

function show_xml(){
	var kv_list = $("kv-list");
	var kv_xml = "<!DOCTYPE html>\n"
	kv_xml += "<html>\n<body>\n"

	kv_xml += "<select id='kv-list' multiple='multiple' size='10'>\n"
    for(var i = 0 ; i < kv_list.options.length; i++) {
    	kv_xml += "<option value='" + kv_list.options[i].value + "'"
    	kv_xml += kv_list.options[i].selected ? " selected":""
        kv_xml += ">"+kv_list.options[i].innerHTML+"</option>\n";
    }
    kv_xml += "</select>"
	// kv_xml += kv_list.outerHTML

    kv_xml += "\n</body>\n</html>\n"

    $("kv-xml").value=kv_xml;
    show_list(false)
}

function show_list(status){
	$("kv-xml").style.display = status?"none":"block"
	$("kv-list").style.display = status?"block":"none"
	$("show-xml").style.display = status?"block":"none"
	$("show-list").style.display = status?"none":"block"
}

function order_by(index){
	var arr=[]
	var kv_list = $("kv-list");
	for(var i = 0 ; i < kv_list.options.length; i++) {
		arr.push(kv_list.options[i].innerHTML);
    }

	arr.sort((a, b)=>{
	    var key_a = a.split("=")[index], key_b = b.split("=")[index];
	    return key_a < key_b ? -1 : (key_a > key_b ? 1 : 0);
	});

	while (kv_list.options.length > 0) {kv_list.remove(0)}
	
	arr.map(c=>{add_to_list(c)})
	
	$("kv-list").style.display==='none'?show_list(true):"";
}