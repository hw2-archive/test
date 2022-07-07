import {
  NestInterceptor,
  Injectable,
  Inject,
  ExecutionContext,
  CallHandler,
  UseInterceptors,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { tap } from 'rxjs';

/**
 * AuditLog Decorator
 */
export function AuditLog(): MethodDecorator & ClassDecorator {
  @Injectable()
  class AuditLogInterceptor implements NestInterceptor {
    constructor(@Inject(EventEmitter2) private eventEmitter: EventEmitter2) {}

    async intercept(context: ExecutionContext, next: CallHandler) {
      /* istanbul ignore next */
      return next.handle().pipe(
        tap(async (responseData: any) => {
          this.emitAuditLogEvent(responseData);
        }),
      );
    }

    /**
     * Emits the Audit Log Event and returns the received data
     * @param logActionType The Logged Action type
     * @param admin The Admin that triggered this action
     * @param data The data that is being modified
     */
    emitAuditLogEvent(responseData: any) {
      this.eventEmitter.emitAsync('AUDIT_LOG', responseData);
    }
  }

  return UseInterceptors(AuditLogInterceptor);
}
