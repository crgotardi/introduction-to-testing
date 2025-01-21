import { describe, it, expect } from 'vitest';
import { add, subtract, multiply, divide } from './arithmetic.js'

describe('add', () => {
    it('should add two positive numbers', () => {
        expect(add(2, 2)).toBe(4)
    })

    it('should add two negative numbers', () => {
        expect(add(-2, -2)).toBe(-4)
    })

    it('should parse strings into numbers', () => {
        expect(add('2', '2')).toBe(4)
    })

    it('should throw error when get not numbers', () => {
        expect(() => add(2, 'potato')).toThrow()
    })
});

describe('subtract', () => {
    it('should subtract two positive numbers', () => {
        expect(subtract(2, 2)).toBe(0)
    })
});

describe('multiply', () => {
    it('should multiply two positive numbers', () => {
        expect(multiply(2, 2)).toBe(4)
    })
});

describe('divide', () => {
    it('should divide two positive numbers', () => {
        expect(divide(2,2)).toBe(1)
    })
});
