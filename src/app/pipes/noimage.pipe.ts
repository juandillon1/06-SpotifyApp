import { Pipe, PipeTransform } from '@angular/core';
import { empty } from 'rxjs';

@Pipe({
  name: 'noimage'
})
export class NoimagePipe implements PipeTransform {

  transform(images: any[], imagen?: number): string {
    if (imagen === undefined) {
      imagen = 0;
    }

    if (!images) {
      return 'assets/img/original.png';
    }

    if ( images.length > 0 ) {
      return images[imagen].url;
    } else {
      return 'assets/img/original.png';
    }

  }

}
