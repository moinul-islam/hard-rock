const form = document.getElementById('form')
const search = document.getElementById('search')
const result = document.getElementById('result')



form.addEventListener('submit', e => {
    e.preventDefault();
    searchValue = search.value.trim()
    if (!searchValue) {
        alert("There is nothing to search")
    } else {
        searchSong(searchValue)
    }
})

function searchSong(searchValue) {

    fetch(`https://api.lyrics.ovh/suggest/${searchValue}`)
        .then(res => res.json())
        .then(data => {

            result.innerHTML = `
            <div class="song-list">
                ${data.data.map(song => `
                    
                            <div class="single-result row align-items-center my-3 p-3">
                               <div class="col-md-9">
                                <h3>${song.title}</h3>
                                <p> <span>Album By</span> ${song.album.title} </p>
                                <p> <span>Artist Name: </span> ${song.artist.name} </p>
                               </div>
                            
                            <div class="col-md-3 text-md-right text-center">
                                <button class='btn btn-success' data-artist="${song.artist.name}" data-songtitle="${song.title}"> get lyrics</button>
                            </div>
                        </div>`
            ).slice(5)
                    .join('')
                }
            </div>
          `;

        })
}

result.addEventListener('click', e => {
    const clickedElement = e.target;
    if (clickedElement.tagName === 'BUTTON') {
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-songtitle');

        getLyrics(artist, songTitle)
    }
})

function getLyrics(artist, songTitle) {
    fetch(`https://api.lyrics.ovh/v1/${artist}/${songTitle}`)
        .then(res => res.json())
        .then(data => {
            const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
            result.innerHTML = `
    <div class="text-center">
        <h2 class="text-success mb-4">${artist} - ${songTitle}</h2>
    <p>${lyrics}</p>
    </div>
    `;

        })
}