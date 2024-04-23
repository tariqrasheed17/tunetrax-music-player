
let cardContainer = document.querySelector('.card-container');

const songs = [
    {
        name:"California Dream",
        location:"./songs/California Dreaming.mp3",
        artist: "Arman Cekin"
    },
    
    {
        name:"Ehsaas",
        location:"./songs/Ehsaas Hoon.mp3",
        artist: "Atif Aslam"
    },
    {
        name:"Brown Munde",
        location:"./songs/brown-munde.mp3",
        artist: "Ap Dhillon"
    },
    {
        name:"Dil Pareshaan",
        location:"./songs/Dil-Pareshaan-Hai.mp3",
        artist: "Sajjad Ali"
    },
    {
        name:"Treat-You-Better",
        location:"./songs/Treat-You-Better-ShawnMendes.mp3",
        artist: "Sajjad Ali"
    },
    {
        name:"The Box",
        location:"./songs/The Box.mp3",
        artist: "Roddy Ricch"
    },
    {
        name:"Work Clean",
        location:"./songs/Work Clean.mp3",
        artist: "Rihanna ft.Drake"
    },
    {
        name:"Yakeen",
        location:"./songs/Yakeen.mp3",
        artist: "Atif Aslam"
    }
    
    ];

let musicBanner = [
    {
        id:1,
        img: 'assets/cardImg.jpg',
        name: 'Lofi beats',
        desc:'chill beats, lofi vibes,new tracks every week...'
    },
    {
        id:2,
        img: 'assets/cardImg2.jpg',
        name: 'Chillout Lounge',
        desc:'Just lean back and enjoy relaxed beats.'
    },
    {
        id:3,
        img: 'assets/cardImg3.jpg',
        name: "Today's Top Hits",
        desc:'Dua Lipa is on top of the Hits!'
    },
];
  

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;

}

function addMusicCards() {
         musicBanner.map((each)=>{
            cardContainer.innerHTML += `<div class="card" id=${each.id}>
            <div class="play-btn"><i class="ri-play-large-fill"></i></div>
            <img src='${each.img}'alt="">
            <div class="card-content">
                <h2>${each.name}</h2>
                <p>${each.desc}</p>
            </div>
        </div>`
    })
}

addMusicCards()


function playAudio(index) {
    const audioPlayer = document.getElementById('audioPlayer');
    if (index >= 0 && index < songs.length) {
      audioPlayer.src = songs[index].location;
      audioPlayer.play();

    } else {
      console.error('Invalid index:', index);
    }

   audioPlayer.addEventListener('timeupdate', ()=>{
//    console.log(audioPlayer.currentTime, audioPlayer.duration)
   document.querySelector('.song-duration').innerHTML = `${secondsToMinutesSeconds(audioPlayer.duration)}`;
   document.querySelector('.song-time').innerHTML = `${secondsToMinutesSeconds(audioPlayer.currentTime)}`;
   document.querySelector('.circle').style.left = (audioPlayer.currentTime/audioPlayer.duration)* 100 + '%';
   document.querySelector('.running-seekbar').style.width =  (audioPlayer.currentTime/audioPlayer.duration)* 100 + '%';
   })

   document.querySelector('.seekbar').addEventListener('click', (e) => {
    let percent = (e.offsetX / e.target.offsetWidth) * 100;
    document.querySelector('.circle').style.left = percent + '%';
    let newTime = (audioPlayer.duration * percent) / 100;
    audioPlayer.currentTime = newTime;
   document.querySelector('.running-seekbar').style.width = percent + '%';


});
  
}


let songList = document.querySelector('.song-list');

songs.map((song)=>{
    songList.innerHTML += `<div class="item">
    ${!song.img ? '<div class="music-icon"><i class="ri-music-2-line"></i></div>' : `<img src="${song.img}" alt="">`}
    <h3>${song.name} - ${song.artist}</h3>
</div>`
})



let songArtist = document.querySelector('.song-artist');

