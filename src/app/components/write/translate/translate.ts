import {Component, inject, output, signal} from '@angular/core';
import {Button} from "primeng/button";
import {WriteService} from '../../../services/writing/write-service';
import { FormsModule } from '@angular/forms';
import {Textarea} from 'primeng/textarea';

@Component({
  selector: 'app-translate',
  imports: [
    Button,
    Textarea,
    FormsModule,
  ],
  templateUrl: './translate.html',
  styleUrl: './translate.css',
})
export class Translate {
  private writeService = inject(WriteService);

  // Text box variables
  text = signal('');
  translation = signal('');

  checking = signal(false);
  error = signal<string | null>(null);

  // Default language is EN to JP, can be switched between
  targetLanguage = signal('JA');
  sourceLanguage = signal('EN');

  // Switch between languages. Update with signals
  switchLanguage() {
    const temp = this.sourceLanguage();
    this.sourceLanguage.set(this.targetLanguage());
    this.targetLanguage.set(temp);
  }
  clearText(){
    this.text.set('');
  }
  async translateText() {
    if (!this.text().trim()) return

    this.checking.set(true)
    this.error.set(null)

    try {
      const result = await this.writeService.translate(this.text(), this.sourceLanguage(), this.targetLanguage())
      this.translation.set(result);
    } catch (err) {
      this.error.set('Something went wrong, please try again')
    } finally {
      this.checking.set(false)
    }
  }

}
