import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Rent} from "../rent";
import {RestService} from "../services/rest.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Game} from "../game";

@Component({
  selector: 'app-history-user',
  templateUrl: './history-user.component.html',
  styleUrls: ['./history-user.component.css']
})
export class HistoryUserComponent implements OnInit {
  rent: Observable<Rent[]>;
  count = '';
  game: any = {};

  constructor(private restService: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.reloadData();
    if (!localStorage.getItem('count')) {
      window.location.reload();
      localStorage.setItem('count', 'ok');
    }
  }


  private reloadData() {
    this.rent = this.restService.getRentListById();
  }

  getName(gameID: string) {
    this.restService.getGame(gameID).subscribe((data: {}) => {
      this.game = data;
      console.log(this.game);
      console.log(localStorage.getItem('gameId'));
    });
    return this.game.name;
  }
}
