import { Component } from '@angular/core';
import { SplitterModule } from 'primeng/splitter';
import { TextBox} from '../../components/write/text-box/text-box';
import { TabsModule } from 'primeng/tabs';
@Component({
  selector: 'app-write-page',
  imports: [SplitterModule, TextBox, TabsModule],
  templateUrl: './write-page.html',
  styleUrl: './write-page.css',
})
export class WritePage {}
