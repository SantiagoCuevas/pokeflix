import "./PokeBanner.css";
import pokeballLoader from "../../assets/pokeloader.gif";
import { useKeys } from "../../hooks/useKeys/useKeys";
import { useMemo } from "react";
import { Keys } from "../../types/Keys";

interface PokeBannerProps {
  pk: any;
  activeGeneration: number;
  ttsEnabled: boolean;
  setBannerFocused: (isFocused: boolean) => void;
  setTtsEnabled: (isEnabled: boolean) => void;
  focused?: boolean;
  loading?: boolean;
}

export const PokeBanner = (props: PokeBannerProps) => {
  const {
    pk,
    activeGeneration,
    loading = false,
    ttsEnabled,
    setBannerFocused,
    setTtsEnabled,
    focused = false,
  } = props;

  const keyHandlers = useMemo(
    () => ({
      handlers: {
        [Keys.DOWN]: () => {
          if (focused) {
            setBannerFocused(false);
          }
        },
        [Keys.ENTER]: () => {
          if (focused) {
            setTtsEnabled(!ttsEnabled);
            const msg = new SpeechSynthesisUtterance();
            msg.text = `TTS Mode ${ttsEnabled ? "Off" : "On"}`;
            window.speechSynthesis.speak(msg);
          }
        },
      },
    }),
    [focused, setBannerFocused, setTtsEnabled, ttsEnabled]
  );
  useKeys(keyHandlers);

  const name = pk?.name?.toUpperCase() || "LOADING...";
  const type = pk?.types?.[0]?.type?.name?.toUpperCase() || "?";
  const gif = pk?.sprites.other.showdown.front_default || pokeballLoader;
  const generation = loading ? "?" : activeGeneration;

  return (
    <>
      <div className="poke-banner">
        <div className="poke-card">
          <div className="poke-metadata">
            <h1>{name}</h1>
            <h2>
              {type} TYPE - GENERATION {generation}
            </h2>
            <div className="poke-stats-container">
              {pk?.stats?.map((stat) => (
                <div className="poke-stat-pill">
                  <div className="poke-stat-label">
                    {stat.stat.name.toUpperCase()}: {stat.base_stat}
                  </div>
                  <div
                    className="poke-stat-bar"
                    style={{ width: stat.base_stat }}
                  />
                </div>
              ))}
            </div>
            {!loading && (
              <div className="poke-instructions">
                <h3>NAVIGATE WITH THE ARROW KEYS</h3>
                <h3>
                  PRESS <b>ENTER</b> TO HEAR THEIR SOUND
                </h3>
              </div>
            )}
            {!loading && (
              <div className="tts-toggle" data-focused={focused}>
                Text To Speech Mode: {ttsEnabled ? "ON" : "OFF"}
              </div>
            )}
          </div>
        </div>
        <div className="poke-gif-container">
          <img className="poke-gif" src={gif} />
        </div>
      </div>
      <div className="fake" />
    </>
  );
};
