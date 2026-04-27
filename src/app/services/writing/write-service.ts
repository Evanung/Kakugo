import { Injectable, inject } from '@angular/core';
import { SupabaseService} from '../supabase-service';
import { environment} from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WriteService {
  private supabaseService = inject(SupabaseService)

  private stripHtml(html: string): string {
    const tmp = document.createElement('div')
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ''
  }

  async improveText(text: string): Promise<{ improved: string, detectedLanguage: string }> {
    const { data: { session } } = await this.supabaseService.client.auth.getSession()

    if (!session) {
      throw new Error('No session found')
    }

    const plainText = this.stripHtml(text)

    const response = await fetch(
      `${environment.supabaseUrl}/functions/v1/improve-text`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({ text: plainText })
      }
    )
    const data = await response.json()
    if (!response.ok) {
      throw new Error(`Failed: ${response.status}`)
    }

    return {
      improved: data.improvements[0].text,
      detectedLanguage: data.improvements[0].detected_source_language
    }
  }

  async translate(text: string, sourceLanguage: string, targetLanguage: string): Promise<string> {
    const { data: { session } } = await this.supabaseService.client.auth.getSession()

    if (!session) {
      throw new Error('No session found')
    }

    const response = await fetch(
      `${environment.supabaseUrl}/functions/v1/translate`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          text,
          source_lang: sourceLanguage,
          target_lang: targetLanguage
        })
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(`Failed: ${response.status}`)
    }

    return data.translated
  }
}
