import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Game} from '../game';
import {RestService} from '../services/rest.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Rent} from "../rent";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  games: Observable<Game[]>;
  count = '';
  game: any = {};
  submitted = false;
  constructor(private restService: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.reloadData();
    if (!localStorage.getItem('count')) {
      window.location.reload();
      localStorage.setItem('count', 'ok');
    }
    if (this.submitted) {
      this.restService.getGameKafka('1', '1').subscribe((data: {}) => {
        this.game = data;
        console.log(this.game);
      });
    }
  }


  private reloadData() {
    this.games = this.restService.getGameList();
  }
  deleteGame(id: string) {
    this.restService.deleteGame(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));

  }

  sendToKafka() {
    this.submitted = true;
    this.ngOnInit();
  }
}
