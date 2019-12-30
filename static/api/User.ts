import BaseFetchClass from './BaseFetchClass';

const BASE_URL = '/user';

interface ILoginError {
    email?: string;
    password?: string;
}

interface IUser {
    id: string;
    name: string;
    email: string;
    avatar: any;
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
     * Упех: возвращается null
     * Ошибка: Возвращается текст ошибки
     */
    public async logout(): Promise<null | string> {
        const resp = await this.get('/logout');
        if (resp.status === 200) {
            return null;
        }
        return resp.statusText;
    }

    /**
     * Получение информации о пользователе
     * Успех: возвращается объект вида IUser с инфой о пользователе
     * Ошибка: возвращается ошибка в виде строки (может случаться, если сейчас пользователь не залогинен)
     */
    public async getInfo(): Promise<IUser | string> {
        const response = await this.get('/info');
         if (response.status === 200) {
             return response.json();
         }
         return response.statusText;
    }

    /**
     * Получение информации о пользователе по его id-шнику
     * @param id - id пользователе
     * Успех: возвращается объект вида IUser с инфой о пользователе
     * Ошибка: возвращается ошибка в виде строки (может случаться, если сейчас пользователь не залогинен)
     */
    public async getInfoById(id: string): Promise<IUser | string> {
        const response = await this.get('/info', {id});
        if (response.status === 200) {
            return response.json();
        }
        return response.statusText;
    }

    /**
     * Загружает фото пользователя. Рабтает ТОЛЬКО длч залогиненных пользователей
     * В случае успех объект ответа будет сожержать ссылку на фото пользователя
     * @param file
     */
    public async uploadAvatar(file: File): Promise<Response> {
        const formData = new FormData();
        formData.append('file', file);
        return this.post('upload', formData, {isFormData: true});
    }

    /**
     * Меняет дланные для залогиненного пользователя
     */
    public async edit(nextData: Partial<IUser>): Promise<Response> {
        const formData = new FormData();
        for (const key in nextData) {
            formData.append(key, nextData[key]);
        }
        return this.post('/edit', formData, {isFormData: true});
    }
}

export default User;
