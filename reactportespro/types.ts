
export interface InventoryItem {
  id: string;
  name: string;
  category: 'Pequeño' | 'Mediano' | 'Grande' | 'Especial';
  volume: number; // m3
  quantity: number;
}

export interface QuoteDetails {
  origin: string;
  destination: string;
  distance: number;
  items: InventoryItem[];
  totalPrice: number;
}

export enum LocationType {
  MARBELLA = 'Marbella',
  CALA_DE_MIJAS = 'Cala de Mijas',
  FUENGIROLA = 'Fuengirola',
  ESTEPONA = 'Estepona',
  MALAGA = 'Málaga',
  BENALMADENA = 'Benalmádena',
  TORREMOLINOS = 'Torremolinos',
  OTHER = 'Otro'
}
