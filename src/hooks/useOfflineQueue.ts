import Cookies from 'js-cookie';

const COOKIE_KEY = 'offlineQueue';

export function useOfflineQueue() {
    const queue = JSON.parse(Cookies.get(COOKIE_KEY) || '[]');

    const enqueue = (action: any) => {
        const newQueue = [...queue, action];
        Cookies.set(COOKIE_KEY, JSON.stringify(newQueue));
    };


    const flush = async () => {
        const savedQueue = JSON.parse(Cookies.get(COOKIE_KEY) || '[]');
        for (const action of savedQueue) {
            try {
                await action.fn(...action.args);
            } catch {
                return; // exit early if one fails again
            }
        }
        Cookies.remove(COOKIE_KEY);
    };

    return { enqueue, flush };
}
