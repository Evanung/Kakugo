import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SecurityContext } from '@angular/core';

@Pipe({ name: 'sanitizeHtml', standalone: true })
export class SanitizeHtmlPipe implements PipeTransform {
  private sanitizer = inject(DomSanitizer);

  transform(value: string): SafeHtml {
    // sanitize() strips XSS vectors; bypassSecurityTrustHtml lets Angular render the result
    const sanitized = this.sanitizer.sanitize(SecurityContext.HTML, value) ?? '';
    return this.sanitizer.bypassSecurityTrustHtml(sanitized);
  }
}
