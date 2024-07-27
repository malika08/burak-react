import { Member } from "./member";
import { Product } from "./product";

/** REACT APP STATE */
export interface AppRootState {
  homePage: HomePageState;
  //productsPage: ProductPageState;
}

/** HOMEPAGE */

export interface HomePageState {
  popularDishes: Product[];
  newDishes: Product[];
  topUsers: Member[];
}

/** PRODUCT PAGE */
/*export interface ProductPageState {
    popularDishes: Product[];
    newDishes: Product[];
    topUsers: Member[];
  } */

/** ORDERS PAGE */
