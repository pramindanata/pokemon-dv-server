export const transformType = (types: any[]): any[] => {
  return types.map((t) => ({
    id: t.type_id,
    name: t.type_name,
    count: parseInt(t.count),
  }))
}
