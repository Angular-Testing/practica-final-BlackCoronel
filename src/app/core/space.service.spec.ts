import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {SpaceService} from './space.service';

fdescribe('GIVEN the SpaceService isolated from remote server', () => {
  let service: SpaceService;
  let controller: HttpTestingController;
  let inputBaseUrl: string;
  const limit = 10;
  const mode = '&mode=list';
  beforeEach(() => {
    inputBaseUrl = 'https://lldev.thespacedevs.com/2.0.0/launch/upcoming/';
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(SpaceService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('WHEN getUpcomingLaunches$ is called', () => {
    beforeEach(() => {
      service.getUpcomingLaunches$().subscribe();
    });
    it('THEN it should call the right url', () => {
      controller.expectOne(inputBaseUrl + '?limit=' + limit + mode);
    });
  });
  describe('WHEN getUpcomingLaunches$ is called', () => {
    let testRequest: TestRequest;
    beforeEach(() => {
      service.getUpcomingLaunches$(limit).subscribe();
      testRequest = controller.expectOne(inputBaseUrl + '?limit=' + limit + mode);
    });
    it('THEN request should be sent by expected method', () => {
      expect(testRequest.request.method).toBe('GET');
    });
  });
});
