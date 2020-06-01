import { Component, OnInit } from '@angular/core';
import {RestService} from "../services/rest.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {Game} from "../game";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  games: Observable<Game[]>;
  count = '';
  name = '';
  constructor(private restService: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.reloadData();
    if (!localStorage.getItem('count')) {
      window.location.reload();
      localStorage.setItem('count', 'ok');
    }
  }


  private reloadData() {
    if (this.name === '') {
      this.games = this.restService.getGameList();
    } else {
      this.games = this.restService.getGameListByName(this.name);
    }
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
  send(id: string) {
    this.restService.setid(id);
    localStorage.setItem('gameId', id);
    this.router.navigate(['detail']);

  }

  filterByName() {
    this.games = this.restService.getGameListByName(this.name);
  }

  modelChanged() {
    this.ngOnInit();
  }
}
