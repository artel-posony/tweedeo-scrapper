/**
 * @jest-environment jsdom
 */

import type * as Scrapper from './index';
const {scrapper} = jest.requireActual<typeof Scrapper>('./index');

import {simple1} from './__mocks__/simple1';
import {simple2} from './__mocks__/simple2';
import {simple3} from './__mocks__/simple3';
import {simple4} from './__mocks__/simple4';
import {simple5} from './__mocks__/simple5';
import {simple6} from './__mocks__/simple6';

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
            "tweetPhotos": [],
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
            "tweetPhotos": [],
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
            "tweetPhotos":[
                {
                    "orientation": "",
                    "src": "https://pbs.twimg.com/media/FvGEewGakAEscy_?format=jpg&name=large"
                }
            ],
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
            "tweetPhotos": [
                {
                    "orientation": "",
                    "src": "https://pbs.twimg.com/media/FtVUqCZXwAAUSgh?format=jpg&name=medium"
                }
            ],
            "username": "@Genshinmem",
            "verified": true
        });
    });

    // Много текста, нет картинки, верифиц
    it('https://twitter.com/navalny/status/1653676338253905921', async () => {
        document.body.innerHTML = simple5;

        const data = await scrapper();

        expect(data).toEqual({
            "avatar": "https://pbs.twimg.com/profile_images/1532731296014913543/kWwAPiq7_x96.jpg",
            "datetime": "2023-05-03T08:22:17.000Z",
            "name": "Alexey Navalny",
            "text": `Guess who's the world champion of listening to Putin's speeches? Who listens to them for hours and even falls asleep to them?

Me, of course.

A long time ago, I read in some spy detective story about how they tortured prisoners by putting Mao Zedong's poems on at high volume.

Apparently, someone in our prison system had also read this book. 

After we published a story about the Federal Penitentiary Service stealing money to buy vegetables for prisoners, the administration of my colony unleashed their version of the Plagues of Egypt on me. They don't let me write letters, they destroy my food, they put a bum in my cell (I already wrote about all this), but their most creative punishment is that now they play Putin's speeches at high volume every evening. 

Those few speeches and addresses he made after the start of the "special military operation" against Ukraine.

I can turn off the radio in my cell, but it doesn't help, because there are loudspeakers all along the long corridor of the SHIZO/PKT facility and Putin yells through them so loudly that you can't escape it. 

Theoretically, in the evening I have "personal time" (1 hour) and then "preparation for bed" (that is, in the cell they lower the bunk, get a mattress, etc.). By law, the regular radio is supposed to play during that time. But now, this kind of stunt has been invented and approved, so every night you can see the humorous scenes of convicts dragging mattresses into their cells, while Putin loudly informs them that the West wants to make the citizens of Russia suffer. 

Frankly, it's all a bit too loud and makes it hard for me to read, but there are three things that help me bear this "torture by Putin".

The first thing is that the prison officials have acknowledged by their actions that listening to Putin's speeches is a punishment. They've compiled a list of all sorts of nasty things to ruin my life, and this list includes:

- preventing me from writing letters to my family;
- eating my food;
- throwing a bum into my cell;
- making me listen to Putin's speeches every night.

It's only fair that the prison administration has equated Putin's speeches and the smell of a bum in terms of their impact. 

The second thing is that the cops themselves (not the bosses, but regular cops) have to listen to it with me and it's even worse for them - they walk down the corridor right under these speakers. When I ask them cheerfully which speech they like better, they keep silent, as anything they say will get on the DVR and become known to the bosses, but the looks on their faces and the way they roll their eyes is a reward in itself. 

And the third and last thing. It often happens that a fragment of one of Putin's speeches in which he says: "We did not start the war, it was them who started the war, and we are trying to end it", sounds right at that moment, when I have already laid down, pulled the blanket up to my chin and closed my eyes. And every time it happens I shake my head at the impertinence of such an obvious lie and think: I did everything right, I'd rather be in prison than submit to this kind of power.

Then I fall asleep happily 😉`,
            "tweetPhotos": [],
            "username": "@navalny",
            "verified": true
        });
    });

    // Текст, 2 картинки, не верифиц
    it('https://twitter.com/MlamineuDiop/status/1658011127438082048', async () => {
        document.body.innerHTML = simple6;

        const data = await scrapper();

        expect(data).toEqual({
            "avatar": "https://pbs.twimg.com/profile_images/1537133109073920002/thA4X5xX_x96.jpg",
            "datetime": "2023-05-15T07:27:11.000Z",
            "name": "Mlamineu🇸🇳",
            "text": "📍Ziguinchor : toutes les issues qui mènent chez Ousmane SONKO sont barricadées par les… ziguinchorois sur des kilomètres.\n#FreeSenegal 🇸🇳",
            "tweetPhotos": [
                {
                    "orientation": "",
                    "src": "https://pbs.twimg.com/media/FwJwUulWIAAVAl9?format=jpg&name=900x900",
                },
                {
                    "orientation": "",
                    "src": "https://pbs.twimg.com/media/FwJwUumXsAAS2_f?format=jpg&name=900x900"
                }
            ],
            "username": "@MlamineuDiop",
            "verified": false
        });
    });
});