declare var require; 
const ProgressBar = require("progressbar.js"); 

import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { World, Product, Pallier } from '../world';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @ViewChild('bar') ProgressBarItem;

  product: Product;
  serverPath: String;
  progressbar: any;
  lastupdate: any;
  worldMoney: number;
  quantite: number;
  quantiteString: String;
  maxBuy: number;
  coutNbProduit: number;

  constructor() { }

  ngOnInit() {
    this.progressbar = new ProgressBar.Line(this.ProgressBarItem.nativeElement, { 
      strokeWidth: 4,
      easing: 'easeInOut',
      duration: 1400,
      color: '#FFEA82',
      trailColor: '#eee',
      trailWidth: 1,
      svgStyle: {width: '100%', height: '100%'},
      from: {color: '#FFEA82'},
      to: {color: '#932c2c'},
      step: (state, bar) => {
        bar.path.setAttribute('stroke', state.color);
      }
    }); 
    setInterval(() => { this.calcScore(); }, 100);
    console.log("timeleft of product : " + this.product.timeleft);
  }
  
  @Input() set prod(value: Product) { this.product = value; }  
  @Input() set server(value: String) { this.serverPath = value; }
  @Input() set money(value: number) { 
    this.worldMoney = value; 
    this.updateInfos();
  }
  @Input() 
  set quanti(value: string) {     
    this.quantiteString = value;
    this.updateInfos();
  } 

  @Output() notifyProduction: EventEmitter<Product> = new EventEmitter<Product>(); 
  @Output() onProductBuyed: EventEmitter<Product> = new EventEmitter<Product>(); 
  @Output() onBuy: EventEmitter<number> = new EventEmitter<number>(); 

  startFabrication() {
    console.log("timeleft of product : " + this.product.timeleft);
    if((this.product.timeleft == 0) && (this.product.quantite != 0)) {
      console.log("start fabrication of product : " + this.product.name);
      this.product.timeleft = this.product.vitesse;
      this.lastupdate = Date.now();
      this.progressbar.animate(1, { duration: this.product.vitesse });
    }
  }

  calcScore(): any {
    if (this.product.timeleft != 0) {
      if(this.product.timeleft < 0) {
        this.product.timeleft = 0;
        this.progressbar.set(0);
        this.notifyProduction.emit(this.product); 
        if (this.product.managerUnlocked) this.startFabrication();
      }
      else {
        this.lastupdate = Date.now() - this.lastupdate;
        this.product.timeleft -= this.lastupdate;
        this.lastupdate = Date.now();
      }
    }
    else if (this.product.managerUnlocked){
      this.startFabrication();
    }
  }

  calcMaxCanBuy() {
    if (this.product.quantite) {
      this.maxBuy = Math.floor(Math.log(1-(this.worldMoney/this.calcCoutNbProduits(1)*(1-this.product.croissance)))/Math.log(this.product.croissance));
      console.log("calcMaxCanBuy ----- max can buy : " + this.maxBuy);
      this.maxBuy <= 0 ? this.maxBuy = 1 : this.maxBuy = this.maxBuy;
      //console.log(this.product.name + " : " + "Max can buy : " + this.maxBuy);
    }
  }

  calcCoutNbProduits(nb: number): number {
    var cout: number;
    if (this.product.quantite != 0)
      cout = this.product.cout * ((1-Math.pow(this.product.croissance, nb + this.product.quantite))/(1-this.product.croissance));
    else
      cout = this.product.cout;

    return cout;
  }

  updateQuantite() {
    switch(this.quantiteString) {
      case "1": 
        this.quantite = 1;
        break;
      case "10": 
        this.quantite = 10;
        break;
      case "100": 
        this.quantite = 100;
        break;
      case "Max": 
        this.quantite = this.maxBuy;
        break;
    }
  } 

  buyProduct() {
    this.onBuy.emit(this.coutNbProduit);
    this.onProductBuyed.emit(this.product);
    this.product.quantite += this.quantite; 
  }

  boutonIsEnabled(): boolean {
    return(this.worldMoney < this.coutNbProduit);
  }

  updateInfos() {
    this.calcMaxCanBuy();
    this.updateQuantite();
    this.calcCoutNbProduits(this.quantite);
    this.coutNbProduit = this.calcCoutNbProduits(this.quantite);
    //this.printInfos();
  }

  printInfos() {
    console.log(this.product.name + " : " + "quantite" + " -- " + this.quantite + " -- ");
    console.log(this.product.name + " : " + "maxbuy" + " -- " + this.maxBuy + " -- ");
    console.log(this.product.name + " : " + "coutnbproduit" + " -- " + this.coutNbProduit + " -- ");
  }

}
