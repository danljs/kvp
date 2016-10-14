import { Component, OnInit, AfterViewChecked, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { KvpService } from './kvp.service';

export class KvPair {
  key: string
  value: string
}

@Component({
	moduleId: module.id,
  selector: 'kvp-app',
  templateUrl: 'kvp.component.html',
})
export class KvpComponent implements OnInit, AfterViewChecked, AfterViewInit {
	selectedKv: KvPair

	selectedIndex = -1
	message = ''
	kv_xml = ''
	newKv = ''
	toggle_list = true
	kvs = []

	constructor(
		private kvpService: KvpService, 
		private router: Router
	) { }

	ngOnInit(): void {
	   this.getKvs()
	}
	ngAfterViewInit(): void{
		console.log('ngAfterViewInit')
	}
	ngAfterViewChecked() {
		//console.log('ngAfterViewChecked')
	}

	getKvs(): void {
		this.kvpService.getKvps().then(kvs => this.kvs = kvs)
	}
	onSelect(kv: KvPair, index): void {
	  this.selectedKv = kv
	  this.selectedIndex = index
	}
	onEnter(e): void {
		e.keyCode === 13 ? this.onAdd() : '';
	}
	onAdd(): void {
		let patt0 = /\w+\s*=\s*\w+/g
		let patt1 = /(^[a-zA-Z0-9\s*]*$)/g
		this.message = ''
		if(patt0.test(this.newKv) && patt1.test(this.newKv.replace('=', ''))){
			let kv = this.newKv.split('=')
			kv[0] = kv[0].trim()
			kv[1] = kv[1].trim()
			this.kvpService.addKvp({key: kv[0], value: kv[1]});
			this.newKv = '';
		}else{
			this.message = 'Invalid key/value pair';
		}
	}

	delete(): void {
		this.kvpService.delete(this.selectedIndex)
	}

	order_value(): void {
		this.kvpService.order_value()
	}
	order_key(): void {
		this.kvpService.order_key()
	}

	show_xml(): void {
		var kv_xml = "<!DOCTYPE html>\n";
		kv_xml += "<html>\n<body>\n";
		kv_xml += "<select id='kv-list' size='10'>\n";
		this.kvs.map((c, i) => {
      kv_xml += "<option value='" + c.key + "'" ;
	    kv_xml += this.selectedIndex === i ? " selected" : "" ;
	    kv_xml += ">" + c.key + '=' + c.value + "</option>\n";
		});
    kv_xml += "</select>";
    kv_xml += "\n</body>\n</html>\n";

    this.kv_xml = kv_xml
		this.toggle_list = false 
	}

	show_list = (): void => {
		this.toggle_list = true 
	}

	load_json(): void {
		this.kvpService.load_json().then(() => this.getKvs())
	}

	save_json(): void {
		let x = document.createElement('a')
    x.href = 'data:text/json;charset=utf-8,' + JSON.stringify(this.kvpService.getKvps())
    x.style['visibility'] = 'hidden'
    x['download'] = 'kv.json';
    document.body.appendChild(x);
    x.click();
    document.body.removeChild(x);
	}

	show_detail(): void {
    this.router.navigate(['/kvp.detail']);
  }
}
