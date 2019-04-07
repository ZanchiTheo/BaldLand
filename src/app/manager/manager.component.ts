import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pallier, Product } from '../world';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {

  manager: Pallier;
  product: Product;
  serverPath: String;
  worldMoney: number;


  constructor() { }

  ngOnInit() {
  }

  @Input() set prod(value: Product) { this.product = value; }
  @Input() set manag(value: Pallier) { this.manager = value; }  
  @Input() set server(value: String) { this.serverPath = value; }
  @Input() set money(value: number) { this.worldMoney = value; }

  @Output() onBuyManager: EventEmitter<Pallier> = new EventEmitter<Pallier>(); 

  buyManager() {
    this.manager.unlocked = true;
    this.product.managerUnlocked = true;
    this.onBuyManager.emit(this.manager);
  }

  boutonIsEnabled(): boolean {
    return(this.worldMoney < this.manager.seuil);
  }
}
