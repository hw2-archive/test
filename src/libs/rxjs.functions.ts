import * as RX from 'rxjs';

export const arrayToPipe = <T>(
  curriedFn: (...args: any[]) => any,
): ((...a: any[]) => any) =>
  RX.map((v: T[]) =>
    v.reduce((acc, value) => {
      return acc(value);
    }, curriedFn),
  );
