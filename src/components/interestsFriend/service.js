import { Promise } from "es6-promise";
import { getRandomArbitrary } from "../../utils/random";

export class Service {

  static addItem(item) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          name: item,
          id: parseInt(getRandomArbitrary(0, 1000))
        });
      }, getRandomArbitrary(0, 1000));
    });
  }

  static removeItem(itemId) {
    return itemId;
  }

  static getInterest() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          name: "Музыка",
          id: 1,
          items: [
            "Fallout 3 OST",
            "Doom metal",
            "Deathcore",
            "Metal"
          ].map((item, index) => ({ name: item, id: [1, 2, 3, 4][index] }))
        });
      }, getRandomArbitrary(0, 1000));
    });
  }

  static getMoreInterests(id) { //eslint-disable-line
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          "Пугачева",
          "буланова",
          "Neurofunk",
          "Фолк",
          "джазз",
          "Imagine Dragons",
          "Deep Purple",
          "Pain"
        ].map(item => ({ name: item, id: parseInt(getRandomArbitrary(1000, 2000)) })));
      }, getRandomArbitrary(0, 1000));
    });
  }
}
