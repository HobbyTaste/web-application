import chai from 'chai';
import 'mocha';
import chaiHttp from 'chai-http';
import { filter as lodash_filter, find as lodash_find } from 'lodash';

import server from '../app';
import { HTTP_STATUS } from './test';
import User, { IUser } from '../models/user';
import Hobby, { IHobby } from '../models/hobby';
import Provider, { IProvider } from '../models/provider';
import * as data from './sample_data';

const assert: Chai.AssertStatic = chai.assert;
chai.use(chaiHttp);

export let agent: ChaiHttp.Agent = chai.request.agent(server);
export let csrfToken: string = '';

export function create_provider(provider: Partial<IProvider>, done: Mocha.Done) {
    agent.post('/provider/create')
    .send(provider)
    .then((res: ChaiHttp.Response) => {
        assert.equal(res.status, HTTP_STATUS.UNAUTHORIZED, 'Status code is not 401');
        csrfToken = res.header['csrf-token'];
        agent.post('/provider/create')
        .set('csrf-token', csrfToken)
        .send(provider)
        .then((res: ChaiHttp.Response) => {
            assert.equal(res.status, HTTP_STATUS.OK, 'Status code is not 200');
            Provider.find({phone: provider.phone}, (err, providers) => {
                assert.lengthOf(providers, 1, 'Many or no providers, expected 1');
                done();
            });
        });
    });
}

export function logout_provider(done: Mocha.Done): void {
    agent.get('/provider/logout')
    .set('csrf-token', csrfToken)
    .then((res: ChaiHttp.Response) => {
        assert.equal(res.status, HTTP_STATUS.OK, 'Logout failed');
        done();
    });
}

export function login_provider(email: string | undefined, password: string | undefined, done: Mocha.Done): void {
    agent.post('/provider/login')
    .set('csrf-token', csrfToken)
    .send({email: email, password: password})
    .then((res: ChaiHttp.Response) => {
        assert.equal(res.status, HTTP_STATUS.OK, 'Email and password checking failed');
        done();
    });
}

export function create_hobby_adder(hobby: Partial<IHobby>): async.AsyncFunction<any> {
    return function(callback: Function) {
        return agent.post('/hobby/add')
        .set('csrf-token', csrfToken)
        .send(hobby)
        .then((res: ChaiHttp.Response) => {
            assert.equal(res.status, HTTP_STATUS.OK, 'Hobby was not added to database');
            Hobby.find(hobby, (err, hobbies) => {
                assert.lengthOf(hobbies, 1, 'Many or no hobbies, expected 1');
                callback(null, hobbies[0]);
            });
        });
    };
}

export function unify_hobby_list(hobby_list: Partial<IHobby>[]) {
    return hobby_list.map(
        ((hobby: Partial<IHobby>): Partial<IHobby> => {
        return {
            category: hobby.category,
            phone: hobby.phone,
            email: hobby.email,
            metroId: hobby.metroId?.toString(),
            label: hobby.label
        };
    }));
}

export function filter_test(filter: Partial<IHobby>, done: Mocha.Done) {
    agent.get('/hobby/filter')
    .query(filter)
    .set('csrf-token', csrfToken)
    .then((res: ChaiHttp.Response) => {
        assert.equal(res.status, HTTP_STATUS.OK, 'Status code is not 200');
        Hobby.find(filter, (err, hobbies) => {
            const handled_hobbies: Partial<IHobby>[] = unify_hobby_list(res.body);
            const database_handled_hobbies: Partial<IHobby>[] = unify_hobby_list(hobbies);
            assert.sameDeepMembers<Partial<IHobby> >(handled_hobbies, database_handled_hobbies, 'Hobbies are not what was expected')
            done();
        });
    });
}

export function create_user(user: Partial<IUser>, done: Mocha.Done) {
    agent.post('/user/create')
    .send(user)
    .then((res: ChaiHttp.Response) => {
        assert.equal(res.status, HTTP_STATUS.UNAUTHORIZED, 'Status code is not 401');
        const csrfToken = res.header['csrf-token'];
        agent.post('/user/create')
        .set('csrf-token', csrfToken)
        .send(user)
        .then((res: ChaiHttp.Response) => {
            assert.equal(res.status, HTTP_STATUS.OK, 'Status code is not 200');
            User.find({email: user.email}, (err, users) => {
                assert.lengthOf(users, 1, 'Many or no users, expected 1');
                done();
            });
        });
    });
}

export function login_user(email: string | undefined, password: string | undefined, done: Mocha.Done): void {
    agent.post('/user/login')
    .set('csrf-token', csrfToken)
    .send({email: email, password: password})
    .then((res: ChaiHttp.Response) => {
        assert.equal(res.status, HTTP_STATUS.OK, 'Email and password checking failed');
        done();
    });
}

export function logout_user(done: Mocha.Done): void {
    agent.get('/user/logout')
    .set('csrf-token', csrfToken)
    .then((res: ChaiHttp.Response) => {
        assert.equal(res.status, HTTP_STATUS.OK, 'Logout failed');
        done();
    });
}

export function create_subscriber(label: string): async.AsyncFunction<any> {
    return function(callback: Function) {
        return Hobby.findOne({label: label}, (err, hobby) => {
            agent.get('/user/subscribe')
            .query({id: hobby?._id.toHexString()})
            .set('csrf-token', csrfToken)
            .then((res: ChaiHttp.Response) => {
                assert.equal(res.status, HTTP_STATUS.OK, 'Status code is not 200');
                callback(null, hobby);
            });
    });
    };
}

export function create_subscribe_checker(label: string, id: string): async.AsyncFunction<any> {
    return function(callback: Function) {
        return Hobby.findOne({label: label}, (err, hobby) => {
            assert.include(hobby?.subscribers, [id], "Can't see current user as a subsciber");
            callback(null, hobby);
        });
    };
};
