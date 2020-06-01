import {Component, Input, OnInit} from '@angular/core';
import {RestService} from "../services/rest.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Game} from "../game";
import {Observable} from "rxjs";
import {Rent} from "../rent";
import {Feedback} from "../Feedback";

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {
  feeds: Observable<Feedback[]>;
  rent: Rent = new Rent();
  feed: Feedback = new Feedback();
  game: any = {};
  submitted = false;
  submitted1 = false;

  count: number;
  text: string;
  constructor(private  restService: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.restService.getGame(localStorage.getItem('gameId')).subscribe((data: {}) => {
      this.game = data;
      console.log(this.game);
      console.log(localStorage.getItem('gameId'));
    });
    this.reloadData();
    console.log(this.restService.getid());
  }

  private reloadData() {
    this.feeds = this.restService.getFeedList(localStorage.getItem('gameId'));
    this.feeds.subscribe(result => { this.count = result.length; });
  }
  newRent(): void {
    this.submitted = false;
    this.rent = new Rent();
  }
  save() {
    this.rent.userID = localStorage.getItem('currentUser');
    this.rent.gameID = localStorage.getItem('gameId');
    this.rent.price = '5000';
    this.restService.createRent(this.rent)
      .subscribe(data => console.log(data), error => console.log(error));
    this.rent = new Rent();
    this.router.navigate(['pay']);

  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }
  onSubmit1() {
    this.submitted1 = true;
    this.save1();
  }
  private save1() {
    this.feed.userId = localStorage.getItem('currentUser');
    this.feed.gameId = localStorage.getItem('gameId');
    this.restService.createFeed(this.feed)
      .subscribe(data => console.log(data), error => console.log(error));
    this.feed = new Feedback();
    window.location.reload();
  }
}
