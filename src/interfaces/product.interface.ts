import Tags from '../enums/tags.enums';

export interface IProduct {
  id?: string;
  name: string;
  price: string;
  count: string;
  tags: Tags[];
  created?: Date;
  modified?: Date;
}

export interface SerializedProduct {
  id: string;
  name: string;
  price: number;
  count: number;
  tags: Tags[];
  created: Date;
  modified: Date;
}
