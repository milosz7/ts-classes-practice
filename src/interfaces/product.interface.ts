import Tags from '../enums/tags.enums';

interface IProduct {
  id?: string;
  name: string;
  price: number;
  count: number;
  tags: Tags[];
  created?: Date;
  modified?: Date;
}

export default IProduct;
