
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
    const selectors = {
        iframe: '.tgme_page_widget iframe',
        msg: '.tgme_widget_message'
    };
    await waitForElm(selectors.iframe);
    const iframe = document.querySelector(selectors.iframe);
    const iframeDoc = (_a = iframe === null || iframe === void 0 ? void 0 : iframe.contentWindow) === null || _a === void 0 ? void 0 : _a.document;
    const message = iframeDoc === null || iframeDoc === void 0 ? void 0 : iframeDoc.querySelector(selectors.msg);
    console.log(message === null || message === void 0 ? void 0 : message.textContent);
    return {};
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
