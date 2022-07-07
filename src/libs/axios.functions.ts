import { AxiosResponse } from 'axios';
import * as RX from 'rxjs';

/**
 * Pure functions
 */

export const returnDataProp = <T = any, K = T>(result: AxiosResponse<T, K>) =>
  result.data;

export const getData = () => RX.pipe(RX.map(returnDataProp));

export const getFirstData = <T = any, K = T>() =>
  RX.pipe(RX.first<AxiosResponse<T, K>>(), getData());
