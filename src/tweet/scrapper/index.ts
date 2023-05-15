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

    const selectors = {
        tweet: '[data-testid="tweet"]',
        userLinks: '[data-testid="User-Name"] a',
        userName: 'div > div > span',
        verified: '[data-testid="icon-verified"]',
        text: '[data-testid="tweetText"]',
        time: 'time',
        photo: '[data-testid="tweetPhoto"] img',
        avatar: (usernameWithoutAt: string) => `[data-testid="UserAvatar-Container-${usernameWithoutAt}"] img`,
    };

    await waitForElm(selectors.tweet);
    // Берется самый первый твит, хотя на странице их много
    const tweet = document.querySelector<HTMLElement>(selectors.tweet);

    if (!tweet) {
        throw new Error('Tweet not found!');
    }

    const userUserNameElems = tweet.querySelectorAll<HTMLElement>(selectors.userLinks);
    const [nameElem, usernameElem] = [...userUserNameElems];

    const name = parseTextWithEmoji(nameElem?.querySelector(selectors.userName)?.children);

    const username = usernameElem.textContent || '';
    const usernameWithoutAt = username.substring(1);
    const avatarSelector = selectors.avatar(usernameWithoutAt);

    const verified = !!tweet.querySelector(selectors.verified);

    const tweetTextElem = tweet.querySelector<HTMLElement>(selectors.text);
    const text = parseTextWithEmoji(tweetTextElem?.children);

    const timeElem = tweet.querySelector<HTMLElement>(selectors.time);
    const datetime = timeElem?.getAttribute('datetime');

    await waitForElm(`${selectors.tweet} ${avatarSelector}`);

    const avatarImg = tweet.querySelector<HTMLImageElement>(avatarSelector);
    const avatar = avatarImg?.src;

    const tweetPhotoElems = tweet.querySelectorAll<HTMLImageElement>(selectors.photo);
    const tweetPhotos = [...tweetPhotoElems].map((img) => img.src);

    const data = {
        name,
        username,
        verified,
        text,
        datetime,
        avatar,
        tweetPhotos
    };

    return data;
};