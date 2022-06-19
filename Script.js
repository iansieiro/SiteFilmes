//IMDB

const API_KEY = 'api_key=904d5a21d4e1dd9a2cef420e57ef65aa';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

GetMovies(API_URL);

function GetMovies(url)
{
    fetch(url).then(res => res.json()).then(data => 
        {
            console.log(data.results);
            ShowMovies(data.results);
        })
}

function ShowMovies(data)
{
    main.innerHTML = '';
    data.forEach(movie => {
        const{title, poster_path, vote_average, overview} = movie;
        const movieE1 = document.createElement('div');
        movieE1.classList.add('movie');
        movieE1.innerHTML = `
        <img src="${IMG_URL + poster_path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${GetColor(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            ${overview}
        </div>
        
        `
        main.appendChild(movieE1);
    });
}

function GetColor(vote_average)
{
    if(vote_average >= 8)
    {
        return 'green';
    }
    else if(vote_average >=5)
    {
        return 'orange';
    }
    else
    {
        return 'red';
    }
}

form.addEventListener('submit', (e) => 
{
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm)
    {
        GetMovies(SEARCH_URL + '&query=' + searchTerm);
    }
    else
    {
        GetMovies(API_URL);
    }
})