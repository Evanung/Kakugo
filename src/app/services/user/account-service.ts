import {inject, Injectable} from '@angular/core';
import {SupabaseService} from '../supabase-service';
import {BehaviorSubject} from 'rxjs';

export interface Profile {
  id: string;
  display_name: string;
  avatar_url: string | null;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private supabase = inject(SupabaseService);

  private profileSubject = new BehaviorSubject<Profile | null>(null);
  profile$ = this.profileSubject.asObservable();

  async loadProfile(userId: string): Promise<void> {
    if (this.profileSubject.value) return;

    const { data, error } = await this.supabase.client
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    this.profileSubject.next(data as Profile);
  }

  async uploadAvatar(file: File, userId: string): Promise<void> {
    const fileExt = file.name.split('.').pop();
    const filePath = `${userId}/avatar.${fileExt}`;

    const { error } = await this.supabase.client.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true });

    if (error) throw error;

    await this.supabase.client
      .from('profiles')
      .update({ avatar_url: filePath })
      .eq('id', userId);

    const current = this.profileSubject.value;
    if (current) this.profileSubject.next({ ...current, avatar_url: filePath });
  }

  getAvatarUrl(path: string | null, displayName?: string): string {
    if (!path) {
      const name = encodeURIComponent(displayName ?? 'User');
      return `https://wrwtjkxcjubxlpadntkw.supabase.co/storage/v1/object/public/avatars/default_pfp.png`;
    }
    return this.supabase.client.storage
      .from('avatars')
      .getPublicUrl(path).data.publicUrl;
  }
}
