/**
 * @jest-environment jsdom
 */

import type * as Scrapper from './index';
const {scrapper} = jest.requireActual<typeof Scrapper>('./index');

import {simple1} from './__mocks__/simple1';

describe('Telegram Scrapper', () => {
    beforeEach(() => {
        document.body = document.createElement('body');
        document.body.innerHTML = '';
    });

    it('https://t.me/forwebdev/6434', async () => {
        document.body.innerHTML = simple1;

        // @todo доделать
        const data = await scrapper();

        expect(data).toEqual({});
    });
});