import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  url: string = '/assets/data.json';
  items: any[] = [];
  Selecteditems: any[] = [];
  showID: number[] = [];
  searchData: string = "";

  constructor(private http: HttpClient) {
    this.http.get(this.url).toPromise().then(async res => {
      this.items = this.Selecteditems = await this.getData(res)
    });
  };
  searchBar(event: any) {
    this.searchData = event.target.value.toLowerCase().toString();
    if (this.items) {
      var i: number = 0;
      this.Selecteditems = [];
      for (let data in this.items) {
        if (this.items[data]["description"]) {
          let description: string = this.items[data]["description"];
          if(description.toLowerCase().includes(this.searchData))
            this.Selecteditems.push(this.items[data]);
        };
      };
    };
  };
  async getData(res: any) {
    var result: any = res["response"]["data"];
    return result;
  };
}