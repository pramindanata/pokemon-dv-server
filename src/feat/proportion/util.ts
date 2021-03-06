export const transformType = (types: any[]): any[] => {
  return types.map((t) => ({
    id: t.type_id,
    name: t.type_name,
    count: parseInt(t.count),
  }))
}

export const transformGeneration = (generations: any[]): any[] => {
  return generations.map((g) => ({
    generation: parseInt(g.pokemon_generation),
    count: parseInt(g.count),
  }))
}

export const transformLegendary = (legendary: any[]): any[] => {
  return legendary.map((l) => ({
    legendary: l.pokemon_legendary,
    count: parseInt(l.count),
  }))
}
