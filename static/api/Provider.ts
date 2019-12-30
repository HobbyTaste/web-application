import BaseFetchClass from './BaseFetchClass';

const BASE_URL = '/provider';

interface IProvider {
    name: string;
    password: string;
    email: string;
    avatar: string;
    phone: string;
    info: string;
}

/**
 * Апи для работы с партнером
 */
class Provider extends BaseFetchClass {
    public constructor() {
        super(BASE_URL);
    }

    /**
     * Вход партнера на сайте
     * @param email почта партнера
     * @param password пароль вводимый партнером
     */
    public async login(email: string, password: string): Promise<Response> {
        return await this.post('/login', {email, password});
    }

    /**
     * Запрос на создание партнера
     */
    public async create(provider: IProvider): Promise<Response> {
        return  this.post('/create', provider);
    }

    /**
     * Logout партнера
     */
    public async logout(): Promise<Response> {
        return this.get('/logout');
    }

    /**
     * Получение информации о партнере
     */
    public async getInfo(): Promise<Response> {
        return this.get('/info');
    }

    /**
     * Получение информации о партнере по его id-шнику
     */
    public async getInfoById(id: string): Promise<Response> {
        return this.get('/info', {id});
    }

    /**
     * Загружает фото партнера. Рабтает ТОЛЬКО длч залогиненных пользователей
     * В случае успех объект ответа будет сожержать ссылку на фото пользователя
     * @param file
     */
    public async uploadAvatar(file: File): Promise<Response> {
        const formData = new FormData();
        formData.append('avatar', file);
        return this.post('upload', formData, {isFormData: true});
    }

    /**
     * Меняет дланные для залогиненного партнера
     */
    public async edit(nextData: Partial<IProvider>): Promise<Response> {
        const formData = new FormData();
        for (const key in nextData) {
            formData.append(key, nextData[key]);
        }
        return this.post('/edit', formData, {isFormData: true});
    }
}

export default Provider;
