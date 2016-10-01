import { Component, OnInit } from '@angular/core';
import { KvpService } from './kvp.service';

export class KvPair {
  key: string
  value: string
}

@Component({
  selector: 'kvp-app',
  template: `
  <div class="all">
		<div class="header">
			<div class="label">Key/Value Pair</div>
			<div class="row">
				<div class="left-area"><input id="kv-input" type="text" [(ngModel)]="newKv" (keypress)="onEnter($event)"/></div>
				<div class="right-area"><button id="add-button" (click)="onAdd(newKv)">Add</button></div>
			</div>
			<div class="row" id="message">{{message}}</div>
		</div>
		<hr>
		<div class="body">
			<div class="row label">Key/Value Pair List</div>
			<div class="row">
				<div class="left-area">
					<select id="kv-list" size="10" *ngIf="toggle_list">
						<option *ngFor="let kv of kvs; let i = index" (click)="onSelect(kv,i)">{{kv.key}}={{kv.value}}</option>
					</select>
					<textarea readOnly id="kv-xml" *ngIf="!toggle_list">{{kv_xml}}</textarea>
				</div>
				<div class="right-area">
					<div class="row"><button id="order-value-button" (click)="order_value()">OrderByValue</button></div>
					<div class="row"><button id="order-key-button" (click)="order_key()">OrderByKey</button></div>
					<div class="row"><button id="delete-button" (click)="delete()">Delete</button></div>
					<div class="row"><button id="show-xml" *ngIf="toggle_list" (click)="show_xml()">ShowXML</button></div>
					<div class="row"><button id="show-list" *ngIf="!toggle_list" (click)="show_list()">ShowList</button></div>
					<div class="row"><button id="load-json" (click)="load_json()">LoadData</button></div>
					<div class="row"><button id="save-json" (click)="save_json()">SaveData</button></div>
				</div>
			</div>
		</div>
	</div>
  `,
  providers: [KvpService],
})
export class KvpComponent implements OnInit {
	selectedKv: KvPair

	selectedIndex = -1
	message = ''
	kv_xml = ''
	newKv = ''
	toggle_list = true
	kvs = []

	constructor(private kvpService: KvpService) { }

	ngOnInit(): void {
	   this.getKvs()
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

	show_list(): void {
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
	};
}
