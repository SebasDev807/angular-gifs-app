import { GifsService } from './../../services/gifs.service';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h4>Buscar:</h4>
    <input type="text"
      class="form-control"
      placeholder="Buscar Gifs..."
      #txtTagInput
      (keyup.enter)="searchTag()"

    >
  `
})

export class SearchBoxComponent {

  constructor(private gifsService: GifsService) { }

  @ViewChild('txtTagInput')
  tagInput!: ElementRef<HTMLInputElement>;

  searchTag() {
    const newTag = this.tagInput.nativeElement.value;
    this.gifsService.searchTag(newTag);
    this.tagInput.nativeElement.value = '';
  }
}
