class MoviesService {

    baseUrl = 'https://api.themoviedb.org/3/';

    getServerResponse = async (url, options) => {
        try {
            let response = await fetch(url, options);
            if (response.ok) {
                let json = await response.json();
                return json;
            } else {
                throw new Error(`${response.status}`);
            }
        } catch (error) {
            return error.message;
        }
    };

    // Поиск фильмов
    fetchSearchMovies = async (seach, page) => {
        let options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_KEY}`,
            },
        };
        let url = `${this.baseUrl}search/movie?query=${seach}&include_adult=false&language=en-US&page=${page}`;
        let result = await this.getServerResponse(url, options);
        return result;
    };

    // Список жанров
    fetchGetListGenres = async () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_KEY}`,
            },
        };
        let url = `${this.baseUrl}genre/movie/list?language=en`;
        let result = await this.getServerResponse(url, options);
        return result;
    }

    // Добавление оценки фильму
    fetchPutRateMovie = async (movie_id, guest_id, stars) => {
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${process.env.REACT_APP_KEY}`,
            },
            body: stars,
        };
        let url = `${this.baseUrl}movie/${movie_id}/rating?guest_session_id=${guest_id}`;
        let result = await this.getServerResponse(url, options);
        return result;
    }

    // Оцененные фильмы
    fetchGetRatedMovies = async (page) => {
        const account_id = '20330534';
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_KEY}`,
            },
        };
        let url = `${this.baseUrl}account/${account_id}/rated/movies?language=en-US&page=${page}&sort_by=created_at.asc`;
        let result = await this.getServerResponse(url, options);
        return result;
    }

    // Популярные фильмы
    fetchGetPopularMovies = async (page) => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_KEY}`,
            },
        };
        let url = `${this.baseUrl}movie/popular?language=en-US&page=${page}`;
        let result = await this.getServerResponse(url, options);
        return result;
    }

    // Создание гостевой сессии
    fetchCreateGuestSession = async () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_KEY}`,
            },
        };
        let url = `${this.baseUrl}authentication/guest_session/new`;
        let result = await this.getServerResponse(url, options);
        return result;
    }
}

export default MoviesService;