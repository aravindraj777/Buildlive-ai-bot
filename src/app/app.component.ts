import { Component,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SkeletonComponent } from "./skeleton/skeleton.component";
import { FormsModule } from '@angular/forms';
import { GeminiService } from './gemini.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, SkeletonComponent,FormsModule]
})
export class AppComponent {
  title = 'chatbot';
  loading:boolean = false;

  prompt:string = '';

  geminiService: GeminiService = inject(GeminiService);

  chatHistory: any[] = [];
  constructor(){
    this.geminiService.getMessageHistory().subscribe((res)=>{
        if(res){
          this.chatHistory.push(res);
        }
    })
  }

 async sendData(){
    if(this.prompt){
      this.loading = true;
      const data = this.prompt;
      this.prompt = '';
     await this.geminiService.generateText(data);
     this.loading = false;
    }
  }
}
