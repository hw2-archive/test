import { of } from 'rxjs';
import { getData, getFirstData } from './axios.functions';

describe('Test axios functions', () => {
  it('Should return data correctly', (done) => {
    const payload: any = { data: {} };
    const getDataFn = getData();
    getDataFn(of(payload)).subscribe((res) => {
      expect(res).toBe(payload.data);
      done();
    });
  });

  it('Should return first data correctly', (done) => {
    const payload: any = { data: {} };
    const getDataFn = getFirstData();
    getDataFn(of(payload)).subscribe((res) => {
      expect(res).toBe(payload.data);
      done();
    });
  });
});
