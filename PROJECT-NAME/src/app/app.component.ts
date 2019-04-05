import { Component, Input } from '@angular/core';
import {RestserviceService} from './restservice.service';
import {World, Product, Pallier} from './world';
import { Button } from 'protractor';
import{ ToasterService} from 'angular2-toaster';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
  
})
export class AppComponent {
  title = 'FarmerAdventure';
  world: World = new World();
  server: string; 
  product: Product;
  qtmulti: String="1"; 
  pallier: Pallier;

 
 
  constructor(private service: RestserviceService, private toasterService : ToasterService){
    this.toasterService = toasterService;
    this.server = service.getServer();
   
    service.getWorld().then(
      world =>{
        this.world = world;
      }
    );
  }

  onProductionDone(p: Product){
    this.world.money= this.world.money+(p.revenu*p.quantite);
    console.log(this.world.money)
    this.world.score= this.world.money+(p.revenu*p.quantite); 
  }

  valeurAchat(){
    switch(this.qtmulti){
      case "1":
        this.qtmulti="10";
        break; 
      case "10":
        this.qtmulti="100";
        break; 
      case "100":
        this.qtmulti="Max";
        break; 
      case "Max":
        this.qtmulti="1";
        break; 
    }
  }

  engagerManager(p:Pallier){
    if (p.unlocked == false){
      if(this.world.money >= p.seuil){
        p.unlocked = true; 
        this.world.products.product[p.idcible].managerUnlocked = true; 
        this.world.money = this.world.money - p.seuil;
        this.toasterService.pop('success','Manager hired !', p.name);
       
      }
      else{
      this.toasterService.pop('error','Hiring failed you dont have as much money !', p.name);

      }

    }
  else{

  }

   
  }
  
  

 
}

