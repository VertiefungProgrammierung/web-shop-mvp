import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor( private auth: AngularFireAuth ) { }

  login() {
    this.auth.auth.signInWithRedirect( new firebase.auth.GoogleAuthProvider() );
  }

}
