import { Component, output, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorModule } from 'primeng/editor';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { PostSubmission } from '../../../services/submissions/post-submission';
import { SupabaseService } from '../../../services/supabase-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-text-box',
  imports: [FormsModule, EditorModule, ToggleButtonModule],
  templateUrl: './text-box.html',
  styleUrl: './text-box.css',
})
export class TextBox implements OnInit {
  private postSubmissionService = inject(PostSubmission);
  private supabaseService = inject(SupabaseService);
  private route = inject(ActivatedRoute);

  text = signal('');
  title: string = 'Title Test';
  error = signal<string | null>(null);

  onTextChange = output<string>();

  async ngOnInit() {
    const promptId = this.route.snapshot.paramMap.get('id');
    const { data: { user } } = await this.supabaseService.client.auth.getUser();

    if (user && promptId) {
      const { data } = await this.postSubmissionService.getDraft(user.id, Number(promptId));
      if (data) {
        this.text.set(data.description);
      }
    }
  }


}
