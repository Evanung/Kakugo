import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { EditorModule } from 'primeng/editor';

@Component({
  selector: 'app-text-box',
  imports: [
    FormsModule, EditorModule
  ],
  templateUrl: './text-box.html',
  styleUrl: './text-box.css',
})
export class TextBox {
  text: string = 'Title Here';
}
