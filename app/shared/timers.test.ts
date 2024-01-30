/* eslint-disable @typescript-eslint/no-floating-promises, no-empty */

import { expect, test, vi } from 'vitest';

import { setImmediate } from './timers';

test('resolves on immediate if signal is not provided', () => {
  const promise = setImmediate();

  expect(promise).resolves.toMatchSnapshot();
});

test('resolves on immediate if signal is not provided with value', () => {
  const promise = setImmediate('value');

  expect(promise).resolves.toMatchSnapshot();
});

test('resolves on immediate if signal is provided', () => {
  const promise = setImmediate(undefined, {
    signal: new AbortController().signal,
  });

  expect(promise).resolves.toMatchSnapshot();
});

test('resolves on immediate if signal is provided with value', () => {
  const promise = setImmediate('value', {
    signal: new AbortController().signal,
  });

  expect(promise).resolves.toMatchSnapshot();
});

test('rejects if signal is aborted', () => {
  const controller = new AbortController();
  const promise = setImmediate(undefined, {
    signal: controller.signal,
  });

  controller.abort();

  expect(promise).rejects.toMatchSnapshot();
});

test('clears immediate if signal is aborted', async () => {
  const controller = new AbortController();
  const clearImmediateMock = vi.spyOn(globalThis, 'clearImmediate');
  const promise = setImmediate(undefined, {
    signal: controller.signal,
  });

  controller.abort();

  try {
    await promise;
  } catch {}

  expect(clearImmediateMock).toHaveBeenCalledOnce();
});

test('rejects if signal is already aborted', () => {
  const promise = setImmediate(undefined, {
    signal: AbortSignal.abort(),
  });

  expect(promise).rejects.toMatchSnapshot();
});

test('does not clear immediate if signal is already aborted', async () => {
  const clearImmediateMock = vi.spyOn(globalThis, 'clearImmediate');
  const promise = setImmediate(undefined, {
    signal: AbortSignal.abort(),
  });

  try {
    await promise;
  } catch {}

  expect(clearImmediateMock).not.toBeCalled();
});

test('does not set immediate if signal is already aborted', async () => {
  const setImmediateMock = vi.spyOn(globalThis, 'setImmediate');
  const promise = setImmediate(undefined, {
    signal: AbortSignal.abort(),
  });

  try {
    await promise;
  } catch {}

  expect(setImmediateMock).not.toBeCalled();
});
