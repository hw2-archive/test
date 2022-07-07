import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './app.config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService<AppConfig>) {}

  get apiBaseUrl(): string {
    return this.configService.get<AppConfig>('apiBaseUrl', { infer: true });
  }

  get port(): number {
    return this.configService.get<AppConfig>('appPort', { infer: true });
  }
}
