import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { RestProvider } from '../../providers/rest/rest';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username = '';
  email = '';
  users: any;

  constructor(private nav: NavController, public restProvider: RestProvider, private auth: AuthServiceProvider) {
    let info = this.auth.getUserInfo();
    this.username = info['name'];
    this.email = info['email'];
    this.getUsers();
  }

  getUsers() {
      this.restProvider.getUsers()
      .then(data => {
        this.users = data;
        console.log(this.users);
      });
    }
  public logout() {
    this.auth.logout().subscribe(succ => {
      this.nav.setRoot('LoginPage')
    });
  }
}
