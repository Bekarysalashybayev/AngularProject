import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Game} from "../game";
import {RestService} from "../services/rest.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Rent} from "../rent";
import {Payment} from "../Payment";

@Component({
  selector: 'app-history-admin',
  templateUrl: './history-admin.component.html',
  styleUrls: ['./history-admin.component.css']
})
export class HistoryAdminComponent implements OnInit {
  rent: Observable<Rent[]>;
  pay: Observable<Payment[]>;
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
    this.rent = this.restService.getRentList();
    this.pay = this.restService.getPayList();
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
