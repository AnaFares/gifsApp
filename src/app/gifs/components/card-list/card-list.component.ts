import { Component, Input} from '@angular/core';
import { Gif } from '../../interfaces/gifs.interface';

@Component({
  selector: 'gifs-card-list',
  standalone: false,

  templateUrl: './card-list.component.html'
})
export class CardListComponent {

  @Input() //del padre al hijo (home-page) donde voy a pintar las imagenes
  public gifs: Gif[] = [];



}
