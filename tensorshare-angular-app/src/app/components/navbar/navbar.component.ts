import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  get hasToken(): boolean { return localStorage.getItem("authtoken") != null }
  get user(): any | null { return JSON.parse(localStorage.getItem('user')!); }

  constructor(private authService: AuthService) {

  };

  ngOnInit(): void {

  }

  onSignOut(): void {
    this.authService.logout();
  }
}
