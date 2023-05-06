/**
 * @jest-environment jsdom
 */

import type * as Scrapper from './index';
const {scrapper} = jest.requireActual<typeof Scrapper>('./index');

import {simple1} from './__mocks__/simple1';
import {simple2} from './__mocks__/simple2';
import {simple3} from './__mocks__/simple3';
import {simple4} from './__mocks__/simple4';

describe('Tweet Scrapper', () => {
    beforeEach(() => {
        document.body = document.createElement('body');
        document.body.innerHTML = '';
    });

    // Эмоджи в тексте твита, не верифиц
    it('https://twitter.com/bunopus/status/1654475207766073344', async () => {
        document.body.innerHTML = simple1;

        const data = await scrapper();

        expect(data).toEqual({
            "avatar": "https://pbs.twimg.com/profile_images/1501655761478373376/zd01PPKo_x96.jpg",
            "datetime": "2023-05-05T13:16:42.000Z",
            "name": "Evgeny Kot",
            "text": "Кандидат сильно матерится на интервью. 🚩или нет?",
            "tweetPhoto": undefined,
            "username": "@bunopus",
            "verified": false
        });
    });

    // Эмоджи в имени, верифиц
    it('https://twitter.com/zapolnoch/status/1654482493892968453', async () => {
        document.body.innerHTML = simple2;

        const data = await scrapper();

        expect(data).toEqual({
            "avatar": "https://pbs.twimg.com/profile_images/1637062598930710529/SaSYiS0K_x96.jpg",
            "datetime": "2023-05-05T13:45:39.000Z",
            "name": "Гафаров 🐗 Назим",
            "text": "Kotlin – это Java 2020. Kotlin не решает никаких фундаментальных проблем, которые не были решены в Java. Да, по сравнению с Java 8 это прорыв. Но если вы не в курсе, то сейчас актуальная версия — Java 20.",
            "tweetPhoto": undefined,
            "username": "@zapolnoch",
            "verified": true
        });
    });

    // Только эмоджи в тексте, картинка, не верифиц
    it('https://twitter.com/DonaldAkron/status/1653248206246133761?s=20', async () => {
        document.body.innerHTML = simple3;

        const data = await scrapper();

        expect(data).toEqual({
            "avatar": "https://pbs.twimg.com/profile_images/1471554482471268360/7ioKFmeq_x96.jpg",
            "datetime": "2023-05-02T04:01:02.000Z",
            "name": "Akron",
            "text": "🏛️🏛️🏛️",
            "tweetPhoto": "https://pbs.twimg.com/media/FvGEewGakAEscy_?format=jpg&name=large",
            "username": "@DonaldAkron",
            "verified": false
        });
    });

    // Пустой текст, картинка, верифиц
    it('https://twitter.com/Genshinmem/status/1645314389862498305?s=20', async () => {
        document.body.innerHTML = simple4;

        const data = await scrapper();

        expect(data).toEqual({
            "avatar": "https://pbs.twimg.com/profile_images/1579544825954697234/UZNjvpZW_x96.jpg",
            "datetime": "2023-04-10T06:34:53.000Z",
            "name": "Genshin Impact Memes",
            "text": "",
            "tweetPhoto": "https://pbs.twimg.com/media/FtVUqCZXwAAUSgh?format=jpg&name=medium",
            "username": "@Genshinmem",
            "verified": true
        });
    });
});