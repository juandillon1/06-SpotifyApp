import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Client_ID, Secret_ID } from '../variables_Globales';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  token;
  constructor( private http: HttpClient ) { }

  getToken() {
    const url = `https://spotifyappjuan.herokuapp.com/spotify/${Client_ID}/${Secret_ID}`;
    this.http.get(url).subscribe( ({access_token}: any) => localStorage.setItem('token', access_token));
  }

  getQuery(query: string) {
    this.token = localStorage.getItem('token');
    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      // tslint:disable-next-line: object-literal-key-quotes
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get(url, {headers});
  }

  getNewReleases() {
    return this.getQuery('browse/new-releases?limit=20')
      // tslint:disable-next-line: no-string-literal
      .pipe( map( data => data['albums'].items));
  }

  getArtistas(termino: string) {
    return this.getQuery(`search?q=${ termino }&type=track%2Cartist&market=US&limit=10&offset=15`)
      // tslint:disable-next-line: no-string-literal
      .pipe(map( data => data['artists'].items));
  }

  getArtista(id: string) {
    return this.getQuery(`artists/${id}`);
      // tslint:disable-next-line: no-string-literal
     // .pipe(map( data => data['artists'].items));
  }

  getToptracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=US`)
      // tslint:disable-next-line: no-string-literal
      .pipe(map( data => data['tracks']));
  }

}
