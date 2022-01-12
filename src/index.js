/**
 * Install plugin.
 */

import Url from './url/index';
import Http from './http/index';
import Util, {options} from './util';

function plugin(app) {

    if (plugin.installed) {
        return;
    }

    Util(app);

    app.config.globalProperties.url = Url;
    app.config.globalProperties.http = Http;

    Object.defineProperties(app.config.globalProperties, {
        $url: {
            get() {
                return options(app.url, this, this.$options.url);
            }
        },

        $http: {
            get() {
                return options(app.http, this, this.$options.http);
            }
        },
    });
}

if (typeof window !== 'undefined' && window.Vue && !window.Vue.resource) {
    window.Vue.use(plugin);
}

export default plugin;
