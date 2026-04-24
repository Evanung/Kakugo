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
    console.log('Sending text:', plainText) // check what's being sent

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

    console.log('Response status:', response.status) // check status

    const data = await response.json()
    console.log('Response data:', data) // check what came back

    if (!response.ok) {
      throw new Error(`Failed: ${response.status}`)
    }

    return {
      improved: data.improvements[0].text,
      detectedLanguage: data.improvements[0].detected_source_language
    }
  }
}
