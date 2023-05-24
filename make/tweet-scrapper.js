
(function() {
    const scrapper = async () => {
    var _a;
    function waitOneSecond() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve('');
            }, 1000);
        });
    }
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
            setTimeout(() => {
                if (observer && observer.disconnect) {
                    observer.disconnect();
                }
                resolve('');
            }, 3000);
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
    const selectors = {
        tweet: '[data-testid="tweet"]',
        userLinks: '[data-testid="User-Name"] a',
        userName: 'div > div > span',
        verified: '[data-testid="icon-verified"]',
        text: '[data-testid="tweetText"]',
        time: 'time',
        photo: '[data-testid="tweetPhoto"] img',
        avatar: (usernameWithoutAt) => `[data-testid="UserAvatar-Container-${usernameWithoutAt}"] img`,
    };
    await waitForElm(selectors.tweet);
    const tweet = document.querySelector(selectors.tweet);
    if (!tweet) {
        throw new Error('Tweet not found!');
    }
    const userUserNameElems = tweet.querySelectorAll(selectors.userLinks);
    const [nameElem, usernameElem] = [...userUserNameElems];
    const name = parseTextWithEmoji((_a = nameElem === null || nameElem === void 0 ? void 0 : nameElem.querySelector(selectors.userName)) === null || _a === void 0 ? void 0 : _a.children);
    const username = usernameElem.textContent || '';
    const usernameWithoutAt = username.substring(1);
    const avatarSelector = selectors.avatar(usernameWithoutAt);
    const verified = !!tweet.querySelector(selectors.verified);
    const tweetTextElem = tweet.querySelector(selectors.text);
    const text = parseTextWithEmoji(tweetTextElem === null || tweetTextElem === void 0 ? void 0 : tweetTextElem.children);
    const timeElem = tweet.querySelector(selectors.time);
    const datetime = timeElem === null || timeElem === void 0 ? void 0 : timeElem.getAttribute('datetime');
    await waitForElm(`${selectors.tweet} ${avatarSelector}`);
    const avatarImg = tweet.querySelector(avatarSelector);
    const avatar = avatarImg === null || avatarImg === void 0 ? void 0 : avatarImg.src;
    await waitForElm(`${selectors.tweet} ${selectors.photo}`);
    await waitOneSecond();
    const tweetPhotoElems = tweet.querySelectorAll(selectors.photo);
    const tweetPhotos = [...tweetPhotoElems].map((img) => {
        const { height, width } = img.getBoundingClientRect();
        let orientation = '';
        if (height > width) {
            orientation = 'portrait';
        }
        if (width > height) {
            orientation = 'landscape';
        }
        return {
            orientation,
            src: img.src
        };
    });
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
