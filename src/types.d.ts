/* eslint-disable @typescript-eslint/no-unused-vars */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV?: 'development' | 'production' | 'test' | 'pipeline';
      APP_PORT: string;
      LEPAYA_API_BASE_URL: string;
    }
  }
}

export declare type ClassType<Class = any> = { new (...args: any[]): Class };
