import { Injectable } from '@angular/core';
import { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist';
import { APIServiceIAService } from './apiservice-ia.service';
import {
  inject,
} from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private groqService: any = inject(APIServiceIAService);
  promptStudent: string =
    'Soy un estudiante, me podria explícame el siguiente texto, agregando contneido teorico extra y dame la respuesta solo en elementos de HTML por favor. No uses markdown. Proporciona la respuesta exclusivamente en elementos HTML, usa todos los elementos de texto de HTML que puedas: ';
  promptProfessor: string =
    'Eres un profesor capaz de analizar el texto y proporcionar más información teorica adicional sobre el tema usando elementos de HTML. No uses markdown. Debes solo con datos teoricos.';
    
  async readPdf(pdf: PDFDocumentProxy) {
    console.log('PDF loaded successfully.');
    console.log('Number of pages:', pdf.numPages);
    const page: PDFPageProxy = await pdf.getPage(1);
    const textContent = await page.getTextContent();
    console.log(textContent);
    let extractedText = '';

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      const page: PDFPageProxy = await pdf.getPage(pageNumber);
      const textContent = await page.getTextContent();

      const pageText = textContent.items
        .map((item) => (item as any).str)
        .join(' ');

      extractedText += `Page ${pageNumber}:\n${pageText}\n\n`;
    }
    return await this.groqService.askProfessorChat(
      this.promptStudent + extractedText,'user',
      this.promptProfessor,'system',
    );

  }
}
