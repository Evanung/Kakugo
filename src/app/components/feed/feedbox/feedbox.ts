import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-feedbox',
  imports: [
    AvatarModule,
  ],
  templateUrl: './feedbox.html',
  styleUrl: './feedbox.css',
})
export class Feedbox {
}
