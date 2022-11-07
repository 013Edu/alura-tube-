import './style.js'

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
                                    <a href={video.url}>
                                        <img src={video.thumb} />
                                        <span>
                                            {video.title}
                                        </span>
                                    </a>
                                )
                            })}
                        </div>
                    </section>
                )
            })}
        </div>
        
    )
}