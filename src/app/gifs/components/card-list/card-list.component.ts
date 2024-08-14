import { Component, Input } from '@angular/core';
import { Gif } from '../../interface/gif-response.interface';

@Component({
  selector: 'gifs-card-list',
  styleUrls: ['./card-list.component.css'],
  templateUrl: './card-list.component.html'
})
export class CardListComponent {

  @Input()
  public gifs: Gif[] = [];

}

