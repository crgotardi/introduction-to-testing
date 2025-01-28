import { expect, it, vi, beforeEach, afterEach, describe } from 'vitest';
import { log } from './log';
import { sendToServer } from './send-to-server';

vi.mock('./send-to-server', () => {
    return { sendToServer: vi.fn() }
})

describe('logger', () => {
    afterEach(() => {
        vi.restoreAllMocks()   
    })

    describe('development', () => {
        beforeEach(() => {
            vi.stubEnv('MODE', 'development')
        })

        it('should log to the console in dev mode', () => {
            const logSpy = vi.spyOn(console, 'log')

            log('hello world')

            expect(logSpy).toHaveBeenCalled()
            expect(sendToServer).not.toHaveBeenCalled()
        })
    })

    describe('production', () => {
        beforeEach(() => {
            vi.stubEnv('MODE', 'production')
        })

        it('should not log to the console in prod mode', () => {
            const logSpy = vi.spyOn(console, 'log')

            log('hello world')

            expect(logSpy).not.toHaveBeenCalled()
            expect(sendToServer).toHaveBeenCalled()
        })
    })
});
