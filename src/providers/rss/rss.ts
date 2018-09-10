import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RssProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RssProvider {

  constructor(public http: HttpClient) {
    console.log('Hello RssProvider Provider');
  }

  getRSS() 
  {
    const RSS_URL: any = "http://gazoh.net/rss.xml";
    const API: any = "wtxfwzfeaqeianrqzzzqfpirznx0hern2hpa2xsz";
    const count: any = 50;
    const API_URL: any = "https://api.rss2json.com/v1/api.json";
    const response = this.http.post(API_URL, {},{params: {'rss_url': RSS_URL, 'api_key': API, 'count': count}});
    return response;
  }
}
