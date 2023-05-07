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

    const selectors = {
        iframe: '.tgme_page_widget iframe',
        msg: '.tgme_widget_message'
    };

    await waitForElm(selectors.iframe);

    const iframe = document.querySelector<HTMLIFrameElement>(selectors.iframe);
    const iframeDoc = iframe?.contentWindow?.document;

    const message = iframeDoc?.querySelector(selectors.msg);
    
    console.log(message?.textContent);

    return {};
};
