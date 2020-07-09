import { ILogger } from './../../abstract/util/logger';
import { injectable } from 'inversify';

@injectable()
export class ConsoleLogger implements ILogger {
  log(title: string, payload: any): Promise<any> {
    // tslint:disable-next-line: no-console
    console.log(title, payload);
    return new Promise((a, _r) => a(true));
  }
}
