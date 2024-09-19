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
  private src:string =
    '/api/v0/b/pdf-storage-67ae3.appspot.com/o/Trigonometria.pdf?alt=media&token=33709e51-f1f2-4c5e-bcf0-4cc9e52a261a';
  private pdfService=inject(PdfService)
  responseTeory?: string;

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
