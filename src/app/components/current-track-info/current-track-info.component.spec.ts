import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentTrackInfoComponent } from './current-track-info.component';

describe('CurrentTrackInfoComponent', () => {
  let component: CurrentTrackInfoComponent;
  let fixture: ComponentFixture<CurrentTrackInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentTrackInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentTrackInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
