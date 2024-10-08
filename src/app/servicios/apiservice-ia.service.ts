import { Injectable } from '@angular/core';
import Groq from 'groq-sdk';

@Injectable({
  providedIn: 'root',
})
export class APIServiceIAService {
  private readonly groq: any;
  constructor() {
    this.groq = new Groq({
      apiKey: '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',
      dangerouslyAllowBrowser: true,
    });
  }
  async askProfessorChat(
    promptFirstRole: string,
    firstRole: string,
    promptSecondRoleProfessor: string,
    secondRole: string
  ): Promise<string> {
    let messages:any=  [
      {
        role: firstRole,
        content: promptFirstRole,
      },
      {
        role: secondRole,
        content: promptSecondRoleProfessor,
      },
    ]
    const response = await this.groq.chat.completions.create({
      messages:messages,
      // model: 'llama3-groq-8b-8192-tool-use-preview',

      model: 'llama-3.1-70b-versatile',
      // model: 'llama-3.1-8b-instant',
    });
    const htmlResponse = response.choices[0].message.content;
    console.log('API Response:', htmlResponse);
    return htmlResponse;
  }
}
