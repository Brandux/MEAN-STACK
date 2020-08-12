import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Empleyee } from '../models/empleyee';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  selectedEmployee: Empleyee;
  readonly URL_API = 'http://localhost:3000/api/employees';
  constructor(private http:  HttpClient) { }

  getEmployes() {
    return this.http.get(this.URL_API);
  }


  postEmployes(data: Empleyee) {
    return this.http.post(this.URL_API, data);
  }

}
