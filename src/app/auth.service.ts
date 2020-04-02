import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/internal/Observable';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

user$: Observable<firebase.User>;

  constructor( private auth: AngularFireAuth, private route: ActivatedRoute ) {
    this.user$ = auth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.auth.signInWithRedirect( new firebase.auth.GoogleAuthProvider() );
  }

  logout() {
this.auth.signOut();
  }
}
