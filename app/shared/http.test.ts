import { expect, test } from 'vitest';

import { getErrorResponse } from './http';

class AssertionError extends Error {
  constructor(message?: string) {
    super(message);

    this.name = 'AssertionError';
  }
}

test.each([new AssertionError('Message'), new Error('Message'), 'Message', '', 0, null, undefined])(
  'returns error response',
  (value) => {
    expect(getErrorResponse(value)).toMatchSnapshot();
  },
);
