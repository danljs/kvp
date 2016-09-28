import { Injectable } from '@angular/core';
import { KvPair } from './kvp.component';

@Injectable()
export class KvpService {
	kvs = []
  getKvps(): KvPair[] {
    return this.kvs;
  }
  addKvp(kvp): void{
  	this.kvs.push(kvp);
  }
  delete(index): void {
		this.kvs.splice(index, 1)
	}
	order_value(): void {
		this.kvs.sort((a, b) => a.key < b.key ? -1 : (a.key > b.key ? 1 : 0))
	}
	order_key(): void {
		this.kvs.sort((a, b) => a.value < b.value ? -1 : (a.value > b.value ? 1 : 0))
	}
	concatKvps(kvps): void{
		this.kvs = this.kvs.concat(kvps)
  }
}
