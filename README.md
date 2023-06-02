# NESTJS + REACT TURBOREPO

## установка зависимостей `pnpm install`
(`npm install -g pnpm` если нет pnpm)

## установка новых пакетов 
`cd api` / `cd client`
`pnpm add "package"`

## запуск
в Packagge.json в руте проекта есть соответствующие скрипты

`npm run dev` - запуск dev сервера

`npm run build` - генерация prisma клиента и сборка бэкэнда и фронтенда

`npm run start` - запуск билда


В dev режиме фронтент запустится на `localhost:5173`

Бэкэнд слушает `localhost:5173/api`


Запустив `npm run start`, NestJS начнет раздавать статику из `apps/client/dist` на `localhost:5000`

Коммиты в репозиторий автоматически собираютс и доступны на https://thesishub-mono-production.up.railway.app/
