import { Component, OnInit } from '@angular/core';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  showSideNav: boolean = false;
  faHouse=faHouse;
  faCircleInfo=faCircleInfo;

  constructor(){}  

  ngOnInit(): void {
      
  }
  
  toggleSideNav(): void {
    this.showSideNav = !this.showSideNav;
  }

}
