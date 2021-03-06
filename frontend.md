# 1. Конвертер валют

Напишите приложение конвертирования валют. Для получения текущих курсов используйте любое публичное API.

Приложение должно состоять из двух страниц:
  
1. Страница с текущими курсами валют.

На этой странице пользователь должен видеть текущие курсы валют относительно выбранной (RUB, USD, EUR, GBP). Например если выбранная валюта `RUB`, то пользователь должен увидеть, что `1 USD = 75.09`, `1 EUR = 90.47`, `1 GBP = 104.19`. При повторном посещении приложения у пользователя должна определяться та валюта, которую он выбрал последней.

2. Конвертер из одной валюты в другую.

На этой странице должно быть текстовое поле, в которое можно ввести текст вида `10 usd in rub` и получить результат `750.9`.

Для реализации используйте:
* Любую библиотеку или ui-фреймворк (react, angular, vue)
* Любую библиотеку для работы с состоянием (redux, mobx, vuex)
* Любые библиотеки для тестирования и контроля качества кода (jest, testing-library, eslint)

Дополнительным плюсом будет все что вы умеете и считаете необходимым:
* Продуманный интерфейс приложения
* Наличие тестов на основные утилиты проекта
* Линтер, форматирование кода, атомарные коммиты на добавление отдельной функциональности приложения
* Максимальная скорость работы приложения (загрузка, ввод текста, перерендеры, отправка запросов и тд)
