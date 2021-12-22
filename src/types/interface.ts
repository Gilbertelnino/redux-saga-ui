export interface GeoType {
  lat: number;
  long: number;
}

export interface AddressType {
  street: string;
  number: string;
  city: string;
  zipcode: string;
  geolocation: GeoType;
}

export interface RatingType {
  rate: number;
  count: number;
}

export interface ProductType {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: RatingType;
  quantity?: number;
}

export interface NameType {
  firstname: string;
  lastname: string;
}

export interface UserType {
  id?: number;
  email: string;
  username: string;
  password: string;
  name: NameType;
  address: AddressType;
  phone: number;
}

export interface LoginType {
  username: string;
  password: string;
}
