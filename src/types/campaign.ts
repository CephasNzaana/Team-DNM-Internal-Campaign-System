
export interface Agent {
  id: string;
  fullName: string;
  contact: string;
  address: string;
  pollingStation: string;
  mobilizer: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
}

export const CAMPAIGN_TEAM: TeamMember[] = [
  { id: '1', name: 'Levis', role: 'Team Member' },
  { id: '2', name: 'Cephas', role: 'Team Member' },
  { id: '3', name: 'Paul', role: 'Team Member' },
  { id: '4', name: 'Sunday', role: 'Team Member' },
  { id: '5', name: 'Shammy', role: 'Team Member' },
  { id: '6', name: 'Nick', role: 'Team Member' },
  { id: '7', name: 'Edwin', role: 'Team Member' },
  { id: '8', name: 'Joseph', role: 'Team Member' },
  { id: '9', name: 'Alfa', role: 'Team Member' },
  { id: '10', name: 'Mima', role: 'Team Member' },
  { id: '11', name: 'Vallence', role: 'Team Member' },
  { id: '12', name: 'Precious', role: 'Team Member' },
  { id: '13', name: 'Cliton', role: 'Team Member' },
  { id: '14', name: 'Seth', role: 'Team Member' },
  { id: '15', name: 'Lambert', role: 'Team Member' },
];

export const AGENT_DATABASE: Agent[] = [
  {
    id: '1',
    fullName: 'Twinomujuni Richard',
    contact: '0773164565',
    address: 'Kamatojo cell',
    pollingStation: 'St Ignatius University',
    mobilizer: 'Levis'
  },
  {
    id: '2',
    fullName: 'Niwandinda Anthony',
    contact: '0789867990',
    address: 'Rwamukundi cell',
    pollingStation: 'Rwamukundi',
    mobilizer: 'Levis'
  },
  {
    id: '3',
    fullName: 'Mercy Bajungu',
    contact: '0774025390',
    address: 'Kamukira cell',
    pollingStation: 'Kamukira health centre',
    mobilizer: 'Levis'
  },
  {
    id: '4',
    fullName: 'Tumwesigye Pius',
    contact: '0772007490',
    address: 'Nyakabungo',
    pollingStation: 'Ndorwa saza headquarters',
    mobilizer: 'Levis'
  },
  {
    id: '5',
    fullName: 'Niwamanya Obed',
    contact: '0785790550',
    address: 'Rugarama cell',
    pollingStation: 'Kigezi high school secondary',
    mobilizer: 'Levis'
  },
  {
    id: '6',
    fullName: 'Ashaba Innocent',
    contact: '0767365104',
    address: 'Rwamukundi cell',
    pollingStation: 'Not fully specified',
    mobilizer: 'Levis'
  },
  {
    id: '7',
    fullName: 'Joventa Musimenta',
    contact: '0784203417',
    address: 'Kabahangala cell, Karubanda ward',
    pollingStation: 'Kabahangala',
    mobilizer: 'Levis'
  },
  {
    id: '8',
    fullName: 'Tayebwa Brian',
    contact: '0773737748',
    address: 'Kabahangala cell, Karubanda ward',
    pollingStation: 'Kabahangala',
    mobilizer: 'Levis'
  },
  {
    id: '9',
    fullName: 'Muhangi Julius',
    contact: '0773708342',
    address: 'Kabahangala cell, Karubanda ward',
    pollingStation: 'Kabahangala',
    mobilizer: 'Levis'
  },
  {
    id: '10',
    fullName: 'Byamugisha Kevin',
    contact: '0784390860',
    address: 'Rugyendeira cell, Rushaki ward',
    pollingStation: 'Canteen',
    mobilizer: 'Levis'
  },
  {
    id: '11',
    fullName: 'Tumwikirize Kete',
    contact: '0779174018',
    address: 'Igabiro cell',
    pollingStation: 'New Foundation',
    mobilizer: 'Levis'
  },
  {
    id: '12',
    fullName: 'Tweheyo Ivan',
    contact: '0782248429',
    address: 'Rwamukundi cell',
    pollingStation: 'Kamukira',
    mobilizer: 'Levis'
  },
  {
    id: '13',
    fullName: 'Peter Sunday',
    contact: '0783589873',
    address: 'Ihimbi cell',
    pollingStation: 'Rutooma',
    mobilizer: 'Levis'
  },
  {
    id: '14',
    fullName: 'Kiiza Dan',
    contact: '0788183621',
    address: 'Kamukira cell',
    pollingStation: 'Kirigime central',
    mobilizer: 'Levis'
  },
  {
    id: '15',
    fullName: 'Ruhumuriza Nicholas',
    contact: '0773251842',
    address: 'Kekubo cell',
    pollingStation: 'St. Mudesta',
    mobilizer: 'Levis'
  },
  {
    id: '16',
    fullName: 'Kyasimire Annette',
    contact: '0774920764',
    address: 'Nyakiharo',
    pollingStation: 'Uganda Martyrs University',
    mobilizer: 'Levis'
  }
];
