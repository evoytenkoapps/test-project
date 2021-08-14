import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  public getText(): string {
    console.log('function');
    return 'function';
  }

  get text(): string {
    console.log('getter');
    return 'getter';
  }

  public onClick(): void {
    console.log('onClick');
  }
}
