/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

Способ решения задачи: когда отправляется форма мы добавляем новый эл-т в массив и после этого заново строим список фильмов.

    +а. Получить форму всю. Для того чтобы... 
    +б. Получаем инпут из формы
    +в. Назначим обработчик событий на форму. (submit)
    +г. Присваиваем значение из импута переменной
    д. Добавляем значения импута в массив с фильмами
2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    
    const adv = document.querySelectorAll('.promo__adv img'), //Указываем конкретно на картинки внутри класса
    poster = document.querySelector('.promo__bg'),
    genre = poster.querySelector('.promo__genre'),
    movieList = document.querySelector('.promo__interactive-list'),
    addForm = document.querySelector('form.add'),
    addInput = addForm.querySelector('.adding__input'),
    checkbox = addForm.querySelector('[type="checkbox"]'); //Обращаемся через атрибут


    const movieDB = {
        movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
        ]
    };

    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    };

    const makeChanges = () => {
        genre.textContent = "драма";

        poster.style.background = `url("../img/bg.jpg")`;
    };

    const sortArr = (arr) => {
        arr.sort();
    };

    addForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const newFilm = addInput.value;
        const favorite = checkbox.checked;

        if(newFilm) {
            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies); 
            createMovieList(movieDB.movies, movieList);
        }

        if (favorite) {
            console.log('Добавляем любимый фильм');
        }

        event.target.reset(); //Данный метод очищает форму
    });

    function cutMovieName(name) {
        if(name.length>=21) {
            return name.substring(0, 20) + '...';
        }
        return name;
    }

    function createMovieList(films, parent) {
        parent.innerHTML = "";
        sortArr(movieDB.movies);
    
        films.forEach((film, i) => {
            parent.innerHTML += `
            <li class="promo__interactive-item">${i+1} ${cutMovieName(film)}
            <div class="delete"></div>
            </li>
            `;
        });

        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click',() =>{
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1); //удаляем фильм из обьекта

                createMovieList(films, parent);
            });
        });
    }

    deleteAdv(adv);
    makeChanges();
    createMovieList(movieDB.movies, movieList);
});

