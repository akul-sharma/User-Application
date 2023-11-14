import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideNav = new EventEmitter<void>();
  faBars=faBars;
  faUser=faUser;

  userName:String='';

  constructor(private router: Router){}  

  ngOnInit(): void {
      const storedName=localStorage.getItem("username");
      if(storedName)
        this.userName=storedName;
  }

  logout(){
     localStorage.removeItem("username");
     this.userName='';
     this.router.navigate(['']);
  }

}
