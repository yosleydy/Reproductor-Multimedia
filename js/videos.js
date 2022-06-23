let data = [
    {
        id:0,
        titulo:'Evanescence - Bring Me To Life',
        video:'./assets/videos/Evanescence.mp4#t=0.5',
        img:'./assets/img/evanescence.jpg'
    },
    {
        id:1,
        titulo:"Aerosmith - I Don't Want to Miss a Thing",
        video:'./assets/videos/Aerosmith.mp4',
        img:'./assets/img/areosmith.jpg',
    },
    {
        id:2,
        titulo:'Gorillaz - Clint Eastwood',
        video:'./assets/videos/Gorillaz.mp4',
        img:'./assets/img/gorillaz.jpg',
    },
    {
        id:3,
        titulo:'Linkin Park - Numb',
        video:'./assets/videos/linkin-park.mp4',
        img:'./assets/img/Linkin_Park.jpg',
    },
]



let ul = document.getElementById("lista_de_videos");
let elementsLi = [];

const source = document.getElementById("videoPrincipal")
source.setAttribute('src',data[3]['video']);
const tituloPrincipal = document.getElementById("titulo")
tituloPrincipal.innerHTML=data[3]['titulo'];

data.forEach(id => {
    elementsLi.push(id.titulo)
    const li = document.createElement('li')
    li.setAttribute('title',id.titulo)
    const videos = document.createElement('video')
    videos.setAttribute('class','videos')
    videos.setAttribute('id',data[id.id]['id'])
    videos.setAttribute('src',data[id.id]['video'])
    videos.muted = true;
    videos.setAttribute('poster',data[id.id]['img'])
    const a = document.createElement('a')
    a.setAttribute('href','#')
    a.onclick = function(){cambiarVideo(data[id.id]['video'],data[id.id]['titulo'])}
    a.appendChild(videos)
    li.appendChild(a)
    ul.appendChild(li)



    videos.addEventListener("mouseenter",(event)=>{
        videos.play()
    })

    videos.addEventListener('mouseleave', function() {
    videos.pause();
    videos.currentTime = 0;
    videos.setAttribute('poster',data[id.id]['img'])
    });

    
})




function videoPlayer(){
    const video = document.getElementById("videoPrincipal")

    const videoContainer = document.getElementById("video-container")
    const play = document.getElementById("play")
    const control = document.getElementById("control")
    const backwardSeconds = document.getElementById("backwardSeconds")
    const forwardSeconds = document.getElementById("forwardSeconds")
    const fullScreen = document.getElementById("fullScreen")

    let onFullscreen = false;
    let duration;

/*console.log('ghfgh');
    const source = document.getElementById("principal")
    source.setAttribute('src',data[0]['video']);*/

    video.removeAttribute("controls")
  /* video.addEventListener("playing",()=>{
    })
    video.addEventListener("pause",()=>{
    })*/

    video.addEventListener("loadeddata",(event)=>{
        duration = event.target.duration
    })

    video.addEventListener("timeupdate",(event)=>{
        const percentage = (event.target.currentTime/duration)*100
        control.value = percentage
    });
    control.oninput = (event)=>{
        video.currentTime = (duration/100)*event.target.value
    }

   /* document.getElementById("0").addEventListener("mouseenter",(event)=>{
            document.getElementById("0").play()
    })

    document.getElementById("0").addEventListener('mouseleave', function() {
        document.getElementById("0").pause()
		console.log('El ratón está afuera del elemento');
	});*/


    backwardSeconds.onclick = () =>{
        video.currentTime = video.currentTime-1
    };
    forwardSeconds.onclick = () =>{
        video.currentTime = video.currentTime+1
    }

    fullScreen.onclick = ()=>{
        if(onFullscreen){
            onFullscreen = false
            document.exitFullscreen()
        }else{
            onFullscreen = true
            videoContainer.requestFullscreen()
        }
    };
    play.onclick = ()=>{
        if(video.paused){
            video.play()
        }else{
            video.pause()
        }
    }

    console.log(data);
}


function cambiarVideo(video,titulo){
    source.setAttribute('src',video);
    tituloPrincipal.innerHTML=titulo;
}

videoPlayer();
