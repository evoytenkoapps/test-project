import { Component, Inject, OnInit } from '@angular/core';
import { ViewService } from '../../view.service';
import { APP_TOKEN } from '../../app.module';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  constructor(private viewService: ViewService, @Inject(APP_TOKEN) private apptoken: any) {}

  ngOnInit(): void {
    console.log(this.viewService.getView());

    console.log('this.apptoken(1)', this.apptoken(1));

    setTimeout(() => {
      this.apptoken(1);
    }, 2000);
  }
}
