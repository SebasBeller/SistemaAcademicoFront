import { Injectable } from '@angular/core';
import {Material} from '../interfaces/material'
@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  materiales:Material[]=[
    {
    id:1,
    nombre:"PRACTICAia_RPK8.pdf",
    tipo:"Teorico",
    url:"/v0/b/sistemasacademicopdfs.appspot.com/o/uploads%2FPRACTICAia_RPK8.pdf?alt=media&token=d76094a4-4243-4ada-b25c-7e3edc65b2b0"
  },
  {
    id:2,
    nombre:"6 PROGRAMACION DE OPERACIONES.pdf",
    tipo:"Teorico",
    url:"/v0/b/sistemasacademicopdfs.appspot.com/o/uploads%2F6%20PROGRAMACION%20DE%20OPERACIONES.pdf?alt=media&token=4c827a9b-e157-4bc1-88cf-3eca4788d48c"
  },
  {
    id:3,
    nombre:"Trigonometria.pdf",
    tipo:"Teorico",
    url:"/v0/b/sistemasacademicopdfs.appspot.com/o/uploads%2FTrigonometria.pdf?alt=media&token=cd223d2f-e6d1-4872-956b-1d8cfbb2202a"
  }
]
  constructor() { }
  addMaterial(id:number,nombre:string,tipo:string,url:string):void{
    this.materiales.push({id:id,nombre:nombre,tipo:tipo,url:url})
  }
  getMateriales():Material[]{
    return this.materiales;
  }
}
