import { Component, Input } from '@angular/core';
import { RestserviceService } from './restservice.service'; 
import { World, Product, Pallier } from './world'; 
import { ToasterService } from 'angular2-toaster';  
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'zanchigular';
  world: World = new World();  
  server: string; 
  quanti: String = '1';
  managerAffordable: boolean = true;
  username: string = 'ChauveQuiPeut' + (Math.round(Math.random() * 10000)).toString();

  constructor(private service: RestserviceService, private toasterService: ToasterService, private http: HttpClient) { 
    //localStorage.clear();
    if (localStorage.length) 
      this.username = localStorage.getItem("username");
    else 
      localStorage.setItem('username', this.username);
    console.log("---------------------- local storage available : " + localStorage.length);
    console.log("---------------------- username retrieved !! : " + this.username);
    this.server = this.service.getServer();     
    service.getWorld(this.username).then(world => {  
      this.world = world;      
      this.managerIsAffordable();
    });   
  } 

  @Input() set Username(value: string) { this.username = value; }  

  onProductionDone(p: Product) {
    console.log("---- On production done : " + p.name);
    this.world.money += (p.revenu * p.quantite);
    this.world.score += (p.revenu * p.quantite);
    this.managerIsAffordable();
    //this.putProduct(p);
  }

  onBuyDone(c: number) {
    console.log("---- On buy done");
    this.world.money -= c;
    this.managerIsAffordable();
  }

  onProductBuyed(product: Product) {
    console.log("---- On product buyed : " + product.name);
    this.putProduct(product);
  }

  onBuyManagerDone(manager: Pallier) {
    console.log("---- On manager buyed : " + manager.name);
    this.world.money -= manager.seuil;
    this.toasterService.pop('success', 'manager hired :', manager.name);
    this.managerIsAffordable();
    this.putManager(manager);
  }

  changeQuanti() {
    switch(this.quanti) {
      case "1": 
        this.quanti = "10";
        break;
      case "10": 
        this.quanti = "100";
        break;
      case "100": 
        this.quanti = "Max";
        break;
      case "Max": 
        this.quanti = "1";
        break;
    }
  }

  managerIsAffordable() {
    var cpt: number = 0;
    this.world.managers.pallier.forEach(manager => {
      if ((this.world.money >= manager.seuil) && (!manager.unlocked)) cpt ++;
    });

    cpt > 0 ? this.managerAffordable = false : this.managerAffordable = true;
  }

  onUsernameChanged() {
    if (this.username.length == 0)
      this.username = 'ChauveQuiPeut' + (Math.round(Math.random() * 10000)).toString();   
    localStorage.setItem("username", this.username);
      
    console.log("---------------------- username stored !! : " + this.username);

    this.server = this.service.getServer();     
    this.service.getWorld(this.username).then(world => {  
      this.world = world;      
      this.managerIsAffordable();
    }); 
  }

  putManager(manager : Pallier): Promise<any> { 
    console.log("PUT Manager : " + manager.name);
    const httpOptions = {
      headers: new HttpHeaders({
        'user':  this.username
      })
    };
    return this.http.put(this.server + "adventureisis/generic/manager", manager, httpOptions).toPromise(); 
  } 
 
  putProduct(product : Product): Promise<any> { 
    console.log("PUT Product : " + product.name);
    const httpOptions = {
      headers: new HttpHeaders({
        'user':  this.username
      })
    };
    return this.http.put(this.server + "adventureisis/generic/product", product, httpOptions).toPromise(); 
  } 

}
  