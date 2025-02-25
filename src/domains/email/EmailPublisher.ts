import { EmailSubscribe } from './EmailSubscribe';

class EmailPublisher {
  private subscribers: EmailSubscribe[];
  private id: number;

  constructor() {
    this.subscribers = new Array<EmailSubscribe>();
    this.id = 0;
  }

  public getId() {
    return this.id++;
  }

  public Subscribe(subscriber: EmailSubscribe) {
    this.subscribers.push(subscriber);
  }

  public UnSubscribe(subscriber: EmailSubscribe) {
    this.subscribers = this.subscribers.filter((item) => item.id != subscriber.id);
  }

  public UnSubscribeALl() {
    this.subscribers = new Array<EmailSubscribe>();
  }

  public Notify(id: number, msg: string) {
    const subscriber = this.subscribers.find((item) => item.id == id);
    subscriber.tattooCreatedOrUpdated(msg);
    if (subscriber) {
    }
  }

  public NotifyAll(msg: string) {
    this.subscribers.forEach((subscriber) => {
      subscriber.tattooCreatedOrUpdated(msg);
    });
  }
}

export default new EmailPublisher();
