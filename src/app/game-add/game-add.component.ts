import {Component, Input, OnInit} from '@angular/core';
import {RestService} from '../services/rest.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Game} from '../game';

@Component({
  selector: 'app-game-add',
  templateUrl: './game-add.component.html',
  styleUrls: ['./game-add.component.css']
})
export class GameAddComponent implements OnInit {
  game: Game = new Game();
  submitted = false;

  constructor( private restService: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  newGame(): void {
    this.submitted = false;
    this.game = new Game();
  }


  save() {
    this.restService.createGame(this.game)
      .subscribe(data => console.log(data), error => console.log(error));
    this.game = new Game();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
    this.router.navigate(['/products']);
  }



}
