import { Injectable } from '@angular/core';
import {Material} from '../interfaces/material'
@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  materiales:Material[]=[
    {
    id:1,
    nombre:"Software Testing.pdf",
    tipo:"Teorico",
    url:"/v0/b/sistemasacademicopdfs.appspot.com/o/uploads%2F04%20Software%20Testing%202024.pdf?alt=media&token=44b82328-3d0f-49ea-9706-c9d7255f7620"
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
