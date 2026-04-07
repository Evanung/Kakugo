import { Component, signal } from '@angular/core';
import { RouterOutlet, NavigationEnd, ActivatedRoute, Router } from '@angular/router';
import { Header } from './layout/header/header';
import { filter, map } from 'rxjs/operators';
import { Footer } from './layout/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('KakugoWeb');

  showLayout = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        map(() => {
          let route = this.activatedRoute.firstChild;
          while (route?.firstChild) route = route.firstChild;
          return route?.snapshot.data['hideLayout'] ?? false;
        })
      )
      .subscribe(hideLayout => {
        this.showLayout = !hideLayout;
      });
  }
}
