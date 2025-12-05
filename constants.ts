import { Vertical } from './types';

export const VERTICALS: Vertical[] = [
  { id: 'napoli', name: 'SpazioNapoli', url: 'spazionapoli.it', color: 'napoli', teamName: 'SSC Napoli' },
  { id: 'milan', name: 'SpazioMilan', url: 'spaziomilan.it', color: 'milan', teamName: 'AC Milan' },
  { id: 'inter', name: 'SpazioInter', url: 'spaziointer.it', color: 'inter', teamName: 'Inter Milan' },
  { id: 'juve', name: 'SpazioJ', url: 'spazioj.it', color: 'juve', teamName: 'Juventus FC' },
  { id: 'rompipallone', name: 'Rompipallone', url: 'rompipallone.it', color: 'rompi', teamName: 'Calcio Serie A polemiche' },
];

export const MOCK_SUGGESTIONS = [
  {
    id: '1',
    topic: 'Kvaratskhelia Renewal',
    description: 'Latest updates on the contract negotiations. Tensions rising with the agent.',
    seoTitle: 'Rinnovo Kvaratskhelia Napoli: cifre e dettagli offerta',
    discoverTitle: 'Napoli, gelo sul rinnovo: la mossa dell\'agente spiazza tutti',
    category: 'Trending',
    score: 95,
    reasoning: 'High search volume on player name + contract keywords.'
  }
];