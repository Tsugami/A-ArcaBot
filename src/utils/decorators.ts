import 'reflect-metadata';
import { Client } from 'discord.js';

type DecoratorFunction<R, T = unknown> = (
  target: T,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) => R;

export const logger =
  (...args: unknown[]): DecoratorFunction<void> =>
  () =>
    console.log(...args);

export const timeout = (delay: number): DecoratorFunction<void, Client> => {
  return function (_target, _propertykey, descriptor) {
    const originalValue = descriptor.value;

    descriptor.value = function (this: Client, ...args: any[]) {
      return this.setInterval(() => originalValue.call(this, ...args), delay);
    };
  };
};
