import { describe, it, expect, vi } from 'vitest';

const logSpy = vi.spyOn(console, 'log')
const randomSpy = vi.spyOn(Math, 'random').mockImplementation(() => 0.5)

describe('Spy', () => {
  it('should log hello world', () => {
    console.log('hello world')

    expect(logSpy).toHaveBeenCalled()
    expect(logSpy).toHaveBeenCalledOnce()
    expect(logSpy).toHaveBeenCalledTimes(1)
    expect(logSpy).toHaveBeenCalledWith('hello world')
  })
})

describe('Mock', () => {
  it('should mock log of hello world', () => {
    const mockFn = vi.fn()
    mockFn('hello world (mocked)')
  
    expect(mockFn).toHaveBeenCalled()
    expect(mockFn).toHaveBeenCalledOnce()
    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(mockFn).toHaveBeenCalledWith('hello world (mocked)')
  })
})

describe('Spy with Mock', () => {
  it('should return a random number between 0 and 1', () => {
    const result = Math.random()

    expect(randomSpy).toHaveBeenCalled()
    expect(result).toBe(0.5)
  })
})