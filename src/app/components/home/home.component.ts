import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  loading: boolean;
  error: boolean;
  mensajeerror: string;
  nuevascanciones: any = [];

  constructor( private spotify: SpotifyService ) {
    this.loading = true;
    this.error = false;
    this.spotify.getToken();
    setTimeout(() => {
      this.spotify.getNewReleases()
        .subscribe( (data: any) => {
          console.log(data);
          this.nuevascanciones = data;
          setTimeout(() => {
            this.loading = false;
          }, 500);
        }, (errorserv) => {
            this.loading = false;
            this.error = true;
            this.mensajeerror = errorserv.error.error.message;
        });
    }, 2000);
  }

  ngOnInit(): void {

  }

}
