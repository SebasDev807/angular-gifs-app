import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, GIFResponse } from '../interface/gif-response.interface';


@Injectable({ providedIn: 'root' })
export class GifsService {

  public gifList: Gif[] = [];
  private apiKey: string = 'i0TbTpd6oy3KwlQnVp05mFuA4Pbhn2DP';
  private url: string = 'https://api.giphy.com/v1/gifs'
  private _tagsHistory: string[] = [];

  public constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }


  public get tagsHistory() {
    return [...this._tagsHistory];
  }

  public searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag)
      .set('api_key', this.apiKey)

    this.http.get<GIFResponse>(`${this.url}/search`, { params })
      .subscribe((res) => {
        this.gifList = res.data;
      });
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if (this.tagsHistory.includes(tag)) {
      this._tagsHistory = this.tagsHistory.filter((oldTag) => oldTag !== tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this.tagsHistory.splice(0, 10);
    this.saveLocalStorage();

  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    if (!localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    if(this._tagsHistory.length === 0)return;
    this.searchTag(this._tagsHistory[0]);
  }

  // private loadLastTag(): void {
  //   this.searchTag(this._tagsHistory[0]);
  // }
}
