let songList = [
    {'songname':'5 seconds of summer','cover':'Images/1.jpg', 'path':'Songs/5 Seconds of Summer - Amnesia Lyrics.m4a'},
    {'songname':'Aaj Sajeya','cover':'Images/2.jpg', 'path':'Songs/aajsajeya.m4a'},
    {'songname':'Asal mei','cover':'Images/3.jpg', 'path':'Songs/asalmei.mp3'},
    {'songname':'Kashmir Tu Mei KanyaKumari','cover':'Images/4.jpg', 'path':'Songs/kashmirkanyakumari.m4a'},
    {'songname':'Faded','cover':'Images/5.jpg', 'path':'Songs/Alan Walker - Faded(MP3_128K)_1.mp3'},
    {'songname':'Aazadi','cover':'Images/6.jpg', 'path':'Songs/Azadi - Gully Boy_ Ranveer Singh & Alia Bhatt _ DIVINE _ Dub Sharma _ Siddhant _ Zoya Akhtar.m4a'},
    {'songname':'Challa','cover':'Images/7.jpg', 'path':'Songs/Challa _ Full Song _ Jab Tak Hai Jaan _ Shah Rukh Khan, Katrina Kaif _ Rabbi _ A. R. Rahman _ Gulzar.m4a'},
    {'songname':'B-Praak Crossblade','cover':'Images/8.jpg', 'path':'Songs/B Praak _ Crossblade Live _ Gurnazar _ Dholna _ Robby Singh_ Latest Punjabi Songs 2019(MP3_160K).mp3'},
    {'songname':'Shape of you','cover':'Images/9.jpg', 'path':'Songs/Ed Sheeran - Shape of You [Official Video](MP3_128K)_1.mp3'},
    {'songname':'Dekha Hazaro Dafa','cover':'Images/10.jpg', 'path':'Songs/Dekha Hazaro Dafaa - Full Audio_ Rustom_ Arijit Singh & Palak Muchhal _ Akshay Kumar & Ileana D_cruz.m4a.m4a'},
]
var song = new Audio('');
let index;
let previous; 
let next;
let songpath;

songItems = Array.from(document.getElementsByClassName('songItem'))
songNames = document.getElementsByClassName('songName')
songImages = document.getElementsByClassName('song-image')
songTime = document.getElementsByClassName('songTime')

let progress = document.getElementById('progressbar')
let playandpause = document.getElementById('PauseNPlay')
let gif = document.getElementById('gif-image')
let titlename = document.getElementById('title-name')

playandpause.addEventListener('click' , playing)


songItems.forEach((element,i) => {
    element.children[0].src = songList[i].cover
    element.children[1].innerHTML = songList[i].songname
 
    // var tempsongpath = songList[i].path          //This is not working I don't know why
    // var tempsong = new Audio(tempsongpath)
    // var songlength = parseInt(tempsong.duration)
    // element.children[2].innerHTML = songlength

    // element.getElementsByTagName('img')[0].src = songList[i].cover
    // console.log(element.getElementsByClassName('songName'))
});

function running(count){
    index = count
    previous = count - 1
    next = count + 1
    songpath = songList[count].path
    song.src = songpath;
    song.currentTime = 0
    song.play()
    playandpause.classList.replace("fa-circle-play","fa-circle-pause")
    titlename.innerHTML = songList[count].songname
    gif.style.opacity = 1
}

function replaceIcon(count){
    PauseIndi()
    document.getElementsByClassName('pause-btn')[count].getElementsByTagName('i')[0].classList.replace('fa-circle-play','fa-circle-pause')
}

function playreplace(count){
    document.getElementsByClassName('pause-btn')[count].getElementsByTagName('i')[0].classList.replace('fa-circle-play','fa-circle-pause')
}

function PauseIndi(){
    Array.from(document.getElementsByClassName('pause-btn')).forEach((element, num)=>{
        element.getElementsByTagName('i')[0].classList.replace('fa-circle-pause','fa-circle-play')
        song.pause()
    })
}

Array.from(document.getElementsByClassName('pause-btn')).forEach((element)=>{
    element.addEventListener('click' , (e)=>{
        PauseIndi()

        e.target.classList.replace('fa-circle-play','fa-circle-pause')
        index = e.target.id
        running(index)
    })
})


document.getElementById('previous-play').addEventListener('click', ()=>{
    replaceIcon(previous)
    running(previous)
    
})

document.getElementById('next-play').addEventListener('click', ()=>{
    replaceIcon(next)
    running(next)
})


function playing(){
    if(song.paused || song.ended){
        song.play();
        playandpause.classList.replace("fa-circle-play","fa-circle-pause")
        gif.style.opacity = 1
        playreplace(index)

    }
    else{
        song.pause()
        playandpause.classList.replace("fa-circle-pause","fa-circle-play")
        PauseIndi()
        gif.style.opacity = 0
    }
}

song.addEventListener('timeupdate' , ()=>{
    songProgress = (song.currentTime/song.duration)*100
    progress.value = songProgress
})

progress.addEventListener('change',()=>{
    songTime = (progress.value*song.duration)/100 
    song.currentTime = songTime
})

