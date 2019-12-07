
export default abstract class EventBase {
  readonly name: string;
  readonly emitter: 'once' | 'on';
  abstract run(...args: any): any;
}
