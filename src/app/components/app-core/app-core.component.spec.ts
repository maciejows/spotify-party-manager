import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { authReducer } from '@store/auth/auth.reducer';
import { playerReducer } from '@store/player/player.reducer';
import { AppCoreComponent } from './app-core.component';

describe('AppCoreComponent', () => {
  let component: AppCoreComponent;
  let fixture: ComponentFixture<AppCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppCoreComponent],
      imports: [
        StoreModule.forRoot({ auth: authReducer, player: playerReducer })
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
