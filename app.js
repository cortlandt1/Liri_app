require("dotenv").config();
const request = require('request')
const inq = require('inquirer')
var prompt = inq.createPromptModule();
var keys = require("./keys.js")
var Spotify = require('node-spotify-api');
var omdb = keys.omdb.api
var concertID = keys.concertID.key

const run = () => {
    prompt([
        {
            type: 'list',
            message: 'WELCOME TO LIRI, WHAT WOULD YOU LIKE TO DO?',
            name: 'selection',
            choices: ['SEARCH FOR A SONG', 'LOOK FOR A CONCERT (BAND NAME)', 'SEARCH FOR A MOVIE']
        }
    ])
        .then(r => {
            switch (r.selection) {
                case 'SEARCH FOR A SONG':
                    spots();
                    break;

                case 'LOOK FOR A CONCERT (BAND NAME)':
                    concerts()
                    break;

                case 'SEARCH FOR A MOVIE':
                    movie();
                    break;
            }
        })
}
run()




var spotify = new Spotify(keys.spotify);


const spots = () => {

    prompt([
        {
            type: 'input',
            message: 'ENTER A SONG',
            name: 'songInput'
        }
    ])
        .then(r => {
            if(r.songInput = ' '){
                console.log('MUST INPUT A SONG')
            }else {
            spotify.search({ type: 'track', query: r.songInput }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                console.log("SONG: " + data.tracks.items[0].name);
                console.log("ARTIST: " + data.tracks.items[0].artists[0].name);
                console.log("ALBUM: " + data.tracks.items[0].album.name);
                console.log("LINK: " + data.tracks.items[0].album.external_urls.spotify);
            });
        }
            const runAgain = setTimeout(run, 2500);
        })

}

const movie = () => {
    prompt([
        {
            type: 'input',
            message: 'ENTER A MOVIE',
            name: 'movieInput'
        }
    ])
        .then(r => {
            if(r.movieInput = ' '){
                console.log('MUST INPUT A MOVIE')
            }else {
            request(`http://www.omdbapi.com/?t=${r.movieInput}&apikey=${omdb}`, (e, r, d) => {
                if (e) { console.log(e) }
                const movie = JSON.parse(d)
                console.log(`TITLE:${movie.Title}`)
                console.log(`YEAR:${movie.Year}`)
                console.log(`RATING:${movie.Rated}`)
                console.log(`RELEASE DATE:${movie.Released}`)
                console.log(`RUN TIME:${movie.Runtime}`)
            })
        }
            const runAgain = setTimeout(run, 2500);
        })

}


const concerts = () => {
    prompt([
        {
            type: 'input',
            message: 'ENTER A BAND',
            name: 'bandInput'
        }
    ])
        .then(r => {
            if(r.bandInput = ' '){
                console.log('MUST INPUT A BAND')
            }else {
            request(`https://rest.bandsintown.com/artists/${r.bandInput}/events?app_id=${concertID}`, (e, r, d) => {
                if (e) { console.log(e) }
                const band = JSON.parse(d)
                console.log(band[0].venue.name)
                console.log(band[0].venue.location)
                console.log(band[0].festival_start_date)
            })
        }
            const runAgain = setTimeout(run, 2500);
        })

}

