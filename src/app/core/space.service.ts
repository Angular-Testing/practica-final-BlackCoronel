import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResult } from '../models/api-result';
import { Launch } from '../models/launch';
import { QueryParams } from '../models/query-params';

@Injectable({
  providedIn: 'root',
})
export class SpaceService {
  private launchesUrl = `${environment.rootUrl}launch/`;
  private modeList = 'mode=list';

  constructor(private http: HttpClient) {}

  getUpcomingLaunches$(limit = 10): Observable<Launch[]> {
    const url = `${this.launchesUrl}upcoming/?limit=${limit}&${this.modeList}`;
    return this.http.get<ApiResult>(url).pipe(map(data => data.results));
  }

  getSearchedLaunches$(queryParams: QueryParams): Observable<Launch[]> {
    const url = `${this.launchesUrl}?limit=${queryParams.limit}&search=${queryParams.searchTerm}&${this.modeList}`;
    return this.http.get<ApiResult>(url).pipe(map(data => data.results));
  }

  getLaunch$(id: string): Observable<Launch> {
    const url = `${this.launchesUrl}${id}`;
    return this.http.get<Launch>(url);
  }
  getLaunchBySlug$(slug: string): Observable<Launch> {
    const url = `${this.launchesUrl}?slug=${slug}`;
    return this.http.get<ApiResult>(url).pipe(map(data => data.results[0]));
  }
}
