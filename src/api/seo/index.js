import _axios, { post, get, put } from '@/lin/plugin/axios'


export default class Seo {

    static getSeoInfo(data) {
        return _axios({
            method: 'get',
            url: '/api-common/seo-config/info',
            data,
            handleError: true,
        })
    }

}