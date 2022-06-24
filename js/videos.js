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
source.setAttribute('name','3');
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
    videos.currentTime = 1.5;
    videos.setAttribute('poster',data[id.id]['img'])
    });

    
})




function videoPlayer(){
    const video = document.getElementById("videoPrincipal")
    const iconoplay = document.getElementById("iconoplay")
    const videoContainer = document.getElementById("video-container")
    const play = document.getElementById("play")
    const control = document.getElementById("control")
    const backwardSeconds = document.getElementById("backwardSeconds")
    const forwardSeconds = document.getElementById("forwardSeconds")
    const mute = document.getElementById("mute")
    const volumen = document.getElementById("volumen")
    const siguiente = document.getElementById("siguiente")
    const fullScreen = document.getElementById("fullScreen")

    let onFullscreen = false;
    let duration;

    video.removeAttribute("controls")
    
   video.addEventListener("playing",()=>{
    iconoplay.className = iconoplay.className.replace('bi bi-play-fill iconos' , '' )
    iconoplay.setAttribute('class',"bi bi-pause-circle-fill iconos")
    })
    
    video.addEventListener("pause",()=>{
        iconoplay.className = iconoplay.className.replace('bi-pause-circle-fill' , '' )
        iconoplay.setAttribute('class',"bi bi-play-fill iconos")
    })

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

    backwardSeconds.onclick = () =>{
        video.currentTime = video.currentTime-1
    };
    forwardSeconds.onclick = () =>{
        video.currentTime = video.currentTime+1
    }

    mute.onclick = () =>{
        if(video.muted === false){
        video.muted = true
        volumen.className = volumen.className.replace('bi bi-volume-mute iconos' , '' )
        volumen.setAttribute('class',"bi bi-volume-up-fill iconos")
        }else{
            video.muted = false
            volumen.className = volumen.className.replace('bi bi-volume-up-fill iconos' , '' )
            volumen.setAttribute('class',"bi bi-volume-mute iconos")
        }

    }
    
    
 /*   siguiente.onclick = () =>{
            siguienteVideo(video.getAttribute('name'))
    }*/

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
}


function cambiarVideo(video,titulo){
    source.setAttribute('src',video);
    tituloPrincipal.innerHTML=titulo;
}

function siguienteVideo(id){
    let elementos = data.length-1
    console.log(elementos)
    console.log(id)
    if(elementos >= id){
        console.log('dentro de if')
        id += 1;
        console.log(id)
        let videoS = data[id]['video']
        console.log(videoS)
        let tituloS = data[id]['titulo']
        source.setAttribute('src',videoS);
        tituloPrincipal.innerHTML=tituloS;
    }
   
   
}

videoPlayer();
