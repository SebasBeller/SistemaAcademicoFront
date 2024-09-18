import { FormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist';
import {ChangeDetectionStrategy, Component, signal,inject, OnInit} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import Groq from 'groq-sdk';
import { Storage, ref, getDownloadURL } from '@angular/fire/storage';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-material',
  standalone: true,
  imports: [FormsModule, PdfViewerModule,MatExpansionModule,CommonModule],
  templateUrl: './material.component.html',
  styleUrl: './material.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialComponent  {
  readonly panelOpenState = signal(false);
  src: string="/api/v0/b/sistemasacademicopdfs.appspot.com/o/uploads%2FSEMANA%207%20CATO%202-2024%20(1).pdf?alt=media&token=d5b65f56-d4a0-4f29-8b78-1b9319b3cf7e";

  
  groq: any;
  responseTeory?:string |null;
  constructor() {
    this.groq = new Groq({
      apiKey: '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',
      dangerouslyAllowBrowser: true,
    });
  }


  async getChatCompletion(text: string): Promise<any> {
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
