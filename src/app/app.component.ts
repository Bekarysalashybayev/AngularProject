import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Front';
  count = 0;
  constructor(private route: ActivatedRoute, private router: Router) { }
  currentUser = localStorage.getItem('currentUser');
  loqout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('count');
    this.router.navigate(['login']);
  }
  update() {
    if (this.count === 0) {
      window.location.reload();
    }
    this.count = this.count + 1;
  }
}
