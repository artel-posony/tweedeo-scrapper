export const scrapper = async () => {
    function wait(time: number) {
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

    const iframe = document.querySelector<HTMLIFrameElement>('#twitter-widget-0');

    return {
        iframeSrc: iframe ? iframe.src : ''
    };
};
