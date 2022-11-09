import Video from '../../pages/vide.js'
import './style.js'
import Link from 'next/link.js'

export function Timeline(props){
    const playlistNames = Object.keys(props.playlist)
    return(
        <div>
            {playlistNames.map((playlistNames) =>{
                const videos = props.playlist[playlistNames]
                return(
                    <section>
                        <h2> {playlistNames} </h2>
                        <div>
                            {videos.map((video) =>{
                                return(
                                   <Link legacyBehavior href='/vide'>
                                         <a >
                                        <img src={video.thumb} />
                                        <span>
                                            {video.title}
                                        </span>
                                    </a>
                                   
                                   </Link>
                                )
                            })}
                        </div>
                    </section>
                )
            })}
        </div>
        
    )
}