import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MysqlQueryService } from '@keira-shared/services/mysql-query.service';
import { MockedMysqlQueryService, MockedToastrService } from '@keira-testing/mocks';
import { ToastrService } from 'ngx-toastr';
import { instance } from 'ts-mockito';
import { ForgeHandlerService } from '../forge-handler.service';
import { ForgeTalentService } from './forge-talent.service';

describe('ForgeTalentService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: MysqlQueryService, useValue: instance(MockedMysqlQueryService) },
        { provide: ToastrService, useValue: instance(MockedToastrService) },
        ForgeHandlerService,
        ForgeTalentService,
      ],
    }),
  );

  it('should be created', () => {
    const service: ForgeTalentService = TestBed.inject(ForgeTalentService);
    expect(service).toBeTruthy();
  });
});
