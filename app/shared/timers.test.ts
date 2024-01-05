/* eslint-disable @typescript-eslint/no-floating-promises, no-empty */

import { expect, test, vi } from 'vitest';

import { setTimeout } from './timers';

test('resolves on timeout if signal is not provided', () => {
  const promise = setTimeout(10);

  expect(promise).resolves.toMatchSnapshot();
});

test('resolves on timeout if signal is not provided with value', () => {
  const promise = setTimeout(10, 'value');

  expect(promise).resolves.toMatchSnapshot();
});

test('resolves on timeout if signal is provided', () => {
  const promise = setTimeout(10, undefined, {
    signal: new AbortController().signal,
  });

  expect(promise).resolves.toMatchSnapshot();
});

test('resolves on timeout if signal is provided with value', () => {
  const promise = setTimeout(10, 'value', {
    signal: new AbortController().signal,
  });

  expect(promise).resolves.toMatchSnapshot();
});

test('rejects if signal is aborted', () => {
  const controller = new AbortController();
  const promise = setTimeout(10, undefined, {
    signal: controller.signal,
  });

  controller.abort();

  expect(promise).rejects.toMatchSnapshot();
});

test('clears timeout if signal is aborted', async () => {
  const controller = new AbortController();
  const clearTimeoutMock = vi.spyOn(globalThis, 'clearTimeout');
  const promise = setTimeout(10, undefined, {
    signal: controller.signal,
  });

  controller.abort();

  try {
    await promise;
  } catch {}

  expect(clearTimeoutMock).toHaveBeenCalledOnce();
});

test('rejects if signal is already aborted', () => {
  const promise = setTimeout(10, undefined, {
    signal: AbortSignal.abort(),
  });

  expect(promise).rejects.toMatchSnapshot();
});

test('does not clear timeout if signal is already aborted', async () => {
  const clearTimeoutMock = vi.spyOn(globalThis, 'clearTimeout');
  const promise = setTimeout(10, undefined, {
    signal: AbortSignal.abort(),
  });

  try {
    await promise;
  } catch {}

  expect(clearTimeoutMock).not.toBeCalled();
});

test('does not set timeout if signal is already aborted', async () => {
  const setTimeoutMock = vi.spyOn(globalThis, 'setTimeout');
  const promise = setTimeout(10, undefined, {
    signal: AbortSignal.abort(),
  });

  try {
    await promise;
  } catch {}

  expect(setTimeoutMock).not.toBeCalled();
});
