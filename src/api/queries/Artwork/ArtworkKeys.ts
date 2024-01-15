const ArtworkKeys = {
  artworks: ['artworks'],
  artwork: (id: number) => ['artwork', id],
} as const;

export {ArtworkKeys};
