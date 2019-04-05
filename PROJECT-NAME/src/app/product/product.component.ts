import { Component, OnInit, Input, ViewChild, Output,EventEmitter } from '@angular/core';
import { RestserviceService } from '../restservice.service';
import { World, Product, Pallier } from '../world';
import { ConstantPool } from '@angular/compiler';


declare var require;
const ProgressBar = require("progressbar.js");


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],

})
export class ProductComponent implements OnInit {
  server: string;
  product: Product;
  progressbar: any;
  timeleft: number;
  lastupdate: any;
  //world: World = new World();
  _qtmulti: string;
  maxbuy:number;
  quantiteAchat: number; 
  
  

  @ViewChild('bar') progressBarItem;

  @Input()
  set prod(value: Product) {
    console.log(value)
    this.product = value;
  }

  @Input("monde") world;

  @Input()
  set qtmulti(value: string){
    if(this.product){
      this.calcMaxCanBuy();
      this.BuyBouton(value);
    }
  }
  
  @Output() notifyProduction: EventEmitter<Product> = new EventEmitter<Product>(); 

  constructor(private service: RestserviceService){
    this.server = service.getServer();
  }

  ngOnInit() {
    this.progressbar = new ProgressBar.Line(this.progressBarItem.nativeElement,
      { strokeWidth: 50, color: '#00ff00' });
    setInterval(() => { this.calcScore(); }, 100);
  }

  startFabrication() {
    this.progressbar.animate(1, { duration: this.product.vitesse });
    this.product.timeleft = this.product.vitesse;
    this.lastupdate = Date.now();
    
  }

  calcScore() {
    if (this.product.timeleft > 0){
      let now = Date.now()
      this.product.timeleft = this.product.timeleft - (now - this.lastupdate);
      this.lastupdate = now;

      if (this.product.timeleft<=0){
        //on prévient le composant parent que ce produit a généré son revenu
        this.notifyProduction.emit(this.product);
        this.progressbar.set(0)
        
      }


    }

  }

  calcMaxCanBuy(){
    var x: number = this.product.revenu; 
    var n: number = 0;
    var rev: number = x; 

    while (rev<this.world.money){
      rev += rev*x^n;
      n ++;
    }
    this.maxbuy =n; 

  }


 BuyBouton(valeur: string){

  switch(valeur){
    case "1":
      this.quantiteAchat=1;
      break; 
    case "10":
    this.quantiteAchat=10;
      break; 
    case "100":
    this.quantiteAchat=100;
      break; 
    case "Max":
    this.quantiteAchat=this.maxbuy;
      break; 
  }

 }

  checkEnoughMoney(p : Product){
    if(this.world.money >= p.cout*this.quantiteAchat){
      return true
    }
    else{
      return false
    }
  }

 acheterProduit(p : Product){
  
  let compteur =0; 
  if(p.quantite == 0){    
    if(this.quantiteAchat == 1){
      console.log(p.cout)
      if(this.world.money >= p.cout){   
        this.world.money = this.world.money - p.cout; 
        p.quantite += this.quantiteAchat;
        p.cout *= p.croissance; 
      }
    }
    else if(this.quantiteAchat > 1){
      for (var i=1; i < this.quantiteAchat;i++){
        p.cout *= p.croissance 
      }            
      if(this.world.money >= p.cout){
        this.world.money = this.world.money - p.cout; 
        p.quantite += i;
      }
      else{
        console.log("pas assez d'argent")
      } 

    }
  }

  if(p.quantite == 1){    
    if(this.quantiteAchat == 1){
      console.log(p.cout)
      if(this.world.money >= p.cout){   
        this.world.money = this.world.money - p.cout; 
        p.quantite += this.quantiteAchat;
        p.cout *= p.croissance; 

      }
    }
    else if(this.quantiteAchat > 1){
      for (var i=1; i < this.quantiteAchat;i++){
        p.cout *= p.croissance 
      }            
      if(this.world.money >= p.cout){
        this.world.money = this.world.money - p.cout; 
        p.quantite += i;
      }
      else{
        console.log("pas assez d'argent")
      } 

    }
  }
  else if (p.quantite > 1){
    if(this.quantiteAchat == 1){
      if(this.world.money >= p.cout){
        this.world.money = this.world.money - p.cout; 
        p.quantite += this.quantiteAchat;
        p.cout *= p.croissance; 
      }
    }
    else if (this.quantiteAchat > 1){
      for (var i=1; i < this.quantiteAchat;i++){
        p.cout *= p.croissance 
      }            
      if(this.world.money >= p.cout){
        this.world.money = this.world.money - p.cout; 
        p.quantite += i;
      }
      else{
        console.log("pas assez d'argent")
      }
    }
  } 

}

}
