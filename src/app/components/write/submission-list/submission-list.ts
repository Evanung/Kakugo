import {Component, input, effect, signal, computed, inject, SecurityContext } from '@angular/core';
import {Avatar} from "primeng/avatar";
import { Post, PostSubmission } from '../../../services/submissions/post-submission';
import { Prompt } from '../../../services/prompt-service';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import {Button, ButtonDirective, ButtonIcon} from 'primeng/button';
import {Menu} from 'primeng/menu';
import { Toast } from 'primeng/toast';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { toSignal } from '@angular/core/rxjs-interop';
import {FormsModule} from '@angular/forms';
import { SanitizeHtmlPipe } from '../../../pipes/sanitize-html.pipe';
import { EditorModule } from 'primeng/editor';
import { DomSanitizer } from '@angular/platform-browser';
import {AuthService} from '../../../services/auth-service';
import {map} from 'rxjs/operators';
import {AccountService} from '../../../services/user/account-service';
import {Accordion, AccordionContent, AccordionHeader, AccordionPanel} from 'primeng/accordion';
import {Fieldset} from 'primeng/fieldset';

@Component({
  selector: 'app-submission-list',
  imports: [
    Avatar, CommonModule, ButtonDirective, Menu, SanitizeHtmlPipe, EditorModule, FormsModule,
    ButtonIcon, Toast, ConfirmDialogModule, Button, FormsModule, Accordion, AccordionPanel, AccordionHeader, AccordionContent, Fieldset
  ],
  templateUrl: './submission-list.html',
  styleUrl: './submission-list.css',
  providers: [MessageService, ConfirmationService],
})
export class SubmissionList {
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);
  private sanitizer = inject(DomSanitizer);
  private postSubmissionService = inject(PostSubmission);
  private authService = inject(AuthService);
  private accountService = inject(AccountService);
  private refreshEffect = effect(() => {
    const _ = this.refresh();
    this.loadPosts();
  });


  prompt = input.required<Prompt>();
  refresh = input<number>(0);
  selectedPost = signal<Post | null>(null);
  currentUserId = toSignal(
    this.authService.currentUser$.pipe(map(user => user?.id ?? null))
  );

  editDescription = '';
  isEditing = signal<boolean>(false);
  posts = signal<any[]>([]);
  emptyPost = computed(() => this.posts().length === 0);

  nativePosts = computed(() => this.posts().filter(p => p.profiles?.role === 'Native'));
  regularPosts = computed(() => this.posts().filter(p => p.profiles?.role !== 'Native'));

  menuItems = computed<MenuItem[]>(() => {
    const post = this.selectedPost();
    if (!post) return [];
    return [
      { label: 'Edit', icon: 'pi pi-pencil', command: () => this.startEdit(post) },
      { label: 'Change Visibility', icon: 'pi pi-eye', command: () => this.toggleVisibility(post) },
      { separator: true },
      { label: 'Delete', icon: 'pi pi-trash', linkClass: '!text-red-500 dark:!text-red-400', command: () => this.deletePostConfirmation() }
    ];
  });

  getPostAvatarUrl(post: Post): string {
    return this.accountService.getAvatarUrl(post.profiles.avatar_url ?? null);
  }

  startEdit(post: Post) {
    this.selectedPost.set(post);
    this.editDescription = post.description;
    this.isEditing.set(true);
  }

  cancelEdit() {
    this.isEditing.set(false);
    this.selectedPost.set(null);
  }
  openMenu(event: Event, post: Post, menu: Menu) {
    this.selectedPost.set(post);
    menu.toggle(event);
  }

  isOwnPost(post: Post): boolean {
    return post.user_id === this.currentUserId();
  }

  loadPosts() {
    this.postSubmissionService.getPostsFromPromptID(this.prompt().id)
      .subscribe(({ data, error }) => {
        this.posts.set(data ?? []);

      });
  }

  async saveEdit() {
    const post = this.selectedPost();
    if (!post) return;
    const sanitizeDescription = this.sanitizer.sanitize(SecurityContext.HTML, this.editDescription) ?? '';

    const { error } = await this.postSubmissionService.editPost(post, sanitizeDescription);

    if (!error) {
      this.posts.update (posts => posts.map(p =>
        p.id === post.id ? { ...p, description: sanitizeDescription } : p
      ));
      this.isEditing.set(false);
      this.selectedPost.set(null);
    }
  }

  async toggleVisibility(post: Post) {
    const { error } = await this.postSubmissionService.toggleVisibility(post);
    if (!error) {
      this.posts.update (posts => posts.map(p =>
        p.id === post.id ? { ...p, is_public: !post.is_public } : p
      ));
      this.messageService.add({ severity: 'info', summary: 'Post SettingsPage', detail: 'Post visibility changed' });
    }
  }

  deletePostConfirmation() {
    this.confirmationService.confirm({
      message: 'Do you want to delete this post?',
      header: 'Delete Post',
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger'
      },
      accept: async () => {
        const post = this.selectedPost();
        if (!post) return;
        const { error } = await this.postSubmissionService.deletePost(post.id);
        if (!error) {
          this.posts.update (posts => posts.filter(p => p.id !== post.id));
          this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Post deleted' });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not delete post' });
        }
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Deletion Cancelled' });
      }
    });
  }

}
