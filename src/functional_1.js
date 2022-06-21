/**
 * @typedef Person
 *
 * @property {number} age
 * @property {string} city
 * @property {string | string[]} [pet]
 */
/**
 * @type {Person[]}
 */
const people = [
  {
    age: 20,
    city: '서울',
    pet: ['cat', 'dog'],
  },
  {
    age: 40,
    city: '부산',
  },
  {
    age: 31,
    city: '대구',
    pet: ['cat', 'dog'],
  },
  {
    age: 36,
    city: '서울',
  },
  {
    age: 27,
    city: '부산',
    pet: 'cat',
  },
  {
    age: 24,
    city: '서울',
    pet: 'dog',
  },
];

// 1. 30대 미만이 한 명이라도 사는 도시
// const underThirtiesCities = people
//   .filter(({ age }) => age < 30)
//   .map(({ city }) => city);
// const set = new Set(underThirtiesCities);
// const newArr = Array.from(set);
// console.log(newArr);

// const array = [
//   {
//     name: "kim",
//     age: 33,
//   },
//   {
//     age: 33,
//     name: "kim",
//   },
// ];
// const newArry = array.filter(
//   (value, index, self) =>
//     index === self.findIndex((e) => value.name == e.name && value.age === e.age)
// );
// console.log(newArry);

// 2. 각 도시별 개와 고양이를 키우는 사람의 수
/**
 * {
 *      "서울": {
 *          "cat":1,
 *          "dog":2
 *      },
 *      "대구": {
 *          "cat": 1,
 *          "dog": 1,
 *      },
 *      "부산": {
 *          "cat": 1
 *      }
 * }
 */
/** @typedef {Object.<string, Object.<string, number>>} PetsOfCities */
// eslint-disable-next-line no-unused-vars
function solveB() {
  /** @type {PetsOfCities} */
  const result = {};

  /* eslint-disable-next-line */
  for (const person of people) {
    const { city, pet: petOrPets } = person;
    const petOfCity = result[city] || {};

    if (petOrPets) {
      if (typeof petOrPets === 'string') {
        const pet = petOrPets;
        const prevNumOfPet = petOfCity[pet] || 0;
        petOfCity[pet] = prevNumOfPet + 1;
      } else {
        /* eslint-disable-next-line */
        for (const pet of petOrPets) {
          const prevNumOfPet = petOfCity[pet] || 0;
          petOfCity[pet] = prevNumOfPet + 1;
        }
      }
      result[city] = petOfCity;
    }
  }

  return result;
}
// console.log(solveB());
function solveBModern() {
  return (
    people
      .map(({ pet: petOrPets, city }) => {
        const pets =
          (typeof petOrPets === 'string' ? [petOrPets] : petOrPets) || [];

        return {
          city,
          pets,
        };
      })
      .flatMap(({ city, pets }) => pets.map((pet) => [city, pet]))
      /**
     *  [
            [ '서울', 'cat' ],
            [ '서울', 'dog' ],
            [ '대구', 'cat' ],
            [ '대구', 'dog' ],
            [ '부산', 'cat' ],
            [ '서울', 'dog' ]
        ]
     */
      .reduce(
        (result, [city, pet]) => ({
          ...result,
          [city]: {
            ...result[city],
            [pet]: (result[city]?.[pet] || 0) + 1,
          },
        }),
        {}
      )
  );
}
console.log(solveBModern());
