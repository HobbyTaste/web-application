import BaseFetchClass from './BaseFetchClass';

interface IHobby {
    _id: string; // id-хобби
    label: string, // название
    phone?: string, // номер телефона
    email?: string, // контактный email
    address?: string, // точный адрес
    metroStation?: string, // название станции метро ближайшей
    metroId?: string, // id-шник станции метро
    description: string, // полное описание хобби
    shortDescription: string, // краткое описание
    owner?: string, // id-шник партнера, кто создал хобби
    avatar: string | File, // при отправке это файл пользователя e.target.file, при получении url на картнку в облаках
    category?: string, // строка с категорией
    subscribers: string[], // подписчики на данное хобби
}

const BASE_URL = '/restapi/hobby';

/**
 * API для работы с хобби: поиск, добавление, редактирование
 */
class Hobby extends BaseFetchClass{
    public constructor() {
        super(BASE_URL);
    }

    /**
     * Добавляет хобби
     * @param hobbyState
     * @return {Promise<Response>}
     */
    public async add(hobbyState: any): Promise<Response> {
        const formData = new FormData();
        for (const key in hobbyState) {
            formData.append(key, hobbyState[key]);
        }
        const response = await this.post('/add', formData, {isFormData: true});
        if (!response.ok) {
            console.error(response);
        }
        return response;
    }

    /**
     * Поиск хобби по имени и метро, а также по id станции метро, которые можно получить из Geo API
     * @param label
     * @param metroId
     * В случае ошибки выводит в консоль ошибку
     */
    public async find(label: string, metroId?: string | number): Promise<Response> {
        if (!label) {
            throw new Error(`Label is empty: label=${label}`);
        }
            const response = await this.get('/find', {label, metroId});
        if (!response.ok) {
            console.error(response);
        }
        return response;
    }

    /**
     * Получает список всех хобби
     */
    public async getAll(): Promise<Response> {
        const response = await this.get('/all');
        if (!response.ok) {
            console.error(await response.json());
        }
        return response;
    }

    /**
     * Получает ифнормацию по конкретному хобби
     * @param id - хобби
     */
    public async getInfo(id: string): Promise<Response> {
        const response = await this.get('/info', {id});
        if (!response.ok) {
            console.error(response);
        }
        return response;
    }

    /**
     * Редактирование хобби
     * @param id
     * @param updatedProperties - параметры обновления
     */
    public async edit(id: string, updatedProperties: Partial<IHobby>): Promise<Response> {
        // @ts-ignore
        return this.post(`/edit?id=${id}`, updatedProperties);
    }

    /**
     * Загружает фото для хобби.
     * В случае успеха Response будет содержать ссылку на фото.
     * @param id
     * @param file
     */
    public async uploadAvatar(id: string, file: File): Promise<Response> {
        const formData = new FormData();
        formData.append('avatar', file);
        return this.post(`/upload?id=${id}`, formData, {isFormData: true});
    }

    /**
     * Запрос всех хобби с фильтрацией по полям модели (действует по === )
     * Можно использовать для отображения хобби по конкретной категории (category)
     * Подробнее см описание типа IHobby
     * @param filterObject
     */
    public async getWithFilter(filterObject: Partial<IHobby>): Promise<Response> {
        return this.get('/filter', filterObject);
    }
}

export default Hobby;
