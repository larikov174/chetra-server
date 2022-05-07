module.exports.db = 'mongodb://localhost:27017/chetradb';

module.exports.errorMessage = {
  pageNotFound: 'Страница не найдена.',
  userNotFound: 'Пользователь не найден.',
  movieNotFound: 'Фильм не найден.',
  wrongData: 'Переданы невалидные данные.',
  wrongUserData: 'Неправильные почта или пароль',
  needAuth: 'Необходима авторизация',
  permissionDenied: 'У Вас нет прав на это действие.',
  alreadyExists: 'Переданные данные уже есть в базе.',
  sessionClosed: 'сессия закрыта',
  authSuccess: 'Авторизация успешна.',
  defaultError: 'Произошла ошибка на сервере.',
};

module.exports.devJWT = 'dev-secret';

module.exports.allowedCors = [
  'https://larikov.nomoredomains.work',
  'http://larikov.nomoredomains.work',
  'http://localhost:3000',
];

module.exports.regExp = /(https?:\/\/(www\.)?)[\w-]+\.[\w./():,-]+/;
