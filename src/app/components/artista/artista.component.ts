import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: []
})
export class ArtistaComponent implements OnInit {

  loading: boolean;
  artista: any = {};
  toptracks: any[] = [];
  constructor( private activateRoute: ActivatedRoute,
               private spotify: SpotifyService  ) {
    this.activateRoute.params.subscribe( params => {
      this.getArtista(params.id);
      this.gettoptracks(params.id);
    } );
  }

  ngOnInit(): void {}

  getArtista( id: string ) {
    this.loading = true;
    this.spotify.getArtista( id )
      .subscribe( artista => {
        console.log(artista);
        this.artista = artista;
        setTimeout(() => {
          this.loading = false;
        }, 500);
      });
  }

  gettoptracks( id: string ) {
    this.spotify.getToptracks( id )
        .subscribe(  (topTracks: any) => {

          this.toptracks = topTracks;
          console.log(this.toptracks);
        });
  }

}
