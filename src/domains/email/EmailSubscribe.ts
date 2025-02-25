import EmailPublisher from './EmailPublisher';
import { IEmailSubscribe } from './EmailSubscribe.interface';

export class EmailSubscribe implements IEmailSubscribe {
  public id: number;

  constructor() {
    console.log(EmailPublisher.getId());
    this.id = EmailPublisher.getId();
  }

  public tattooCreatedOrUpdated(msg: string) {
    console.log('Send email to publisher. Msg: ', msg);
  }
}
