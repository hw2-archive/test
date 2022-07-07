import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import * as RX from 'rxjs';
import { AppConfigService } from 'src/app/config.service';
import * as axFn from 'src/libs/axios.functions';
import { LearnerType } from './learner.dto';

@Injectable()
export class LearnerService {
  constructor(
    private readonly httpService: HttpService,
    private configService: AppConfigService,
  ) {}

  getLearner = (id: string): RX.Observable<AxiosResponse<LearnerType>> => {
    return this.httpService
      .get(`${this.configService.apiBaseUrl}/learners/${id}`)
      .pipe(axFn.getFirstData());
  };
}
