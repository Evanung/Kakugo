import { Component, signal } from '@angular/core';
import {Button} from "primeng/button";
import {IconField} from "primeng/iconfield";
import {InputIcon} from "primeng/inputicon";
import {InputText} from "primeng/inputtext";

@Component({
  selector: 'app-grammar',
    imports: [
        Button,
        IconField,
        InputIcon,
        InputText
    ],
  templateUrl: './grammar.html',
  styleUrl: './grammar.css',
})
export class Grammar {
  word = signal('');

  onSearch() {

  }
}
