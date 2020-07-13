export interface ILogger {
  log(title: string, payload: any): Promise<any>;
}
