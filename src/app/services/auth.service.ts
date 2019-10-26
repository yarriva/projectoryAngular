import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { from } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {

    })
  }

  loginUser(credentials: { userEmail: string; userPassword: string; }) {
    return from(this.afAuth.auth
      .signInWithEmailAndPassword(credentials.userEmail, credentials.userPassword)
      .then(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          return true;
        }
      }, err => {
        console.log(err.message);
        return false;
      }));
  }

  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

  get currentUser() {
    let user = localStorage.getItem('user');
    if (!user) return null;

    return JSON.parse(user).user;
  }

  logout() {
    if (confirm("Are you sure to logout?")) {
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    }
  }
}
