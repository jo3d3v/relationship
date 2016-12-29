import 'babel-polyfill';
import Vue from 'vue';
import jQuery from 'jquery';
import _ from 'lodash';

Vue.component('rs-calendar', {
    template: `
        <ul>
            <li v-for="entry in entries">{{entry}}</li>
        </ul>`,
    data() {
        return {
            entries: []
        }
    },
    created() {
        let self = this;
        jQuery.ajax({
            type: 'GET',
            headers: {
                'X-Proxy-URL': 'https://rs-gera.churchtools.de'
            },
            accepts: {
                'json': 'application/json'
            },
            dataType: 'json',
            data: {
                'q': 'churchcal/ajax',
                'func': 'getCalPerCategory',
                'category_ids[0]': 2
            },
            url: 'http://relationship-gera.de/proxy/proxy.php'
        }).done((data) => {
            self.entries = _.map(_.filter(data.data['2'], (entry) => {
                return _.has(entry, 'csevents');
            }), (entry) => {
                return entry['bezeichnung'];
            });
        });

    }
})

new Vue({
    el: '#container'
});