import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  standalone: false,

  templateUrl: './lazy-image.component.html',
})
export class LazyImageComponent implements OnInit {


  @Input()
  public url!: string;

  @Input()
  public alt: string = '';

  public hasLoaded: boolean = false;

  ngOnInit(): void {
    if ( !this.url ) throw new Error('URL property is required');

  }

  onLoad(){
    setTimeout(() => { //esto hace que todas las imagenes esperen un segundo y despues se cargan
      this.hasLoaded = true;
    }, 1000);
    //console.log('Image loaded');

  }




}
