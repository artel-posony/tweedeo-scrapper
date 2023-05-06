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

    await waitForElm('[data-testid="tweet"]');
    // Берется самый первый твит, хотя на странице их много
    const tweet = document.querySelector<HTMLElement>('[data-testid="tweet"]');

    if (!tweet) {
        throw new Error('Tweet not found!');
    }

    const userNameElems = tweet.querySelectorAll<HTMLElement>('[data-testid="User-Name"] a');
    const [name, username] = [...userNameElems].map((elem) => elem.innerText);

    const usernameWithoutAt = username.substring(1);

    const verified = !!document.querySelector('[data-testid="tweet"] [data-testid="icon-verified"]');

    const tweetTextElem = document.querySelector<HTMLElement>('[data-testid="tweet"] [data-testid="tweetText"]');
    const text = tweetTextElem?.innerText;

    const timeElem = document.querySelector<HTMLElement>('[data-testid="tweet"] time');
    const datetime = timeElem?.getAttribute('datetime');

    const avatarSelector = '[data-testid="tweet"] [data-testid="UserAvatar-Container-' + usernameWithoutAt + '"] img';

    await waitForElm(avatarSelector);

    const avatarImg = document.querySelector<HTMLImageElement>(avatarSelector);
    const avatar = avatarImg?.src;

    const tweetPhotoElem = document.querySelector<HTMLImageElement>('[data-testid="tweet"] [data-testid="tweetPhoto"] img');
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