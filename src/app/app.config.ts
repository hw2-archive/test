export interface AppConfig {
  appPort: number;
  apiBaseUrl: string;
}

export default (): AppConfig => ({
  appPort: parseInt(process.env.APP_PORT, 10) || 3000,
  apiBaseUrl: process.env.LEPAYA_API_BASE_URL,
});
