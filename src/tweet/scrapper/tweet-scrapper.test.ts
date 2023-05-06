import type * as Scrapper from './index';
const {scrapper} = jest.requireActual<typeof Scrapper>('./index');

describe('Tweet Scrapper', () => {
    it('test', () => {
        expect(1).toEqual(1);
    });
});