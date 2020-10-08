import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { LyricsService } from './lyrics.service';

describe('LyricsService', () => {
  let service: LyricsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(LyricsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
