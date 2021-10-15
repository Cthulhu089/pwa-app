import { useCallback, useEffect, useState } from "react";
import Row from "../../../../components/Layout/Row";
import Column from "../../../../components/Layout/Column";
import Text from "../../../../components/basics/Text";
import { getMethod } from "../../../../utils/methods/GetMethod";
import {
  EvolveProps,
  PokemonProps,
} from "../../../../utils/types/PokemonTypes";

type EvolutionProps = {
  name: string;
  sprite: string;
};

type EvolutionLineProps = {
  name: string;
  evolveLine: EvolveProps;
};

const EvolutionLine = ({ evolveLine, name }: EvolutionLineProps) => {
  const [evolutionChain, setEvolutionChain] = useState<EvolutionProps[]>();

  const createEvolutionLine = useCallback(async (evolutionNames) => {
    let evolutionLine: EvolutionProps[] = [];
    evolutionLine = await Promise.all(
      await evolutionNames.map(async (pokemonName) => {
        const pokemon: PokemonProps = await getMethod(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
        );
        return {
          name: pokemon.name,
          sprite: pokemon.sprites.front_default,
        };
      })
    );
    setEvolutionChain(evolutionLine);
  }, []);

  const setEvolutionLine = useCallback(
    (evolveLine, pokemonName) => {
      let evolutionNames: string[] = [];
      const {
        species: { name },
        evolves_to,
      } = evolveLine;

      if (name !== pokemonName) {
        evolutionNames.push(name);
      }

      evolves_to.forEach(({ species: { name } }) => {
        if (name !== pokemonName) {
          evolutionNames.push(name);
        }
      });

      createEvolutionLine(evolutionNames);
    },
    [createEvolutionLine]
  );

  useEffect(() => {
    if (!!evolveLine && !!name) {
      setEvolutionLine(evolveLine, name);
    }
  }, [setEvolutionLine, evolveLine, name]);

  return (
    <Row pt={5} pb={50}>
      {!!evolutionChain &&
        evolutionChain.map(({ name, sprite }) => (
          <Column width={1} key={name}>
            <Row>
              <img width="150px" src={sprite} alt={name} />
            </Row>
            <Row ml={9}>
              <Text>{name}</Text>
            </Row>
          </Column>
        ))}
    </Row>
  );
};

export default EvolutionLine;
