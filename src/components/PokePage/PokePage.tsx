import "./PokePage.css";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PokeBanner } from "../PokeBanner/PokeBanner";
import { ScrollList } from "../ScrollList/ScrollList";
import { useKeys } from "../../hooks/useKeys/useKeys";
import { Keys } from "../../types/Keys";
import { useGridManager } from "../../hooks/useGridManager/useGridManager";
import { Pokemon } from "../../types/Pokemon";
import { usePokemonData } from "../../hooks/usePokemonData/usePokemonData";

export const PokePage = () => {
  const data = usePokemonData();
  const [activePokemon, setActivePokemon] = useState<Pokemon | undefined>();
  const [activeGeneration, setActiveGeneration] = useState(1);
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const {
    yIndex,
    xIndex,
    moveRight,
    moveLeft,
    moveUp,
    moveDown,
    setScrollCount,
  } = useGridManager();
  const [bannerFocused, setBannerFocused] = useState(false);
  const scrollInProgressRef = useRef(false);
  const [loading, setLoading] = useState(true);

  const keyHandlers = useMemo(
    () => ({
      handlers: {
        [Keys.UP]: () => {
          if (scrollInProgressRef.current || !data?.length) {
            return;
          }

          if (yIndex === 0 && !bannerFocused) {
            setBannerFocused(true);
            return;
          }

          moveUp();
          const nextActGen = activeGeneration - 1;
          setActiveGeneration(nextActGen < 1 ? activeGeneration : nextActGen);
        },
        [Keys.DOWN]: () => {
          if (scrollInProgressRef.current || !data?.length) {
            return;
          }
          moveDown({
            maxIndex: data.length - 1,
          });
          const nextActGen = activeGeneration + 1;
          setActiveGeneration(
            nextActGen > data.length ? activeGeneration : nextActGen
          );
        },
      },
    }),
    [activeGeneration, bannerFocused, data?.length, moveDown, moveUp, yIndex]
  );
  useKeys(keyHandlers);

  const scroll = useCallback((reverse: boolean = false) => {
    window.scrollBy({
      top: reverse ? -280 : 280,
      behavior: "smooth",
    });
    // throttle keys to avoid bad state
    scrollInProgressRef.current = true;
    setTimeout(() => {
      scrollInProgressRef.current = false;
    }, 350);
  }, []);

  // False loading state for visual effect
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const sortedPokemonLists = useMemo(
    () =>
      data?.map((list) =>
        list.sort((a: any, b: any) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        })
      ),
    [data]
  );

  return (
    <>
      <PokeBanner
        loading={loading}
        pk={activePokemon}
        activeGeneration={activeGeneration}
        ttsEnabled={ttsEnabled}
        focused={bannerFocused}
        setBannerFocused={setBannerFocused}
        setTtsEnabled={setTtsEnabled}
      />
      <div className="page-container">
        {!loading &&
          sortedPokemonLists?.map((list: any, i: number) => (
            <ScrollList
              key={`generation-list`}
              list={list}
              focused={i === yIndex && !bannerFocused && !loading}
              xIndex={xIndex}
              yIndex={i}
              itemWidth={350}
              gapSize={20}
              moveRight={moveRight}
              moveLeft={moveLeft}
              setScrollCount={setScrollCount}
              scroll={scroll}
              setActivePokemon={setActivePokemon}
              ttsEnabled={ttsEnabled}
            />
          ))}
        <div style={{ height: 280, width: 10 }} />
      </div>
    </>
  );
};