function artistBanner(src, name, artist) {
    songArtist.innerHTML = `<div class="music-icon">
    ${!src ? '<div class="music-icon"><i class="ri-music-2-line"></i></div>' : `<img src="${src}" alt="">`}
            </div>
            <div class="artist-name">
                <h2>${name}</h2>
                <h3>${artist}</h3>
            </div>
        `;
    }


let isPlaying = false;   
let item = document.querySelectorAll('.item');
let currentIndex = 0;
let previous = document.querySelector('.backward-btn');
let next = document.querySelector('.forward-btn');

    item.forEach((val , index)=>{
        const clickedIndex = index;
        const song = songs[clickedIndex];
    
        val.addEventListener('click', (e)=>{
            console.log(e.target , index)
            isPlaying = true;
            item.forEach((item) => {
                item.classList.remove('bg-gradient'); 
            });
            
            val.classList.add('bg-gradient'); 
            document.querySelector('.play-btn2 i').classList.remove('ri-play-circle-fill')
            document.querySelector('.play-btn2 i').classList.add('ri-pause-circle-fill')
            playAudio(index);  
            // console.log(index) 
            artistBanner(song.img, song.name, song.artist)
            currentIndex = index;
        })
        
    })


    next.addEventListener('click', (e) => {
        let song; 
        item[currentIndex].classList.remove('bg-gradient');
        currentIndex = (currentIndex + 1) % item.length;
        item[currentIndex].classList.add('bg-gradient');
        document.querySelector('.play-btn2 i').classList.remove('ri-play-circle-fill');
        document.querySelector('.play-btn2 i').classList.add('ri-pause-circle-fill');
        playAudio(currentIndex);
        song = songs[currentIndex];
        artistBanner(song.img, song.name, song.artist);
    });
    
    previous.addEventListener('click', (e) => {
        let song;
        item[currentIndex].classList.remove('bg-gradient');
        currentIndex = (currentIndex - 1 + item.length) % item.length; 
        item[currentIndex].classList.add('bg-gradient');
        document.querySelector('.play-btn2 i').classList.remove('ri-play-circle-fill');
        document.querySelector('.play-btn2 i').classList.add('ri-pause-circle-fill');
        playAudio(currentIndex);
        song = songs[currentIndex];
        artistBanner(song.img, song.name, song.artist);
    });
    
    document.getElementsByTagName('input')[0].addEventListener('change', (e) => {
        console.log(e.target.value);
        audioPlayer.volume = parseInt(e.target.value) / 100;
        if (e.target.value === '0') {
            document.querySelector('.volume-bar i').classList.remove('ri-volume-down-fill', 'ri-volume-up-fill');
            document.querySelector('.volume-bar i').classList.add('ri-volume-mute-fill');
        } else if (e.target.value > '0' && e.target.value < '80') {
            document.querySelector('.volume-bar i').classList.remove('ri-volume-mute-fill', 'ri-volume-up-fill');
            document.querySelector('.volume-bar i').classList.add('ri-volume-down-fill');
        } else if (e.target.value >= '80' && e.target.value <= '100')  { 
            document.querySelector('.volume-bar i').classList.remove('ri-volume-mute-fill', 'ri-volume-down-fill');
            document.querySelector('.volume-bar i').classList.add('ri-volume-up-fill');
        }        
    });
    
    
let play = document.querySelector('.play-btn2');


play.addEventListener('click', () => {
    if (audioPlayer.paused ) {
        audioPlayer.play();
        document.querySelector('.play-btn2 i').classList.remove('ri-play-circle-fill');
        document.querySelector('.play-btn2 i').classList.add('ri-pause-circle-fill');
    } else {
        audioPlayer.pause();
        document.querySelector('.play-btn2 i').classList.add('ri-play-circle-fill');
        document.querySelector('.play-btn2 i').classList.remove('ri-pause-circle-fill');
    }
    
});


  
    document.querySelector('.hamburger').addEventListener('click',()=>{
        document.querySelector('.left').style.left = 0;
    })
    document.querySelector('.close').addEventListener('click',()=>{
        document.querySelector('.left').style.left = '-100%';
    })

    
    
    

