import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SamplesService } from '../../samples.service';

@Component({
    selector: 'app-details-component',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {
    
    samples:any;
    sample:any;
    id:any;

    sample_src:any;
    sample_caption:any;
    sample_url:any;
    sample_desc:any;
    sample_arsenal:any;
    sample_year:any;
    sample_comp:any;
    sample_type:any;
    content_available = false;

  //todo use sample service
  
    // constructor(
    //     private route: ActivatedRoute, private samples_service: SamplesService, private http: HttpClient ){}
    constructor(
        private route: ActivatedRoute, private http: HttpClient ){}

    parseData(){
        this.sample_src = this.sample.src;
        this.sample_caption = this.sample.caption;
        this.sample_url = this.sample.url;
        this.sample_desc = this.sample.desc;
        this.sample_arsenal = this.sample.arsenal;
        this.sample_year = this.sample.year;
        this.sample_comp = this.sample.comp;
        this.sample_type = this.sample.type;
    }

    getSampleById () {
        this.http.get('assets/samples.json').subscribe(server_data => {
            this.samples = server_data;
            this.sample = this.samples.find((item:any) => item.id === this.id);
            this.parseData();
        });
    }

    getId() {
        this.route.params.subscribe( params => {
            this.id = params['id'];
            this.getSampleById();
        })

    }

    ngOnInit() {
        this.getId();
    }
    
}