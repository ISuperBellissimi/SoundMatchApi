var loggeduser = {};


/**
 * This function refreshes the list of songs.
 * It only loads bookLendings given the artist.
 * It's called every time a song is created or when the user login.
 */
function loadSongs() {
    const ul = document.getElementById('songs');

    ul.innerHTML = '';

    fetch('../api/v0/song?artistId=' + loggedUser.id + '&token=' + loggedUser.token)
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) { // Here you get the data to modify as you please

            console.log(data);

            return data.map((entry) => { // Map through the results and for each run the code below

                let li = document.createElement('li');
                let span = document.createElement('span');
                let a = document.createElement('a');
                a.href = entry.self
                a.textContent = entry.song;

                // Append all our elements
                span.appendChild(a);
                li.appendChild(span);
                ul.appendChild(li);
            })
        })
        .catch(error => console.error(error));// If there is any error you will catch them here
}

function insertSong() {
    var artist = loggeduser.username
    var songTitle = document.getElementById("songTitle").value; //songTitle is the id in the form
    var collaborations =  document.getElementById("collaborations").value;
    var genres = document.getElementById("genres").value;
    //var image = document.getElementById("image").value;

    fetch('../api/v0/song', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            title: songTitle,
            artist: artist,
            collaborations: collaborations,
            genres: genres
        }),
    })
        .then((resp) => {
            console.log(resp);
            loadBooks();
            return;
        })
        .catch(error => console.error(error)); // If there is any error you will catch them here
}