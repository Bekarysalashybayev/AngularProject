import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {RestService} from "../../services/rest.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Catalog} from "../../catalog";

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {
  private id: string;
  catalogs: Observable<object>;
  constructor(private restService: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.reloadData();
  }
  private reloadData() {
    this.id = this.restService.getid();
    this.catalogs = this.restService.getGameCatalog(this.id);
  }


}
