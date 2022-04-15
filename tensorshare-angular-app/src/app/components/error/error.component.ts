import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  isAuthenticated(): boolean {
    const authToken = localStorage.getItem('authtoken');

    if (authToken != null) return true;

    return false;
  }

  getCurrentUsername(): string | null {
    const user = localStorage.getItem('user');

    if (user != null) {
      
      const userObj = JSON.parse(user) as User;

      return userObj.username;
    }

    return null;
  }
}
