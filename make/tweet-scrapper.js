
(function() {
    const scrapper = async () => {
    function waitForElm(selector) {
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
    const tweet = document.querySelector('[data-testid="tweet"]');
    if (!tweet) {
        throw new Error('Tweet not found!');
    }
    const userNameElems = tweet.querySelectorAll('[data-testid="User-Name"] a');
    const [name, username] = [...userNameElems].map((elem) => elem.innerText);
    const usernameWithoutAt = username.substring(1);
    const verified = !!document.querySelector('[data-testid="tweet"] [data-testid="icon-verified"]');
    const tweetTextElem = document.querySelector('[data-testid="tweet"] [data-testid="tweetText"]');
    const text = tweetTextElem === null || tweetTextElem === void 0 ? void 0 : tweetTextElem.innerText;
    const timeElem = document.querySelector('[data-testid="tweet"] time');
    const datetime = timeElem === null || timeElem === void 0 ? void 0 : timeElem.getAttribute('datetime');
    const avatarSelector = '[data-testid="tweet"] [data-testid="UserAvatar-Container-' + usernameWithoutAt + '"] img';
    await waitForElm(avatarSelector);
    const avatarImg = document.querySelector(avatarSelector);
    const avatar = avatarImg === null || avatarImg === void 0 ? void 0 : avatarImg.src;
    const tweetPhotoElem = document.querySelector('[data-testid="tweet"] [data-testid="tweetPhoto"] img');
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


    async function onReady() {
        try {
            const data = await scrapper();
            window.ReactNativeWebView.postMessage(JSON.stringify(data));
        } catch (error) {
            window.ReactNativeWebView.postMessage(JSON.stringify({error}));
        }
    };

    if (
        document.readyState === 'complete' ||
        (document.readyState !== 'loading' && !document.documentElement.doScroll)
    ) {
        callback();
    } else {
        document.addEventListener('DOMContentLoaded', onReady);
    }
})();
