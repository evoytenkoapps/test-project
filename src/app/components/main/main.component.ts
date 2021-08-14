import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit, AfterViewInit {
  constructor() {}

  ngOnInit(): void {
    console.log('ngOnInit');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
  }

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
