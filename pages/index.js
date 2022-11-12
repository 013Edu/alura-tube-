import config from "../config.json";
import styled from "styled-components";
import Menu from "../components/Menu";
import { CSSReset } from "../components/ResetCss/ResetCss";
import { StyledTimeline } from "../components/Timeline/style.js";
import { ThemeProvider } from "styled-components";
import { useState } from "react";
import ColorModeProvider, {
  ColorModeContext,
} from "../components/Menu/components/Colormode";
import { useContext } from "react";
import { RegisterVideo } from "../components/RegisterVideo";
import { useEffect } from "react";
import { videoService } from "../service/videoService";

function ProviderWrapper(props) {
  return (
    <ColorModeProvider initialValue={"dark"}>
      {props.children}
    </ColorModeProvider>
  );
}

function HomePage() {

  const [playlists, setPlaylists] = useState({});

  const service = videoService()

  useEffect(() => {
    service
    .getAllVideos()
      .select("*")
      .then((dados) => {
        const novaPlaylist = {...playlists}
        dados.data.forEach((video) => {
            if(!novaPlaylist[video.playlists]){
                novaPlaylist[video.playlists] = []
            }
          novaPlaylist[video.playlists].push(video);
        });
        setPlaylists(novaPlaylist)
      });
  }, []);

  const theme = {
    light: {
      backgroundBase: "#f9f9f9",
      backgroundLevel1: "#ffffff",
      backgroundLevel2: "#f0f0f0",
      borderBase: "#e5e5e5",
      textColorBase: "#222222",
    },
    dark: {
      backgroundBase: "#181818",
      backgroundLevel1: "#202020",
      backgroundLevel2: "#313131",
      borderBase: "#383838",
      textColorBase: "#FFFFFF",
    },
  };

  const [valorDoFiltro, setValorDoFiltro] = useState("");

  const context = useContext(ColorModeContext);

  return (
    <ThemeProvider theme={theme[context.mode]}>
      <CSSReset />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <Menu
          valorDoFiltro={valorDoFiltro}
          setValorDoFiltro={setValorDoFiltro}
        />
        <Header />
        <Timeline searchValue={valorDoFiltro} playlists={config.playlists}></Timeline>
      </div>
      <RegisterVideo />
    </ThemeProvider>
  );
}

export default function _App(props) {
  return (
    <ProviderWrapper>
      <HomePage {...props} />
    </ProviderWrapper>
  );
}

const StyledHeader = styled.div`
  background-color: ${({ theme }) => theme.backgroundLevel1};
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .user-info {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
  }
`;

const StyledBanner = styled.div`
  background-image: url(${({ bg }) => bg});
  height: 330px;
`;

function Header() {
  return (
    <StyledHeader>
      <StyledBanner bg={config.bg} />
      <section className="user-info">
        <img src={`https://github.com/${config.profile}.png`} />
        <div>
          <h2>{config.name}</h2>
          <p>{config.job}</p>
        </div>
      </section>
    </StyledHeader>
  );
}

function Timeline({ searchValue, ...propriedades }) {
  const playlistNames = Object.keys(propriedades.playlists);

  return (
    <StyledTimeline>
      {playlistNames.map((playlistName) => {
        const videos = propriedades.playlists[playlistName];
        return (
          <section key={playlistName}>
            <h2>{playlistName}</h2>
            <div>
              {videos
                .filter((video) => {
                  const titleNormalized = video.title.toLowerCase();
                  const serachValueNormalized = searchValue.toLowerCase();
                  return titleNormalized.includes(serachValueNormalized);
                })
                .map((video) => {
                  return (
                    <a key={video.url} href={video.url}>
                      <img src={video.thumb} />
                      <span>{video.title}</span>
                    </a>
                  );
                })}
            </div>
          </section>
        );
      })}
    </StyledTimeline>
  );
}
