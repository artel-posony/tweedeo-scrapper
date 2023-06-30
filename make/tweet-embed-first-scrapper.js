
(function() {
    const scrapper = async () => {
    function wait(time) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve('');
            }, time);
        });
    }
    await wait(3000);
    if (!document) {
        return;
    }
    const iframe = document.querySelector('#twitter-widget-0');
    return {
        iframeSrc: iframe ? iframe.src : ''
    };
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
