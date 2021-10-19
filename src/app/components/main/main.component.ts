import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../view.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  constructor(private viewService: ViewService) {}

  ngOnInit(): void {
    console.log(this.viewService.getView());
  }
}
