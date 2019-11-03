import BaseFetchClass from './BaseFetchClass';

const BASE_URL = '/user';

interface ILoginError {
    email?: string,
    password?: string,
}

/**
 * Апи для работы с пользователями
 */
class User extends BaseFetchClass {
    public constructor() {
        super(BASE_URL);
    }

    /**
     * Вход пользователя на сайте
     * @param email почта пользователя
     * @param password пароль вводимый пользователем
     * В случае успеха возвращает null
     * В случае ошибки озвращает объект с ошибками
     * {login: loginError, password: passwordError}, где записаны ошибки
     */
    public async login(email: string, password: string): Promise<ILoginError | null> {
        const response = await this.post('/login', {email, password});
        if (response.status === 200) {
            return null;
        }
        return response.json();
    }

    /**
     * Запрос на создание пользователя
     * @param email почта пользователя, должна быть уникальной у каждого пользователя
     * @param password пароль
     * @param name имя пользователя
     * В случае ошибки приходит сообщение об ошибки, если ошибки нет, возвращается null
     */
    public async create(email: string, password: string, name?: string): Promise<string | null> {
        const response = await this.post('/create', {email, password, name});
        return await response.text() || null;
    }

    /**
     * Logout пользователя
     */
    public logout(): Promise<Response> {
        return this.get('/logout');
    }
}

export default User;
