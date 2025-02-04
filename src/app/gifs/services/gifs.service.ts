import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interface';

@Injectable({providedIn: 'root'})//lo probamos en el root para que sea global
export class GifsService {//este servicio esta disonible a lo largo de todo el proyecto

  public gifList: Gif[] = [];

  private _tagsHistory: string[]=[]; //lo podemos privado para q nadie lo pueda modificar fuera del servicio
  private apiKey: string ='OBXIPymFza2DBPWG6dU3zCi7nEe1QEzX'; //API GIPHY
  private serviceUrl: string ='https://api.giphy.com/v1/gifs';

  constructor( private http: HttpClient ) {
    this.loalLocalStorage();
    console.log('Gifs Service Read');
  }

  get tagsHistory() {
    return [... this._tagsHistory];
  }

  private organizeHistory ( tag:string ) {
    tag = tag.toLowerCase(); //me lo pone en minusculas

    if ( this._tagsHistory.includes(tag) ) { //si el tag q acabo de meter ya esta en el array
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag ); //me vueve a cargar el array con todos menos con el mismo que ya habia
    }
    this._tagsHistory.unshift( tag ); //el que acabo de poner me lo pone el primero en el array
    this._tagsHistory = this.tagsHistory.splice(0,10); //limta solo a 10
    this.saveLocalStorage();
  }

  private saveLocalStorage():void {
    localStorage.setItem( 'history', JSON.stringify(this._tagsHistory) ); //para poder guardarlo tiene q ser un string, no un array. "JSON.srtringify()" asi lo pasamos a string

  }

  private loalLocalStorage():void {
    if (!localStorage.getItem('history')) return; //si esta vacio se sale de la funcion y no hace nada (no hay datos)

    this._tagsHistory = JSON.parse( localStorage.getItem('history')! ); //le tenemos que decir q siempre va a tener datos pq no nos deja que sea nulo (!). "JSON.parse" me pasa el string a un array

    if ( this._tagsHistory.length === 0 ) return; //si esta vacio _tagHistory no hace nada, si tiene valor llamamos a searchTag para q me carge las imagene del primer valor del array
    this.searchTag( this._tagsHistory[0]);

  }

  searchTag( tag:string ): void {
    if ( tag.length === 0 ) return; //si no escribimos nada y damos al enter no lo guarde en el array un vacio
    this.organizeHistory(tag);
    //console.log(this.tagsHistory);
    const params= new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit','10')
      .set('q', tag)

    //en vez de poner todo esto:'https://api.giphy.com/v1/gifs/search?api_key=OBXIPymFza2DBPWG6dU3zCi7nEe1QEzX&q=Valorant&limit=10' en el get lo va ir guardando en variables
    this.http.get<SearchResponse>(`${ this.serviceUrl }/search`, { params })
    .subscribe( resp => {
      //console.log(resp.data);

      this.gifList = resp.data;
      //console.log({ gifs: this.gifList });

    });
  }

}
