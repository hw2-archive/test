import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AppLogger } from './logger.service';

@Injectable()
export class EventsHandler {
  constructor(private readonly loggerService: AppLogger) {}

  @OnEvent('AUDIT_LOG')
  handleOrderCreatedEvent(payload: any) {
    this.loggerService.debug?.('AUDIT: ', payload);
  }
}
