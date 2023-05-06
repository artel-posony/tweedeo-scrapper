
(function() {
    const scrapper = async () => {
    var _a;
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
    function parseTextWithEmoji(collection) {
        return [...collection || []].map((elem) => {
            if (elem.tagName.toUpperCase() === 'IMG') {
                return elem.getAttribute('alt');
            }
            return elem.textContent || '';
        }).join('');
    }
    await waitForElm('[data-testid="tweet"]');
    const tweet = document.querySelector('[data-testid="tweet"]');
    if (!tweet) {
        throw new Error('Tweet not found!');
    }
    const userUserNameElems = tweet.querySelectorAll('[data-testid="User-Name"] a');
    const [nameElem, usernameElem] = [...userUserNameElems].map((elem) => elem);
    const name = parseTextWithEmoji((_a = nameElem === null || nameElem === void 0 ? void 0 : nameElem.querySelector('div > div > span')) === null || _a === void 0 ? void 0 : _a.children);
    const username = usernameElem.textContent || '';
    const usernameWithoutAt = username.substring(1);
    const verified = !!tweet.querySelector('[data-testid="icon-verified"]');
    const tweetTextElem = tweet.querySelector('[data-testid="tweetText"]');
    const text = parseTextWithEmoji(tweetTextElem === null || tweetTextElem === void 0 ? void 0 : tweetTextElem.children);
    const timeElem = tweet.querySelector('time');
    const datetime = timeElem === null || timeElem === void 0 ? void 0 : timeElem.getAttribute('datetime');
    const avatarSelector = '[data-testid="UserAvatar-Container-' + usernameWithoutAt + '"] img';
    await waitForElm(avatarSelector);
    const avatarImg = tweet.querySelector(avatarSelector);
    const avatar = avatarImg === null || avatarImg === void 0 ? void 0 : avatarImg.src;
    const tweetPhotoElem = tweet.querySelector('[data-testid="tweetPhoto"] img');
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

            if (window.ReactNativeWebView) {
                window.ReactNativeWebView.postMessage(JSON.stringify(data));
            } else {
                console.log(data);
            }
        } catch (error) {
            if (window.ReactNativeWebView) {
                window.ReactNativeWebView.postMessage(JSON.stringify({error}));
            } else {
                console.log(error);
            }
        }
    };

    if (
        document.readyState === 'complete' ||
        (document.readyState !== 'loading' && !document.documentElement.doScroll)
    ) {
        onReady();
    } else {
        document.addEventListener('DOMContentLoaded', onReady);
    }
})();
