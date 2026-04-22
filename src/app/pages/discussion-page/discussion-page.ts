import { Component } from '@angular/core';
import { Feedlist } from '../../components/feed/feedlist/feedlist';

@Component({
  selector: 'app-discussion-page',
  imports: [ Feedlist],
  templateUrl: './discussion-page.html',
  styleUrl: './discussion-page.css',
})
export class DiscussionPage {}
