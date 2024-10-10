const clientId = "b8eccf8d76144ef3963252498eddc4a9";
const clientSecret = "5a0b15cf15f64956bd8aadd357c331a5";

async function getAccessToken() {
    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const encodedCredentials = btoa(`${clientId}:${clientSecret}`);
    const body = 'grant_type=client_credentials';

    try {
        const response = await fetch(tokenUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${encodedCredentials}`
            },
            body: body
        });

        const data = await response.json(); // chuyển thành dạng Json
        if (data.access_token) {
            fetchPlaylistDetails(data.access_token);//Lấy thông tin, dữ liệu playlist
        } else {
            alert('Failed to get access token');
        }
    } catch (error) {
        console.error('Error fetching access token:', error);
    }


}


async function fetchPlaylistDetails(token) {
    const playlistId = '7qhlNDge94s4EOEafJz6g0'; // Example playlist ID //3jQYYDZ7XrDNmWyKwfJrP4

    try {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        const playlistContainer = document.getElementById('playlistContainer');
        playlistContainer.innerHTML = ''; // Clear previous content

        data.tracks.items.forEach(item => {
            const track = item.track;
            const isFavorited = localStorage.getItem(track.id) === 'true';
            const favoriteIcon = isFavorited ? '❤️' : '🤍';
            const trackCardHTML = `
            <div class="track-card">
                <img src="${track.album.images[0].url}" alt="${track.name}">
                <div class="details">
                    <h2>${track.name}</h2>
                    <p>${track.artists.map(artist => artist.name).join(', ')}</p>
                    <button class="favorite-button ${isFavorited ? 'favorited' : ''}" data-track-id="${track.id}">${favoriteIcon}</button>
                </div>
                <iframe src="https://open.spotify.com/embed/track/${track.id}" allow="encrypted-media"></iframe>
            </div>
        `;
            playlistContainer.innerHTML += trackCardHTML;
        });

        const favoriteButtons = document.querySelectorAll('.favorite-button');
        favoriteButtons.forEach(button => {
            button.addEventListener('click', function () {
                const trackId = button.getAttribute('data-track-id');
                const isFavorited = button.classList.contains('favorited');
                const trackName = button.parentElement.querySelector('h2').textContent;
                const imageName = button.parentElement.parentElement.querySelector('img').src;
                const artist = button.parentElement.querySelector('p').textContent;

                if (isFavorited) {
                    localStorage.removeItem(trackId);
                } else {
                    localStorage.setItem(trackId, JSON.stringify({ trackName, imageName, artist }));
                }

                button.classList.toggle('favorited');
                button.textContent = isFavorited ? '🤍' : '❤️';
            });
        });
    } catch (error) {
        console.error('Error fetching playlist details:', error);
    }
}
// chạy hàm accessToken
getAccessToken()
//    New page (SLIDESHOW)
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}


//Cho slideshow auto chạy

// let slideIndex = 0;
// showSlides();

// function showSlides() {
//   let i;
//   let slides = document.getElementsByClassName("mySlides");
//   for (i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";
//   }
//   slideIndex++;
//   if (slideIndex > slides.length) {slideIndex = 1}
//   slides[slideIndex-1].style.display = "block";
//   setTimeout(showSlides, 10000); // Change image every 2 seconds
// } 
//3AatvkEV7OaIg3w2O1sXEA

