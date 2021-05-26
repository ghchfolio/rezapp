import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//never put ';' after the @Injectable()
@Injectable({
  providedIn: 'root'
})
export class SamplesService {

  constructor(private _http: HttpClient) { }

  samples: any;
  
  getSamples() {
    if (this.samples == null) {
      this.samples = this._http.get('assets/samples.json');
    }
    return this.samples;
  }
}
