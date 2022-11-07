import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [`
    button {
      margin-right: 5px;
    }
  `]
})

export class PorRegionComponent {

  regiones: string [] = ['EU', 'EFTA', 'CARICOM', 'PA', 'AU', 'USAN', 'EEU', 'AL', 
  'ASEAN', 'CAIS', 'CEFTA', 'NAFTA', 'SAARC'];

  regionActiva: string = '';
  hayError: boolean = false;
  paises: Country[] = [];
  termino: string = '';

  constructor(private paisService: PaisService) { }

  getClassCSS(region: string){
    (region === this.regionActiva) ? 'btn btn-primary' : 'btn btn-outline-primary';
  }

  activarRegion(region: string) {

    if(region === this.regionActiva) {return}
    
    this.regionActiva = region;
    this.termino = region;
    this.paises = [];

    this.paisService.buscarRegion( region )
    .subscribe( (paises) => {
      this.paises = paises;

    }, (err) => {

      this.hayError = true;
      this.paises = [];

    });
  }

}
