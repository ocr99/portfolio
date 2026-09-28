/**
 * Language handling.
 *
 * English lives in the HTML itself and doubles as the fallback. Spanish and
 * Catalan come from assets/i18n/{es,ca}.js, which call register() with a flat
 * { key: text } dictionary. Elements opt in with:
 *
 *   data-i18n="key"                 replaces the text content
 *   data-i18n-html="key"            replaces the inner HTML (inline <strong>, <em>...)
 *   data-i18n-attr="attr:key;..."   replaces one or more attributes
 *
 * Loaded WITHOUT defer in <head>: the language has to be picked before the
 * first paint, otherwise the English text flashes before being swapped.
 */
(function () {
    "use strict";

    const SUPPORTED = ['en', 'es', 'ca'];
    const DEFAULT_LANG = 'en';
    const STORAGE_KEY = 'lang';
    const PENDING_CLASS = 'i18n-pending';
    // Past this, show the English page rather than a blank one.
    const REVEAL_TIMEOUT_MS = 1500;

    const root = document.documentElement;
    // Resolved from this script's own URL, so it works at any page depth
    // and on the 404 page, which uses absolute paths.
    const dictBase = document.currentScript.src.replace(/i18n\.js(?:[?#].*)?$/, 'i18n/');

    const dicts = {};
    const loading = {};
    // English markup of every translated element, captured the first time it
    // is touched, so switching back to English doesn't need a reload.
    const originals = new Map();
    let current = DEFAULT_LANG;

    /**
     * localStorage throws in some private modes; treat that as "no choice saved".
     */
    const readStored = () => {
        try {
            return localStorage.getItem(STORAGE_KEY);
        } catch (err) {
            return null;
        }
    };

    const store = (lang) => {
        try {
            localStorage.setItem(STORAGE_KEY, lang);
        } catch (err) { /* The choice just won't survive the page. */ }
    };

    /**
     * Saved choice first, then the first supported entry of the browser's
     * language list ("ca-ES, es, en" gives Catalan), then English.
     */
    const detect = () => {
        const stored = readStored();
        if (SUPPORTED.includes(stored)) return stored;

        const prefs = (navigator.languages && navigator.languages.length)
            ? navigator.languages
            : [navigator.language || ''];

        for (const pref of prefs) {
            const code = String(pref).toLowerCase().split('-')[0];
            if (SUPPORTED.includes(code)) return code;
        }
        return DEFAULT_LANG;
    };

    const loadDict = (lang) => {
        if (dicts[lang]) return Promise.resolve(dicts[lang]);
        if (!loading[lang]) {
            loading[lang] = new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = dictBase + lang + '.js';
                script.onload = () => dicts[lang] ? resolve(dicts[lang]) : reject(new Error('Empty dictionary: ' + lang));
                script.onerror = () => reject(new Error('Could not load dictionary: ' + lang));
                document.head.appendChild(script);
            }).catch((err) => {
                delete loading[lang];
                throw err;
            });
        }
        return loading[lang];
    };

    const domReady = new Promise((resolve) => {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', resolve, { once: true });
        } else {
            resolve();
        }
    });

    /**
     * "aria-label:common.close; title:common.close" -> [["aria-label", "common.close"], ...]
     */
    const parseAttrs = (el) => (el.getAttribute('data-i18n-attr') || '')
        .split(';')
        .map((pair) => pair.split(':').map((part) => part.trim()))
        .filter(([attr, key]) => attr && key);

    const remember = (el) => {
        if (!originals.has(el)) {
            const attrs = {};
            parseAttrs(el).forEach(([attr]) => { attrs[attr] = el.getAttribute(attr); });
            originals.set(el, { html: el.innerHTML, attrs });
        }
        return originals.get(el);
    };

    /**
     * Swap every opted-in element to `dict`, or back to English when `dict`
     * is null. A key missing from the dictionary falls back to English too.
     */
    const apply = (lang, dict) => {
        document.querySelectorAll('[data-i18n], [data-i18n-html], [data-i18n-attr]').forEach((el) => {
            const original = remember(el);
            const textKey = el.getAttribute('data-i18n');
            const htmlKey = el.getAttribute('data-i18n-html');

            if (textKey || htmlKey) {
                const value = dict ? dict[textKey || htmlKey] : undefined;
                if (value == null) el.innerHTML = original.html;
                else if (textKey) el.textContent = value;
                else el.innerHTML = value;
            }

            parseAttrs(el).forEach(([attr, key]) => {
                const value = dict && dict[key] != null ? dict[key] : original.attrs[attr];
                if (value == null) el.removeAttribute(attr);
                else el.setAttribute(attr, value);
            });
        });

        current = lang;
        root.lang = lang;
        document.dispatchEvent(new CustomEvent('i18n:change', { detail: { lang } }));
    };

    const reveal = () => root.classList.remove(PENDING_CLASS);

    /**
     * Switch the page to `lang` and remember the choice.
     */
    const setLanguage = (lang) => {
        if (!SUPPORTED.includes(lang)) return Promise.resolve(current);
        store(lang);
        if (lang === DEFAULT_LANG) {
            return domReady.then(() => { apply(lang, null); return lang; });
        }
        return Promise.all([loadDict(lang), domReady])
            .then(([dict]) => { apply(lang, dict); return lang; })
            .catch(() => current);
    };

    window.portfolioI18n = {
        supported: SUPPORTED,
        get lang() { return current; },
        register(lang, dict) { dicts[lang] = dict; },
        /**
         * Text for `key` in the current language, or `fallback` (the English
         * text) when the page is in English or the key is missing.
         */
        t(key, fallback) {
            const dict = dicts[current];
            return (current !== DEFAULT_LANG && dict && dict[key] != null) ? dict[key] : fallback;
        },
        set: setLanguage
    };

    /**
     * Initial pass. English needs nothing: the HTML already is English.
     * Anything else hides the page until the dictionary is in, with a timeout
     * so a slow or failed request ends up in English instead of a blank page.
     */
    const initial = detect();
    if (initial !== DEFAULT_LANG) {
        const style = document.createElement('style');
        style.textContent = '.' + PENDING_CLASS + ' body { visibility: hidden; }';
        document.head.appendChild(style);
        root.classList.add(PENDING_CLASS);

        const timer = setTimeout(reveal, REVEAL_TIMEOUT_MS);
        Promise.all([loadDict(initial), domReady])
            .then(([dict]) => apply(initial, dict))
            .catch(() => { /* Stay in English. */ })
            .finally(() => {
                clearTimeout(timer);
                reveal();
            });
    }
})();
