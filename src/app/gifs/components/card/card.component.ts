import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interface';

@Component({
  selector: 'gifs-card',
  standalone: false,

  templateUrl: './card.component.html',
})
export class CardComponent implements OnInit {

  @Input()
  public gif!: Gif; //siempre lo voy a recibir

  ngOnInit(): void {
    if ( !this.gif ) throw new Error('Gif property is required'); //una propiedad requerida

  }




}
