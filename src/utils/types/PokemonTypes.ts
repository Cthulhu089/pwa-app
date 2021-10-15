export type EvolutionLineProps = {
  name: string;
  sprite: string;
};

export type TypesProps = {
  type: {
    name: string;
  };
};

export type AbilitiesProps = {
  ability: {
    name: string;
  };
};

export type SpeciesProps = {
  url: string;
  name: string;
};

export type PokemonProps = {
  name: string;
  abilities: AbilitiesProps[];
  sprites: {
    front_default: string;
  };
  types: TypesProps[];
  species: SpeciesProps;
};

export type EvolveToProps = {
  species: SpeciesProps;
};

export type EvolveProps = {
  evolves_to: EvolveToProps[];
  species: SpeciesProps;
};
