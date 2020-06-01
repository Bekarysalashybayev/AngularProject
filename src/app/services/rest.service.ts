import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Game} from "../game";

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private baseUrl = 'http://localhost:8081/api/all';
  private  id: string;
   getid(): string {
    return this.id;
  }
  setid(id: string) {
     this.id = id;
  }
  constructor(private http: HttpClient) { }

  getGame(id: string): Observable<any> {
    return this.http.get('http://localhost:8081/api/game/' + id);
  }
  getGameCatalog(id: string): Observable<Object> {
    return this.http.get('http://localhost:8081/api/' + id);
  }
  getGameList(): Observable<any> {
    return this.http.get('http://localhost:8081/api/all');
  }
  getGameListByName(name: string): Observable<any> {
    return this.http.get('http://localhost:8081/api/all/' + name);
  }
  getGameKafka(userId: string, id: string): Observable<any> {
    return this.http.get('http://localhost:8084/game/request?userId=' + userId + '&id=' + id);
  }
  getFeedList(gameId: string): Observable<any> {
    return this.http.get('http://localhost:8081/api/feed/' +  gameId);
  }
  getRentList(): Observable<any> {
    return this.http.get('http://localhost:8083/rent/all');
  }
  getRentListById(): Observable<any> {
    return this.http.get('http://localhost:8083/rent/all/' + localStorage.getItem('currentUser'));
  }

  createGame(game: Object): Observable<Object> {
    return this.http.post('http://localhost:8081/api/add/game', game);
  }
  deleteGame(id: string): Observable<any> {
    return this.http.delete('http://localhost:8081/api/game/' + id, { responseType: 'text' });
  }
  updateGame(id: string, value: any): Observable<Object> {
    return this.http.put('http://localhost:8081/update/game' + id, value);
  }
  createRent(rent: Object): Observable<Object> {
    return this.http.post('http://localhost:8084/request/add', rent);
  }
  createFeed(feed: Object): Observable<Object> {
    return this.http.post('http://localhost:8081/api/add/feed', feed);
  }

  createPay(pay: Object): Observable<Object> {
    return this.http.post('http://localhost:8085/pay/add', pay);
  }

  getPayList(): Observable<any> {
    return this.http.get('http://localhost:8085/pay/all');
  }
}
