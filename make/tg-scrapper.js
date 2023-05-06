
(function() {
    const scrapper = async () => {
    // here is nothing yet
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
