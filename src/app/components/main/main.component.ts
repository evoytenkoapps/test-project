import { Component, Inject, OnInit } from '@angular/core';
import { ViewService } from '../../view.service';
import { APP_FACTORY } from '../../app.module';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  constructor(private viewService: ViewService, @Inject(APP_FACTORY) private appFactory: any) {}

  ngOnInit(): void {
    console.log(this.viewService.getView());

    console.log('this.apptoken(1)', this.appFactory(1));

    setTimeout(() => {
      this.appFactory(1);
    }, 2000);
  }
}
