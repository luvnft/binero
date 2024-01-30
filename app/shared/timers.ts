export interface Abortable {
  signal?: AbortSignal;
}

export async function setImmediate<T = void>(value?: T, options?: Abortable) {
  let resolve!: (value: T) => void;
  let reject!: (reason: unknown) => void;

  const args = ([] as T[]).concat(value ?? []);
  const signal = options?.signal;
  const promise = new Promise<T>((resolveCallback, rejectCallback) => {
    resolve = resolveCallback;
    reject = rejectCallback;
  });

  if (signal === undefined) {
    globalThis.setImmediate<T[]>(resolve, ...args);
    return await promise;
  }

  if (signal.aborted) {
    reject(signal.reason);
    return await promise;
  }

  const handleAbort = () => {
    globalThis.clearImmediate(handle);
    reject(signal.reason);
  };

  signal.addEventListener('abort', handleAbort);

  const handle = globalThis.setImmediate<T[]>(resolve, ...args);

  try {
    return await promise;
  } finally {
    signal.removeEventListener('abort', handleAbort);
  }
}
