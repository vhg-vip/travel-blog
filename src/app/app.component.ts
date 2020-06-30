import { Component } from '@angular/core';
import { HttpsService } from './sevice/https.service';
import { Menu } from './models/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'travel-app';
  menu: any;
  sideMenu: boolean = false;
  posts: any;

  constructor(public httpSerive: HttpsService){
    this.getMenu();
  }

  getMenu(){
    this.httpSerive.getMenu().subscribe( data => {
      this.menu = data;
      console.log(data);
    })
  }

  toggleMenu(){
    this.sideMenu = !this.sideMenu;
  }
}
