import chai from 'chai';
import 'mocha';
import mongoose, { Error, MongooseDocument } from 'mongoose';
import async from 'async';
import chaiHttp from 'chai-http';
import { filter as lodash_filter, find as lodash_find } from 'lodash';

import server from '../app';
import Hobby, { IHobby } from '../models/hobby';
import Provider, { IProvider } from '../models/provider';
import * as data from './sample_data';
import { store } from '../app';
import User, { IUser } from '../models/user';
import * as utils from './utils';
import { useReducer } from 'react';


const assert: Chai.AssertStatic = chai.assert;
chai.use(chaiHttp);
// import User from '../models/user';

export enum HTTP_STATUS {
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    OK = 200,
};


describe('Sample Group', function() {
    this.timeout(15000);
    this.slow(10000);
    before((done: Mocha.Done) => {
        // Before group of tests we empty the database
        Hobby.deleteMany({}, (err: Error) => {
            done();
        });
    });

    it('should connect and show empty list', (done: Mocha.Done) => {
        chai.request(server)
            .get('/hobby/all')
            .end((err: Error, res: ChaiHttp.Response) => {
                assert.equal(res.status, HTTP_STATUS.OK, 'Status code is not 200');
                assert.isEmpty(res.body);
                done();
            });
    });
});

// let agent: ChaiHttp.Agent = chai.request.agent(server);
// let csrfToken: string = '';

describe('Work with provider and add hobby', function() {
    this.timeout(15000);
    this.slow(10000);
    before((done: Mocha.Done) => {
        // Before group of tests we empty the database
        Hobby.deleteMany({}, (err: Error) => {
            Provider.deleteMany({}, (err: Error) => {
                done();
            });
        });
    });

    it('should create provider', (done: Mocha.Done) => {
        utils.create_provider(data.provider, done);
    });

    it('should logout provider', (done: Mocha.Done) => {
        utils.logout_provider(done);
    });

    it('should not create provider due to non-unique email', (done: Mocha.Done) => {
        utils.agent.post('/provider/create')
        .set('csrf-token', utils.csrfToken)
        .send(data.provider)
        .then((res: ChaiHttp.Response) => {
            assert.equal(res.status, HTTP_STATUS.BAD_REQUEST, 'Checking email uniqueness failed');
            done();
        });
    });

    it('should create another provider', (done: Mocha.Done) => {
        utils.create_provider(data.another_provider, done);
    });

    it('should logout from another provider', (done: Mocha.Done) => {
        utils.logout_provider(done);
    });

    it('should login provider', (done: Mocha.Done) => {
        utils.login_provider(data.provider.email, data.provider.password, done);
    });

    it('should add hobbies', (done: Mocha.Done) => {
        let adding_functions: async.AsyncFunction<any>[] = [];
        data.hobbies.forEach((hobby: Partial<IHobby>) => {
            adding_functions.push(utils.create_hobby_adder(hobby));
        });
        async.parallel(adding_functions, done);
    });

    it('should get info about current (logged in) provider', (done: Mocha.Done) => {
        utils.agent.get('/provider/info')
        .set('csrf-token', utils.csrfToken)
        .then((res: ChaiHttp.Response) => {
            assert.equal(res.status, HTTP_STATUS.OK, 'Status code is not 200');
            const {password, ...data_rest_props} = data.provider;
            const {id, __v, ...rest_props} = res.body;
            assert.deepEqual<Partial<IProvider> >(rest_props, data_rest_props, 'Wrong info about provider');
            done();
        });
    });

    it('should get info about other (not logged in) provider', (done: Mocha.Done) => {
        Provider.findOne({phone: data.another_provider.phone}, (err, result) => {
            if (result) {
                utils.agent.get('/provider/info')
                .query({id: result._id.toHexString()})
                .set('csrf-token', utils.csrfToken)
                .then((res: ChaiHttp.Response) => {
                    assert.equal(res.status, HTTP_STATUS.OK, 'Status code is not 200');
                    const data_rest_props = (({password, ...rest}) => rest)(data.another_provider);
                    const rest_props = (({_id, __v, password, ...rest}) => rest)(res.body._doc);
                    assert.deepEqual<Partial<IProvider> >(rest_props, data_rest_props, 
                                                          'Wrong info about other provider');
                    done();
                });
            }
        });
    });

    it('should not get info about provider due to incorrect id', (done: Mocha.Done) => {
        utils.agent.get('/provider/info')
        .set('csrf-token', utils.csrfToken)
        .query({id: '123456788765432112345678'})
        .then((res: ChaiHttp.Response) => {
            assert.equal(res.status, HTTP_STATUS.NOT_FOUND, 'Status code is not 404, found something wrong');
            assert.include(res.text, 'Не найден такой пользователь');
            done();
        });
    });

    it('should edit provider data', (done: Mocha.Done) => {
        utils.agent.post('/provider/edit')
        .set('csrf-token', utils.csrfToken)
        .send(data.provider_update)
        .then((res: ChaiHttp.Response) => {
            assert.equal(res.status, HTTP_STATUS.OK, 'Status code is not 200');
            Provider.findOne({email: data.provider.email}, (err, result) => {
                if (result) {
                    const rest_props = { 
                        phone: result.phone,
                        info: result.info,
                        name: result.name
                    };
                    let {password, ...data_props} = data.provider_update;
                    assert.deepEqual<Partial<IProvider> >(rest_props, data_props, 
                                                          'Information was not updated correctly');
                    done();
                }
                else assert.fail('Provider was not found in database');
            });
        });
    });

    it("should find provider's hobbies", (done: Mocha.Done) => {
        utils.agent.get('/provider/hobbies')
        .set('csrf-token', utils.csrfToken)
        .then((res: ChaiHttp.Response) => {
            assert.equal(res.status, HTTP_STATUS.OK, 'Status code is not 200');
            const handled_hobbies: Partial<IHobby>[] = utils.unify_hobby_list(res.body);
            Hobby.find({}, (err, hobbies) => {
                const database_handled_hobbies: Partial<IHobby>[] = utils.unify_hobby_list(hobbies);
                assert.sameDeepMembers<Partial<IHobby> >(handled_hobbies, database_handled_hobbies,
                                                         'Hobbies are not what was expected');
                done();
            });
        });
    });

    it('should logout current provider', (done: Mocha.Done) => {
        utils.logout_provider(done);
    });

    it('should login provider with updated password', (done: Mocha.Done) => {
        utils.login_provider(data.provider.email, data.provider_update.password, done);
    });

    it('should logout current provider', (done: Mocha.Done) => {
        utils.logout_provider(done);
    });

});


