# Hobby-Time  
Текущюю версию сайта в проде можно посмотреть здесь: https://htaste.herokuapp.com/

## Содержание
1. [Настройка окружения и установка необходмых пакетов для разработки (Linux, MacOS)](#settings-env)
2. [Разработка](#dev-rules)
3. [Запуск docker-контейнера](#docker)
4. [Архитектура backend](#backend) 
5. [Frontend](#frontend)
6. [Локальный запуск на виртуалке](#vagrant)

<a name="settings-env"></a>

## Подготовка окружения для локальной разработки
Все ниже команды приведены для Unix-систем. Если у вас Windows вы должны искать альтернативные способы по запуску проекта локально самостоятельно. (Есть какая-то [статья](https://losst.ru/ustanovka-bash-v-windows-10) про установку _bash_ на Windows, может она пригодится...)


Итак, готовим рабочее окружение. 
1. Нужно поставить `nvm` (nvm - Node Version Manager, удобная утилита для установки различных версий NodeJS и их использования при запуске нодовых программ)
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
```
2. После этого устанавливаем _node_ 10 версии и ставим его использование по умолчанию при запуске нодовых программ
```
nvm install 10
nvm use default 10
```
Вместе c _node_ установится и `npm`. Чтобы проверить, что установка прошла успешно можно набрать:
```
node --version
npm --version
```
  
3. При установке различных зависимостей и их добавлению в проект я советую пользоваться утилитой `yarn` ([документация](https://yarnpkg.com/)). А [здесь](https://classic.yarnpkg.com/en/docs/install#debian-stable) можно почитать инструкцию по его установке.

4. Для работой с секретами в проекте используется _git secret_. Это позволяет хранить всякие пароли и токены необходимые для работы проекта в зашифрованном виде в репозитории. При этом выдается доступ определенному кругу лиц на расшифровку этих секретов. Подробнее нужно почитать [тут](https://git-secret.io/) как работать с `git secret` + как его установить. Чтобы получить доступ на расшифровку секретов (то есть на использование команды `git secret reveal`) нужно прислать владельцу репозитория ваш публичный сгенерированный gpg ключ (подробнее читать [здесь](https://help.github.com/en/github/authenticating-to-github/generating-a-new-gpg-key)), чтобы он внес вас в доверенный список лиц. Сам список можно получить командой `git secret whoknows`. Без расшифровки секретов проект локально не запустится!


<a name="dev-rules"></a>

## Локальная разработка
Чтобы запустить локально проект, необходимо:
1. Сначала установить все зависимости проекта командой:
```shell script
yarn 
```
2. Далее запускаем сборку. Чтобы собрать и клиентскую, и серверную часть с продовыми настройками 
необходимо запустить команду:
```shell script
yarn build
``` 
3. После сборки вскрываем секреты:
```
git secret reveal
```
4. Далее сервер запускается командой:
```shell script
yarn start
```
В консоле пишется порт, а также указаывается ссылка, которую уже можно
открыть в браузере и начать работать с приложением. 

Чтобы начать разрабатывать клиентскую чать приложения (frontend) в режиме development, нужно запусть сборщик webpack в режиме _watch_, тогда все изменения буду автоматически транспилироваться и перетикать в бандлы.  
Для этого нужно воспользоваться командой (она запускает просто готовый скрипт из `package.json`):
```shell script
yarn build:front:watch
```
Аналогично, в режиме _dev-server_ можно запустить и серверную часть командой: 
```shell script
yarn start:watch
```
Перед началом разработки в этом режиме в вашей системе должен быть установлен Docker (например, согласно [этой](https://docs.docker.com/install/linux/docker-ce/ubuntu/) инструкции). После установки убедитесь, что можете запускать docker-команды без sudo, иначе требуется [самостоятельно](https://docs.docker.com/install/linux/linux-postinstall/) настроить эту возможность.

Обращаю внимание, что для разработки frontend-части приложения, сервер должен быть запущен в режиме development (то есть командой `yarn start:wath`).

Также с другими командами и скриптами можно ознакомится в файле `package.json` в разделе _scripts_.

<a name="docker"></a>
## Запуск докер-контейнера на production
1. Сначала создаем docker-контейнер
```shell script
docker build . -t <name_of_docker_image>
```
2. Запустить контейнер с пробросом порта, на котором слушает сервер (на текущий момент, 8100)
``` shell script
docker run --rm -p 8100:8100 <name_of_docker_image>
```

<a name="backend"></a>

## Архитектура backend
Backend часть приложения написана под NodeJS с использованием TS. Весь код нахожится в папке `server`. Запуск сервера конфигурируется папкой `config`. В нем располагются файлы конфигурации приложения, которые применяются для запуска приложения в зависимости от окружения запуска. (Подробнее ознкамится нужно [здесь](https://www.npmjs.com/package/config))

Рассмотрим из чего состоит `server`:
1. `app.ts` - входная точка сервера. Здесь создается простенькое `express` приложение, подключаются различные _middlewares_, а также идет подключение к БД через `mongoose`. Помимо этого здесь подключаются роутинги на обработку конкретных запросов (`app.use(routes.user, userRouter)`). Ну и просхожит запуск самого сервера на определенном порту `app.listen(...)`
2. `routes` - тут уже располагаются обработчики http-запросов. 
- в `index.ts` - формируется список страничек, на которые сервера отслыает сгенерированную самостоятельно html-страничку.
- `user.ts` - обработчики запросов связанных с сущностью `user`
- `provider.ts` - обработчики запрсов связанных с сущностью `provider`, то есть с поставщиком хобби (или партнером по-другому называя)
3. `models` - описанные основные сущности проекта и их хранение в БД `MongoDB` через библиотеку `mongoose`.
- User - непосредственно обычный пользователь приложения
- Provider - партнер, предоставляющий хобби
- Hobby - непосредственно сущность хобби
4. `utils` - утилитки, которые используются в разных частях сервера (например загрузка меда-файлов через aws в облака или формирование html-страничик для отдачи статики пользователю).

<a name="frontend"></a>

## Frontend
Frontend часть написана на JavaScript. В верстке используются модульные стили: (https://habr.com/ru/post/335244/) и готовые компоненты из библиотеки material-ui: (https://material-ui.com/). Фреймворк - react, state management - redux. Для обработки всех форм используется библиотека redux-form: (https://redux-form.com/8.3.0/).

Весь код клиентской части находится в папке `static`:
1. Входная точка - файл `index.js`, он отрисовывает главную компоненту приложения - `App.js`. `App.js` содержит пути до всех страниц, которые есть в нашем приложении: "категории" (стартовая страница с категориями хобби), "главная страница" (страница с выбором названия хобби и станции метро), "хобби" (здесь отображаются найденные по заданным параметрам хобби), "личный кабинет пользователя" и "личный кабинет партнера".
2. Папка `api` - содержит функции, которые делают запрос на сервер за какими-то данными. 
3. Папка `assets/images` - тут лежат все картинки, которые используются в приложении. 
4. Папка `components` - все компоненты нашего приложения. Каждая папка содержит файл с кодом определенной компоненты (название папки и компоненты, которая в ней лежит, совпадают) и файл со стилями, относящимися к данной компоненте. Также тут могут лежать вложенные папки с более мелкими компонентами, которые используются основной компонентой.
Пример: папка `HobbyCard` содержит файлы `HobbyCard.jsx` с кодом компоненты карточки хобби, `HobbyCard.module.css` со стилями для этой компоненты, и папкой `CardImage`, где находится компонента, которая отрисовывается в `HobbyCard.jsx`. Рекомендуется на листочке нарисовать "дерево зависимостей" всех компонент друг от друга для лучшего понимания структуры. Также вы можете менять эту структуру (создавать/удалять/переносить/менять папки) так, как вам будет удобнее с ней работать.
5. Папка `HOC` - содержит модальные и диалоговые окна из библиотеки `material-ui`.
6. Папка `redux` - в ней находится наш `store` и папка со всеми редьюсерами. Для каждой страницы есть отдельный редьюсер, в котором хранятся actions, thunks и сам reducer.
7. Папка `utils` - должна содержать различные утилиты, которые могут вам понадобиться. Пока там есть пустая папка `validators` для проверки всех форм на ошибки.

## Докер контейнер для front-сервера
 Чтобы собрать docker-образ, необходимо зайти в папку с проектом и выполнить команду:
```shell script
docker build -t front-server -f ./frontServer/Dockerfile .
```
 Чтобы запустить контейнер, необходимо выполнить команду
```shell script
docker run -p 8080:8080 front-server
```
Сервер будет находиться на порту 8080

<a name="vagrant"></a>

## Локальный запуск на виртуалке
Для локального запуска будем использовать виртуальную машину с заведомо подходящими настройками.

Предварительно требуется:
1. `VirtualBox`. Установка для разных ОС и дистрибутивов приведена [тут](https://www.virtualbox.org/wiki/Downloads).
2. `vagrant`
3. Вскрытые секреты. Если не настроены, запускаем из корневой директории проекта:
```shell script
git secret reveal
```
4. Установленный образ ОС для `vagrant`:
```shell script
vagrant box add ubuntu/xenial64
```

Теперь можем запустить сервер непосредственно на ВМ. Далее все комады запускаются из корневой директории проекта:
1. Для запуска виртуальной машины делаем:
```shell script
vagrant up
```
Тут при первом запуске машины запустятся `provisioner`-ы. При последующих запусках они запускаться не будут.
2. Далее, для перезапуска сервера останавливаем старый запуск с помощью `Ctrl+C` и перезапускаем. Для этого достаточно только одного `provisioner`-а:
```shell script
vagrant provision --provision-with run
```
3. Для выключения виртуальной машины делаем:
``` shell script
vagrant halt
```
