export const scrapper = async () => {
    function waitForElm(selector: string) {
        return new Promise(resolve => {
            if (document.querySelector(selector)) {
                return resolve(document.querySelector(selector));
            }
    
            const observer = new MutationObserver(mutations => {
                if (document.querySelector(selector)) {
                    resolve(document.querySelector(selector));
                    observer.disconnect();
                }
            });
    
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }

    function parseTextWithEmoji(collection: HTMLCollection | undefined) {
        return [...collection || []].map((elem) => {
            if (elem.tagName.toUpperCase() === 'IMG') {
                return elem.getAttribute('alt');
            }
    
            return elem.textContent || '';
        }).join('');
    }

    await waitForElm('[data-testid="tweet"]');
    // Берется самый первый твит, хотя на странице их много
    const tweet = document.querySelector<HTMLElement>('[data-testid="tweet"]');

    if (!tweet) {
        throw new Error('Tweet not found!');
    }

    const userUserNameElems = tweet.querySelectorAll<HTMLElement>('[data-testid="User-Name"] a');
    const [nameElem, usernameElem] = [...userUserNameElems];

    const name = parseTextWithEmoji(nameElem?.querySelector('div > div > span')?.children);

    const username = usernameElem.textContent || '';
    const usernameWithoutAt = username.substring(1);

    const verified = !!tweet.querySelector('[data-testid="icon-verified"]');

    const tweetTextElem = tweet.querySelector<HTMLElement>('[data-testid="tweetText"]');
    const text = parseTextWithEmoji(tweetTextElem?.children);

    const timeElem = tweet.querySelector<HTMLElement>('time');
    const datetime = timeElem?.getAttribute('datetime');

    const avatarSelector = '[data-testid="UserAvatar-Container-' + usernameWithoutAt + '"] img';

    await waitForElm(avatarSelector);

    const avatarImg = tweet.querySelector<HTMLImageElement>(avatarSelector);
    const avatar = avatarImg?.src;

    const tweetPhotoElem = tweet.querySelector<HTMLImageElement>('[data-testid="tweetPhoto"] img');
    const tweetPhoto = !!tweetPhotoElem ? tweetPhotoElem.src : undefined;

    const data = {
        name,
        username,
        verified,
        text,
        datetime,
        avatar,
        tweetPhoto
    };

    return data;
};