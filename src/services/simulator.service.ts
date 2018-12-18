import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';

@Injectable()
export class SimulatorService {

  constructor(private http: Http) { } 

  url: string;
  //api_key: string = 'Ep32Kp9e0GWmxPOrr1FxLTY8N74DfEsl';

  getGlobalIrr() {
    //headers.append('Authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MDIzMjE2MzcsInVzZXJfaWQiOjQsImNvbXBhbnlfaWQiOjIsImFjY291bnQiOls5NywxMDAsMTA5LDEwNSwxMTBdLCJwZXJtaXNzaW9ucyI6IlJPT1QifQ.9fqh10xaAsMZLxUCEYQY71d0RhzHidbILstZwA0HfzU');
    //let options = new RequestOptions({ headers: headers });
    //this.url = https://api.solcast.com.au/radiation/forecasts?longitude=149.117&latitude=-35.277&api_key=Ep32Kp9e0GWmxPOrr1FxLTY8N74DfEsl
    
    let headers = new Headers({ 'Accept': 'application/json' });    
    //this.url = 'https://developer.nrel.gov/api/solar/solar_resource/v1.json?api_key=' + this.api_key + '&lat='+ lat + '&lon=' + long;
    //this.url = 'https://api.solcast.com.au/radiation/forecasts?longitude='+long+'&latitude='+lat+'&format=json&api_key='+this.api_key;
    
    return this.http.get('http://localhost/ic/simulador/src/services/data.json').map((response: Response) => {
      return response.json();
    })
  }

}