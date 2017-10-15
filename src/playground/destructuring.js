

// const person={
//   //name: 'Sanghyuk',
//   age: 25,
//   location: {
//       city: 'Seoul',
//       temp: 21
//   }
// };
//
//
// // const name = person.name;
// // const age= person.age;
//
// const {name: firstname='Anonymous', age, location}=person;
//
// console.log(`${firstname} is ${age}.`);
//
// const {city, temp: temperature} = person.location;
//
// if(city && temperature){
//     console.log(`It's ${temperature} in ${city}`)
// }
// //
// // if(person.location.city &&person.location.temp) {
// //     console.log(`It's ${person.location.temp} in ${person.location.city}.`);
// // }
//
// const book ={
//     title : 'Ego is the Enemy',
//     author: 'Ryan Holiday',
//     publisher:{
//         name: 'Penguin'
//     }
// };
//
// const {name: publisherName = 'Self-Publisher'}=book.publisher;
//
// console.log(publisherName); //Penguin

const address =['22200 Haesong-ro', 'Yeonsu-gu', 'Incheon', '22200'];

//일반적인 방법
console.log(`You are in ${address[1]}  ${address[2]}.`);
//destructuring
const [, city, state='New York'] = address; //위치로 매칭 된다

console.log(`You are in ${city} ${state}`);
//첫번째 세개만 하고 싶으면 그냥 zip 빼도 되
//그런데 맨 앞꺼 빼고 싶으면 comma는 남겨 놔야되


const item=['coffee (hot)', '$2.00' , '$2.50', '$2.75'];

const [itemName, ,mediumPrice ] = item;
console.log(`A menium ${itemName} is ${mediumPrice}`);






