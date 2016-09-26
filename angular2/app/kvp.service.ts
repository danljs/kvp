import { Injectable } from '@angular/core';
import { KvPair } from './kvp.component';

@Injectable()
export class KvpService {
  getKvps(): KvPair[] {
    return [];
  }
}
