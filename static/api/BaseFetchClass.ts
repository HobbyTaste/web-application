import path from 'path';
import {merge} from 'lodash';

interface IRequestOpts extends RequestInit {
    retryOnUnauthorized: boolean;
    isFormData: boolean;
}

enum METHODS {
    GET = 'GET',
    POST = 'POST',
}

enum HTTP_STATUS {
    UNAUTHORIZED = 401,
    OK = 200,
}

// Токен для авторизации запросов
let csrfToken: string | null = null;

export default class BaseFetchClass {
    protected baseUrl: string;

    protected constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    private static defaultOpts: IRequestOpts = {
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        method: METHODS.GET,
        retryOnUnauthorized: true,
        isFormData: false,
    };

    private static computeOpts(customOpts?: Partial<IRequestOpts>): IRequestOpts {
        const authToken = csrfToken;
        const authorization = authToken
            ? {headers: {'csrf-token': authToken}}
            : {};
        const opts = customOpts ? merge({}, BaseFetchClass.defaultOpts, customOpts) : BaseFetchClass.defaultOpts;
        if (opts.isFormData) {
            delete opts.headers!['Content-Type'];
        }

        return merge({}, opts, authorization);

    }

    private async baseFetch(relativePath: string, customOpts?: Partial<IRequestOpts>): Promise<Response> {
        const {retryOnUnauthorized, ...fetchOpts} = BaseFetchClass.computeOpts(customOpts);
        const response: Response = await window.fetch(
            this.baseUrl + relativePath,
            fetchOpts
        );

        if (response.status === HTTP_STATUS.UNAUTHORIZED && retryOnUnauthorized) {
            csrfToken = response.headers.get('csrf-token');
            const nextOpts: IRequestOpts = {...fetchOpts, retryOnUnauthorized: false};
            return this.baseFetch(relativePath, nextOpts);
        }

        if (response.status !== HTTP_STATUS.OK) {
            console.error(response.statusText);
        }
        return response;
    }

    public async get(
        path: string,
        query: Object = {},
        customOpts?: Partial<IRequestOpts>
    ): Promise<Response> {
        const queryParams = Object.keys(query).filter(key => typeof query[key] !== "undefined").reduce((str: string, key: string) => `${str}&${key}=${query[key]}`, '');
        const requestUrl = queryParams
            ? `${path.replace(/\/$/, '')}?${queryParams.replace(/^&/, '')}`
            : path.replace(/\/$/, '');
        return this.baseFetch(requestUrl, customOpts);
    }

    public async post(path: string, body: Object, customOpts: Partial<IRequestOpts> = {}): Promise<Response> {
        const requestUrl = path.replace(/\/$/, '');
        const bodyToFetch = customOpts.isFormData
            ? body
            : JSON.stringify(body);
        const opts = merge({}, customOpts, {body: bodyToFetch, method: METHODS.POST})
        return this.baseFetch(requestUrl, opts);
    }
}


