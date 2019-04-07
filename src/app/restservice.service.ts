import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { World, Pallier, Product } from './world';


@Injectable({
  providedIn: 'root'
})
export class RestserviceService {

  private server = "http://localhost:8080/";  
  private user = ""; 

  constructor(private http: HttpClient) { }

  private handleError(error: any): Promise<any> { 
    console.error('An error occurred', error);    
    return Promise.reject(error.message || error); 
  } 
   
  getWorld(username: string): Promise<World> {     
    console.log("get world with username : " + username);
    const httpOptions = {
      headers: new HttpHeaders({
        'user':  username
      })
    };
    return this.http.get(this.server + "adventureisis/generic/world", httpOptions)         
      .toPromise()
        .catch(this.handleError); 
  };

  public getServer() {
    return this.server;
  }

  public setServer(value) {
    this.server = value;
  }

  public getUser() {
    return this.user;
  }

  public setUser(value) {
    this.user = value;
  }

}
