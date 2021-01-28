import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {
  colorfondo: string;
  color: string;
  date = new Date();
  constructor(private datepipe: DatePipe) {}
  horaact = this.datepipe.transform(this.date, 'HH');
  ngOnInit(): void {
    this.obtenerColor();
  }

  obtenerColor() {
    if ( (this.horaact > '00' && this.horaact < '06') || (this.horaact > '19' && this.horaact < '24')) {
      this.colorfondo = 'Oscuro';
      this.color = 'linear-gradient(to right, #485563, #29323c)';
    } else { this.colorfondo = 'Normal'; this.color = 'linear-gradient(to right, #43cea2, #185a9d)'; }
    document.body.style.background = this.color;
  }

}
