import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { Feedbox } from '../feedbox/feedbox';

interface NavItem {
  id: string;
  label: string;
}

@Component({
  selector: 'app-feedlist',
  imports: [CommonModule, FormsModule, AvatarModule, ButtonModule, Feedbox],
  templateUrl: './feedlist.html',
  styleUrl: './feedlist.css',
})
export class Feedlist {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;

  navs = signal<NavItem[]>([
    {
      id: 'inbox',
      label: 'Top'
    },
    {
      id: 'following',
      label: 'New'
    },
    {
      id: 'all',
      label: 'Trending'
    },
    {
      id: 'archived',
      label: 'Following'
    }
  ]);

  selectedNav = signal('inbox');
  indicatorWidth = signal(0);
  indicatorLeft = signal(0);

  ngAfterViewInit() {
    setTimeout(() => this.updateIndicator(), 0);
  }

  private updateIndicator(): void {
    const activeIndex = this.navs().findIndex((item) => item.id === this.selectedNav());
    const tabElements = this.scrollContainer.nativeElement.querySelectorAll('li');

    if (tabElements[activeIndex]) {
      const activeTab = tabElements[activeIndex].querySelector('a') as HTMLElement;
      if (activeTab) {
        this.indicatorWidth.set(activeTab.offsetWidth);
        this.indicatorLeft.set(activeTab.offsetLeft);
      }
    }
  }

  setActiveTab = (index: number): void => {
    this.selectedNav.set(this.navs()[index].id);

    setTimeout(() => {
      const tabElements = this.scrollContainer.nativeElement.querySelectorAll('li');
      if (tabElements[index]) {
        const tab = tabElements[index].querySelector('a') as HTMLElement;
        const container = this.scrollContainer.nativeElement;

        if (tab.offsetLeft < container.scrollLeft) {
          container.scrollTo({ left: tab.offsetLeft, behavior: 'smooth' });
        } else if (tab.offsetLeft + tab.offsetWidth > container.scrollLeft + container.offsetWidth) {
          container.scrollTo({ left: tab.offsetLeft - container.offsetWidth + tab.offsetWidth, behavior: 'smooth' });
        }
      }
      this.updateIndicator();
    }, 0);
  };
}
