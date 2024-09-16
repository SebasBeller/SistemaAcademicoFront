import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import {PDFDocumentProxy, PDFPageProxy} from 'pdfjs-dist';
@Component({
  selector: 'app-material',
  standalone: true,
  imports: [FormsModule, PdfViewerModule],
  templateUrl: './material.component.html',
  styleUrl: './material.component.sass'
})
export class MaterialComponent {
  src = '/api/v0/b/pdf-storage-67ae3.appspot.com/o/Trigonometria.pdf?alt=media&token=33709e51-f1f2-4c5e-bcf0-4cc9e52a261a';
  async readPdf(pdf: PDFDocumentProxy) {
    console.log('PDF loaded successfully.');
    console.log('Number of pages:', pdf.numPages);
    const page: PDFPageProxy = await pdf.getPage(1);
    const textContent = await page.getTextContent();
    console.log(textContent)
    let extractedText = '';

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      const page: PDFPageProxy = await pdf.getPage(pageNumber);
      const textContent = await page.getTextContent();

      const pageText = textContent.items.map(item => (item as any).str).join(' ');

      extractedText += `Page ${pageNumber}:\n${pageText}\n\n`;
    }
    console.log(extractedText)
  }
}
