import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { SomeService } from '../../some.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit, AfterViewInit {
  public someText: string = 'someText';

  constructor(private changeDetectorRef: ChangeDetectorRef, private someService: SomeService) {}

  ngOnInit(): void {
    console.log('ngOnInit');

    setTimeout(() => {
      this.someText = '+';
      // this.changeDetectorRef.markForCheck();
    }, 2000);

    interval(2000).subscribe(() => {
      console.log('interval');
      this.someText = '-';
    });

    this.someService.getData().subscribe((data) => {
      console.log('data', data);
      this.someText = data;
    });
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
