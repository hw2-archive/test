import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import * as RX from 'rxjs';
import { AppConfigService } from 'src/app/config.service';
import * as axFn from 'src/libs/axios.functions';
import { TrainerType } from './trainer.dto';

@Injectable()
export class TrainerService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: AppConfigService,
  ) {}

  getTrainer(id: string): RX.Observable<AxiosResponse<TrainerType>> {
    return this.httpService
      .get(`${this.configService.apiBaseUrl}/trainers/${id}`)
      .pipe(axFn.getFirstData());
  }
}
