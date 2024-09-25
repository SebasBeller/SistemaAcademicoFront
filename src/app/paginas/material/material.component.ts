import { FormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PDFDocumentProxy } from 'pdfjs-dist';
import {
  ChangeDetectionStrategy,
  Component,
  signal,
  inject,OnInit
} from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import {PdfService} from '../../servicios/pdf.service'
import { MaterialService } from '../../servicios/material.service';
import {ActivatedRoute} from '@angular/router'
import { Material } from '../../interfaces/material';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-material',
  standalone: true,
  imports: [FormsModule, PdfViewerModule, MatExpansionModule, CommonModule],
  templateUrl: './material.component.html',
  styleUrl: './material.component.sass',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialComponent {
  isOpen?:boolean; 
  toggle() {
    console.log("hola")
    this.isOpen = !this.isOpen; 
  }
  readonly panelOpenState2 = signal(false);
  panelOpenState: boolean = false;
  private src!:string;
  materialesServicio:MaterialService=inject(MaterialService) 
  route:ActivatedRoute=inject(ActivatedRoute) 

  private pdfService=inject(PdfService)
  response?: string;

  material?:Material;
  
  id_material?:number;
  constructor(){

    this.id_material=this.route.snapshot.params['id'];

  }

  ngOnInit(): void {
    this.isOpen = false; 
    this.materialesServicio.encontrarMaterial(this.id_material).subscribe(
      (data)=>{
          this.material=data
          this.src='/api'+this.material?.url
          console.log(data)

      },
      error => {
        console.error('Error en la petición GET:', error);
      }
    )
  }
  getSrc():string{
    return this.src;
  }

  async readPdf(pdf: PDFDocumentProxy) {
    this.pdfService.readPdf(pdf,this.material?.tipo).then(
      (data)=>{
        this.response=data
      }
    ).catch(
      (e)=>console.log(e)
    );
  }
}
