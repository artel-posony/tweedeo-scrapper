
(function() {
    const scrapper = async () => {
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
