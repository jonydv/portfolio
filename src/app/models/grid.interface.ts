import { Language } from './language.interface';
export interface Grid {
  title: Language;
  paragraph: Language;
  imageUrl: string;
  reverse: boolean;
  link?: string;
}
