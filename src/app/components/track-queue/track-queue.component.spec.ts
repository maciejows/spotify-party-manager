import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackQueueComponent } from './track-queue.component';

describe('TrackQueueComponent', () => {
  let component: TrackQueueComponent;
  let fixture: ComponentFixture<TrackQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