describe('Work with hobbies', function() {
    this.timeout(15000);
    this.slow(10000);

    it('should get a list of all hobbies', (done: Mocha.Done) => {
        utils.agent.get('/hobby/all')
        .set('csrf-token', utils.csrfToken)
        .then((res: ChaiHttp.Response) => {
            assert.equal(res.status, HTTP_STATUS.OK, 'Status code is not 200');
            assert.lengthOf(res.body, data.hobbies.length, 'The number of hobbies is too big or too small, not right');
            Hobby.find({}, (err, hobbies) => {
                const handled_hobbies: Partial<IHobby>[] = utils.unify_hobby_list(res.body);
                const database_handled_hobbies: Partial<IHobby>[] = utils.unify_hobby_list(hobbies);
                assert.sameDeepMembers<Partial<IHobby> >(handled_hobbies, database_handled_hobbies, 
                                                         'Hobbies are not what was expected');
                done();
            });
        });
    });

    it('should filter hobbies by category', (done: Mocha.Done) => {
        utils.filter_test({category: 'sport'}, done);
    });

    it('should filter hobbies by metroId', (done: Mocha.Done) => {
        utils.filter_test({metroId: '2'}, done);
    });

    it('should get information about hobby by id', (done: Mocha.Done) => {
        Hobby.findOne({label: '2s'}, (err, result) => {
            if (result) {
                utils.agent.get('/hobby/info')
                .query({id: result._id.toHexString()})
                .set('csrf-token', utils.csrfToken)
                .then((res: ChaiHttp.Response) => {
                    assert.equal(res.status, HTTP_STATUS.OK, 'Status code is not 200');
                    const response_hobby: Partial<IHobby> = utils.unify_hobby_list([res.body])[0];
                    const database_hobby: Partial<IHobby> = utils.unify_hobby_list([result])[0];
                    assert.deepEqual(response_hobby, database_hobby, 'Hobby is not what was expected');
                    done();
                })
            }
            else assert.fail('Hobby id was not found in database');
        })
    });

    it('should update information about hobby by id', (done: Mocha.Done) => {
        Hobby.findOne({label: '2s'}, (err, result) => {
            if (result) {
                utils.agent.post('/hobby/edit')
                .query({id: result._id.toHexString()})
                .set('csrf-token', utils.csrfToken)
                .send(data.hobby_update)
                .then((res: ChaiHttp.Response) => {
                    assert.equal(res.status, HTTP_STATUS.OK, 'Status code is not 200');
                    Hobby.findOne({label: '2s'}, (err, hobby) => {
                        assert.equal(data.hobby_update.phone, hobby?.phone);
                        done();
                    })
                })
            }
            else assert.fail('Hobby id was not found in database');
        })
    });

    it('should find hobby by label', (done: Mocha.Done) => {
        utils.agent.get('/hobby/find')
        .query({label: '1t'})
        .set('csrf-token', utils.csrfToken)
        .then((res: ChaiHttp.Response) => {
            assert.equal(res.status, HTTP_STATUS.OK, 'Status code is not 200');
            Hobby.find({label: '1t'}, (err, hobbies) => {
                assert.lengthOf(hobbies, 1, 'Too many or too few hobbies')
                const database_hobby: Partial<IHobby> = utils.unify_hobby_list(hobbies)[0];
                const response_hobby: Partial<IHobby> = utils.unify_hobby_list(res.body)[0];
                assert.deepEqual(response_hobby, database_hobby, 'Found the wrong hobby');
                done();
            })
        })
    });

    it('should find hobby by label and metroId', (done: Mocha.Done) => {
        utils.agent.get('/hobby/find')
        .query({label: '1t', metroId: '1'})
        .set('csrf-token', utils.csrfToken)
        .then((res: ChaiHttp.Response) => {
            assert.equal(res.status, HTTP_STATUS.OK, 'Status code is not 200');
            Hobby.find({label: '1t', metroId: '1'}, (err, hobbies) => {
                assert.lengthOf(hobbies, 1, 'Too many or too few hobbies')
                const database_hobby: Partial<IHobby> = utils.unify_hobby_list(hobbies)[0];
                const response_hobby: Partial<IHobby> = utils.unify_hobby_list(res.body)[0];
                assert.deepEqual(response_hobby, database_hobby, 'Found the wrong hobby');
                done();
            })
        })
    });
    
});


