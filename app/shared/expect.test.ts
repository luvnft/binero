import { expect, test } from 'vitest';

import { expectNotToBeNaN, expectToBeDefined, expectToSatisfy } from './expect';

test('returns value and does not throw if value satisfies predicate', () => {
  expect(expectToSatisfy('value', (value): value is string => value === 'value')).toMatchSnapshot();
});

test('does not return value and throws if value does not satisfy predicate', () => {
  expect(() => {
    expectToSatisfy('value', (value): value is string => value === 'other');
  }).toThrowErrorMatchingSnapshot();
});

test('does not return value and throws if value does not satisfy predicate with message', () => {
  expect(() => {
    expectToSatisfy('value', (value): value is string => value === 'other', 'Message');
  }).toThrowErrorMatchingSnapshot();
});

test('returns value and does not throw if value is not "null" or "undefined"', () => {
  expect(expectToBeDefined('value')).toMatchSnapshot();
});

test('returns value and does not throw if value is not "null" or "undefined"', () => {
  expect(expectToBeDefined(0)).toMatchSnapshot();
});

test('returns value and does not throw if value is not "null" or "undefined"', () => {
  expect(expectToBeDefined(false)).toMatchSnapshot();
});

test('does not return value and throws if value is "null"', () => {
  expect(() => {
    expectToBeDefined(null);
  }).toThrowErrorMatchingSnapshot();
});

test('does not return value and throws if value is "null" with message', () => {
  expect(() => {
    expectToBeDefined(null, 'Message');
  }).toThrowErrorMatchingSnapshot();
});

test('does not return value and throws if value is "undefined"', () => {
  expect(() => {
    expectToBeDefined(undefined);
  }).toThrowErrorMatchingSnapshot();
});

test('does not return value and throws if value is "undefined" with message', () => {
  expect(() => {
    expectToBeDefined(undefined, 'Message');
  }).toThrowErrorMatchingSnapshot();
});

test('returns value and does not throw if value is not "NaN"', () => {
  expect(expectNotToBeNaN(0)).toMatchSnapshot();
});

test('does not return value and throws if value is "NaN"', () => {
  expect(() => {
    expectNotToBeNaN(NaN);
  }).toThrowErrorMatchingSnapshot();
});

test('does not return value and throws if value is "NaN" with message', () => {
  expect(() => {
    expectNotToBeNaN(NaN, 'Message');
  }).toThrowErrorMatchingSnapshot();
});
