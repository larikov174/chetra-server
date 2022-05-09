module.exports.db = 'mongodb://localhost:27017/chetradb';

module.exports.errorMessage = {
  pageNotFound: 'Страница не найдена.',
  userNotFound: 'Пользователь не найден.',
  wrongData: 'Переданы невалидные данные.',
  wrongUserData: 'Неправильные почта или пароль',
  permissionDenied: 'У Вас нет прав на это действие.',
  alreadyExists: 'Пользователь уже есть в базе.',
  defaultError: 'Произошла ошибка на сервере.',
};

module.exports.devJWT = 'dev-secret';

module.exports.allowedCors = [
  'http://localhost:3000',
  'http://localhost:8080',
  'https://larikov.online/chetra',
];

module.exports.regExp = /(https?:\/\/(www\.)?)[\w-]+\.[\w./():,-]+/;