describe('Work with user and hobbies', function() {
    this.timeout(15000);
    this.slow(10000);
    before((done: Mocha.Done) => {
        // Before group of tests we empty the database
        User.deleteMany({}, (err: Error) => {
            done();
        });
    });

    it('should create user', (done: Mocha.Done) => {
        utils.create_user(data.user, done);
    });

    it('should logout user', (done: Mocha.Done) => {
        utils.logout_user(done);
    })

    it('should create another user', (done: Mocha.Done) => {
        utils.create_user(data.another_user, done);
    });

    it('should logout from another user', (done: Mocha.Done) => {
        utils.logout_user(done);
    })

    it('should login user', (done: Mocha.Done) => {
        utils.login_user(data.user.email, data.user.password, done);
    })

    it('should get info about current (logged in) user', (done: Mocha.Done) => {
        utils.agent.get('/user/info')
        .set('csrf-token', utils.csrfToken)
        .then((res: ChaiHttp.Response) => {
            assert.equal(res.status, HTTP_STATUS.OK, 'Status code is not 200');
            const {id, ...response_user} = res.body;
            const {password, ...rest_data_user} = data.user;
            assert.deepEqual<Partial<IUser> >(rest_data_user, response_user, 'Wrong info about current (logged in) user');
            done();
        });
    });

    it('should get info about other (not logged in) user', (done: Mocha.Done) => {
        User.findOne({email: data.another_user.email}, (err, result) => {
            if (result) {
                utils.agent.get('/user/info')
                .query({id: result._id.toHexString()})
                .set('csrf-token', utils.csrfToken)
                .then((res: ChaiHttp.Response) => {
                    assert.equal(res.status, HTTP_STATUS.OK, 'Status code is not 200');
                    const {id, ...response_user} = res.body;
                    const {password, ...rest_data_another_user} = data.another_user;
                    assert.deepEqual<Partial<IProvider> >(response_user, rest_data_another_user, 
                                                          'Wrong info about other user');
                    done();
                });
            }
            else assert.fail('Desired user was not found')
        });
    });

    it('should not get info about user due to incorrect id', (done: Mocha.Done) => {
        utils.agent.get('/user/info')
        .set('csrf-token', utils.csrfToken)
        .query({id: data.wrong_hex_string})
        .then((res: ChaiHttp.Response) => {
            assert.equal(res.status, HTTP_STATUS.NOT_FOUND, 'Status code is not 404, found something wrong');
            assert.include(res.text, 'Не найден такой пользователь');
            done();
        });
    });

    it('should edit user data', (done: Mocha.Done) => {
        utils.agent.post('/user/edit')
        .set('csrf-token', utils.csrfToken)
        .send(data.user_update)
        .then((res: ChaiHttp.Response) => {
            assert.equal(res.status, HTTP_STATUS.OK, 'Status code is not 200');
            User.findOne({email: data.user_update.email}, (err, result) => {
                if (result) {
                    const rest_props = { 
                        email: result.email,
                        name: result.name
                    };
                    assert.deepEqual<Partial<IUser> >(rest_props, {email: data.user_update.email, name: data.user.name},
                                                      'Information was not updated correctly');
                    done();
                }
                else assert.fail('User was not found in database');
            });
        });
    });

    it('should subscribe user to hobbies', (done: Mocha.Done) => {
        async.series([utils.create_subscriber('1s'),
                        utils.create_subscriber('2m'),
                        utils.create_subscriber('1t')],
                        () => {
            User.findOne({email: data.user_update.email}, (err, user) => {
                const user_id = user?._id.toHexString();
                async.parallel([utils.create_subscribe_checker('1s', user_id), 
                                utils.create_subscribe_checker('2m', user_id),
                                utils.create_subscribe_checker('1t', user_id)],
                                done);
            })
        });
    })

    it('should not subscribe to hobby due to incorrect id', (done: Mocha.Done) => {
        utils.agent.get('/user/subscribe')
        .query({id: data.wrong_hex_string})
        .set('csrf-token', utils.csrfToken)
        .then((res: ChaiHttp.Response) => {
            assert.equal(res.status, HTTP_STATUS.NOT_FOUND, 'Status code is not 404, found something wrong');
            assert.include(res.text, 'Такого хобби не найдено');
            done();
        });
    });

    it('should not subscribe to hobby due to id absence', (done: Mocha.Done) => {
        utils.agent.get('/user/subscribe')
        .set('csrf-token', utils.csrfToken)
        .then((res: ChaiHttp.Response) => {
            assert.equal(res.status, HTTP_STATUS.BAD_REQUEST, 'Status code is not 400,' +
                                                              'id absence was recognized as correct option');
            assert.include(res.text, 'Необходимо указать id хобби для подписки');
            done();
        });
    });

    it("should get list of user's hobbies", (done: Mocha.Done) => {
        utils.agent.get('/user/hobbies')
        .set('csrf-token', utils.csrfToken)
        .then((res: ChaiHttp.Response) => {
            assert.equal(res.status, HTTP_STATUS.OK, 'Status code is not 200');
            const hobby_ids = res.body.map((hobby: Partial<IHobby>) => {
                return hobby._id;
            })
            User.findOne({email: data.user_update.email}, (err, user) => {
                if (user) {
                    assert.sameMembers(hobby_ids, user.hobbies, 'List of hobby ids is not what was expected');
                    done();
                }
                else assert.fail('User was not found in database');
            })
        });
    });

});


describe('Clear session store and finish', function() {
    this.timeout(15000);
    this.slow(10000);
    it('should clear session store', (done: Mocha.Done) => {
        store.clear((err: Error) => {
            if (err)
                console.log('Error: session store not cleared');
            done();
        })
    });
});
