import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import 'rxjs/add/operator/delay';

@Injectable()
export class FeedNotificationService {

  constructor(private http: HttpClient) {
  }

  getExistingSystem(url: string) {
    return this.http.get<any>(url + '?' + new Date().getTime());
  }

  deleteNotification(url, notObj) {
    return this.http.post(url, notObj);
  }

}
