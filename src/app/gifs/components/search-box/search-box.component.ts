
import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
  <h5>Buscar:</h5>
  <input type="text"
    class="form-control"
    placeholder="Buscar gifs..."
    (keyup.enter)="searchTag()"
    #txtTagInput
  >
  `,
  standalone:false
})

export class SearchBoxComponent {

  //lo q paso entre parentesis es el nombre del elemento html
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>; //siempre va a tener un valor pq nos da un aviso si es nulo


  constructor( private gifsService: GifsService) { }//inyectar el servicio

  //searchTag( newTag: string ){ //No hace falta q le pasemos el valor pq con el viewChild tenemos todas las propiedades que tiene un input
  searchTag() {
    const newTag = this.tagInput.nativeElement.value;
    this.gifsService.searchTag(newTag);

    this.tagInput.nativeElement.value=''; //vaciamos la caja de busqueda



    //console.log({ newTag });

  }

}
