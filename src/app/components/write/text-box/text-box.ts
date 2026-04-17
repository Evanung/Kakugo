import {Component, output } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { EditorModule } from 'primeng/editor';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { SkeletonModule } from 'primeng/skeleton';
@Component({
  selector: 'app-text-box',
  imports: [
    FormsModule, EditorModule,ToggleButtonModule
  ],
  templateUrl: './text-box.html',
  styleUrl: './text-box.css',
})
export class TextBox {
  text: string = '';
  title: string = 'Title Test';

  onTextChange = output<string>();

}
