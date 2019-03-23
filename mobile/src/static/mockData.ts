export interface MusicSource {
  name: string;
  type: string;
  cover: string;
  creator?: string;
  provider: string;
  providerID: string;
}

export const musicSources: MusicSource[] = [
  {
    name: 'Still Not A Player',
    type: 'Track',
    cover: 'https://i.scdn.co/image/8e27a6ecc55e623ef4bf695397782d40e15fd573',
    creator: 'Big Pun',
    provider: 'Spotify',
    providerID: '3GKL13lkM5nRc4zC1lIOrR',
  },
  {
    name:
      'TV Anime "Shinsekai Yori" ED Shudaika "Wareta Ringo" "Yuki ni Saku Hana"',
    type: 'Album',
    cover: 'https://i.scdn.co/image/dfc792622730ab209bc6dc937f9d93cbc2f55ebf',
    creator: 'Watanabe Saki (CV: Risa Taneda)',
    provider: 'Spotify',
    providerID: '0Kaz0Nu3VKmzUS3hmNX5fD',
  },
  {
    name: 'Life Will Change (Persona 5)',
    type: 'Track',
    cover: 'https://i.scdn.co/image/0731284e07a53c37979ba73ca98c67159e560664',
    creator: 'AmaLee',
    provider: 'Spotify',
    providerID: '3JGQ8LZqQusCMpDluqqKhc',
  },
  {
    name: 'Kanye West',
    type: 'Artist',
    cover: 'https://i.scdn.co/image/a12d8543e28d71d9f1e7f5f363c1a6c73316f9e6',
    provider: 'Spotify',
    providerID: '5K4W6rqBFWDnAN6FQUkS6x',
  },
  {
    name: 'ASTROWORLD',
    type: 'Album',
    cover: 'https://i.scdn.co/image/cdca7dc20c778ada42fb18506ea1f26857f01d17',
    creator: 'Travis Scott',
    provider: 'Spotify',
    providerID: '41GuZcammIkupMPKH2OJ6I',
  },
  {
    name: 'Red Velvet',
    type: 'Artist',
    cover: 'https://i.scdn.co/image/1263ee65dc1c21fb68f4f2bac5cc2e0dfa7c6958',
    provider: 'Spotify',
    providerID: '1z4g3DjTBBZKhvAroFlhOM',
  },
  {
    name: 'Transistor Original Soundtrack',
    type: 'Album',
    cover: 'https://i.scdn.co/image/2fe23859170d279143c7d10043973820416218f2',
    creator: 'Darren Korb',
    provider: 'Spotify',
    providerID: '3B0PgLmgaW0gJth55ApWbw',
  },
  {
    name: 'Drake',
    type: 'Artist',
    cover: 'https://i.scdn.co/image/012ecd119617ac24ab56620ace4b81735b172686',
    provider: 'Spotify',
    providerID: '3TVXtAsR1Inumwj472S9r4',
  },
];

export interface Roll {
  id?: number;
  sources?: MusicSource[];
  filter?: string;
  length?: string;
}

export interface Playroll {
  name: string;
  cover: string;
  creator?: string;
  rolls: Roll[];
}

export const playrolls: Playroll[] = [
  {
    name: 'Overseas Bops',
    cover: musicSources[1].cover,
    rolls: [
      { id: 1, sources: [musicSources[1]] },
      { id: 2, sources: [musicSources[2]] },
      { id: 3, sources: [musicSources[5]] },
    ],
  },
  {
    name: "Poppin' Rap",
    cover: musicSources[7].cover,
    rolls: [
      { id: 1, sources: [musicSources[7]] },
      { id: 2, sources: [musicSources[0]] },
      { id: 3, sources: [musicSources[3]] },
      { id: 4, sources: [musicSources[4]] },
    ],
  },
  {
    name: 'Velvety Goodness',
    cover: musicSources[5].cover,
    rolls: [{ id: 1, sources: [musicSources[5]] }],
  },
  {
    name: "Why aren't ya listenin' son?",
    cover: musicSources[6].cover,
    rolls: [{ id: 1, sources: [musicSources[6]] }],
  },
  {
    name: 'Songs Only',
    cover: musicSources[2].cover,
    rolls: [
      { id: 1, sources: [musicSources[0]] },
      { id: 2, sources: [musicSources[2]] },
    ],
  },
  {
    name: 'Albums Only',
    cover: musicSources[4].cover,
    rolls: [
      { id: 1, sources: [musicSources[1]] },
      { id: 2, sources: [musicSources[4]] },
      { id: 3, sources: [musicSources[6]] },
    ],
  },
  {
    name: 'Artists Only',
    cover: musicSources[3].cover,
    rolls: [
      { id: 1, sources: [musicSources[3]] },
      { id: 2, sources: [musicSources[5]] },
      { id: 3, sources: [musicSources[7]] },
    ],
  },
  {
    name: 'Everything',
    cover: musicSources[0].cover,
    rolls: [
      { id: 1, sources: [musicSources[0]] },
      { id: 2, sources: [musicSources[1]] },
      { id: 3, sources: [musicSources[2]] },
      { id: 4, sources: [musicSources[3]] },
      { id: 5, sources: [musicSources[4]] },
      { id: 6, sources: [musicSources[5]] },
      { id: 7, sources: [musicSources[6]] },
      { id: 8, sources: [musicSources[7]] },
    ],
  },
];
