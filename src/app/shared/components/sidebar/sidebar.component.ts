import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  isSidebarHidden = false;

  constructor(private gifsService: GifsService) { }

  searchGif(tag: string): void {
    this.gifsService.searchTag(tag);
  }

  get tags(): string[] {
    return this.gifsService.tagsHistory;
  }
}
