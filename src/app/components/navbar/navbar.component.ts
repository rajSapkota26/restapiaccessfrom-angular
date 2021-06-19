import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public login: LoginService) { }

  ngOnInit(): void {
  }
  public logOut() {
    this.login.logOutUser();
    window.location.reload();
  }
}
