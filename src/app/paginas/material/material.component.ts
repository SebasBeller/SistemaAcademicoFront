import { FormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist';
import {
  ChangeDetectionStrategy,
  Component,
  signal,
  inject
} from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import {PdfService} from '../../servicios/pdf.service'
import { MaterialService } from '../../servicios/material.service';
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-material',
  standalone: true,
  imports: [FormsModule, PdfViewerModule, MatExpansionModule],
  templateUrl: './material.component.html',
  styleUrl: './material.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialComponent {
  readonly panelOpenState = signal(false);

  private src!:string;
  materialesServicio:MaterialService=inject(MaterialService) 
  route:ActivatedRoute=inject(ActivatedRoute) 

  private pdfService=inject(PdfService)
  responseTeory?: string;
  constructor(){
    let link=this.route.snapshot.params['id'];
    this.src='/api'+link;
    console.log(link)
  }
  getSrc():string{
    return this.src;
  }

  async readPdf(pdf: PDFDocumentProxy) {
    this.pdfService.readPdf(pdf).then(
      (data)=>{
        this.responseTeory=data
      }
    ).catch(
      (e)=>console.log(e)
    );
  }
}
