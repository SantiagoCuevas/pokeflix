import "./PokeBanner.css";

interface PokeBannerProps {
  pk: any;
}

export const PokeBanner = (props: PokeBannerProps) => {
  const { pk } = props;

  if (!pk) {
    return <h1>loading...</h1>;
  }

  return (
    <>
      <div className="poke-banner">
        <div className="poke-card">
          <div className="poke-metadata">
            <h1>{pk?.name?.toUpperCase()}</h1>
            <h2>{pk?.types?.[0]?.type?.name?.toUpperCase()}</h2>
          </div>
        </div>
        <div className="poke-gif-container">
          <img
            className="poke-gif"
            src={pk?.sprites.other.showdown.front_default}
          />
        </div>
      </div>
      <div className="fake" />
    </>
  );
};
