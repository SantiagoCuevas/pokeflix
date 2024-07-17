import "./PokeBanner.css";
import pokeballLoader from "../../assets/pokeloader.gif";

interface PokeBannerProps {
  pk: any;
  activeGeneration: number;
  loading?: boolean;
}

export const PokeBanner = (props: PokeBannerProps) => {
  const { pk, activeGeneration, loading = false } = props;

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
