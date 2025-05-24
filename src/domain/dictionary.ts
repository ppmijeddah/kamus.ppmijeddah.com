export type DictionaryEntry = {
  id: number;
  uuid: string;
  amiyah: string;
  amiyah_arab: string;
  indonesia: string;
  fushah: string;
  fushah_arab: string;
  category_id?: string;
  category_name?: string;
  example: string;
};

export interface Category {
  id: number;
  name: string;
  rank: number;
}
