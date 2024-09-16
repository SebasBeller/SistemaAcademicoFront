import { FormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist';
import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import Groq from 'groq-sdk';
@Component({
  selector: 'app-material',
  standalone: true,
  imports: [FormsModule, PdfViewerModule,MatExpansionModule],
  templateUrl: './material.component.html',
  styleUrl: './material.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialComponent {
  readonly panelOpenState = signal(false);
  src =
    '/api/v0/b/pdf-storage-67ae3.appspot.com/o/Trigonometria.pdf?alt=media&token=33709e51-f1f2-4c5e-bcf0-4cc9e52a261a';
  groq: any;
  responseTeory?:string;
  constructor() {
    this.groq = new Groq({
      apiKey: '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',
      dangerouslyAllowBrowser: true,
    });
  }

  async getChatCompletion(text: string): Promise<any> {
    console.log(this.groq.chat.completions);
    console.log('Request Data:', {
      messages: [
        {
          role: 'user',
          content: 'Explain the following text: ' + text,
        },
      ],
      model: 'llama-3.1-70b-versatile',
    });
    const response = await this.groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: 'Explicame el siguiente texto y dame la respuesta solo en elementos de html porfavor. No uses markdown. Por favor, proporciona la respuesta exclusivamente en elementos HTML, usa todos los elementos de texto de html que puedas:' + text+' porfavor',
        },
      ],
      model: 'llama-3.1-8b-instant',
    });

    console.log('API Response:', response);
    return response;
  }
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
    this.responseTeory= await this.getChatCompletion(extractedText).then(
      (res) => res.choices[0]?.message?.content || '');
  }
}
