const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
  
];

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

//selecting DOM elements: render facts in lists
const btn = document.querySelector(".btn-open");
const form = document.querySelector(".fact-form");
const factsList = document.querySelector(".facts-list")


//Load data from Supabase

loadfacts();
async function loadfacts(){
  const res = await fetch("https://gkuxigwuirxwibgzqgeu.supabase.co/rest/v1/facts", {
    headers:{
      apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrdXhpZ3d1aXJ4d2liZ3pxZ2V1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE5OTQwMzUsImV4cCI6MjAyNzU3MDAzNX0.QiKeYrZZMw9_RQDwVsdrdw6LZNOxaNOyMNCJSFUYEWU",
      authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrdXhpZ3d1aXJ4d2liZ3pxZ2V1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE5OTQwMzUsImV4cCI6MjAyNzU3MDAzNX0.QiKeYrZZMw9_RQDwVsdrdw6LZNOxaNOyMNCJSFUYEWU",
    }
  });
  const data = await res.json();
  // console.log(data);
// const filteredData = data.filter((fact) => fact.category === "society");
createFactsList(data);
}

//Create DOM elemts: Render facts in lists
factsList.innerHTML = "";

// createFactsList(initialFacts);
function createFactsList(dataArray){
  // factsList.insertAdjacentHTML("afterbegin", "<li>Jonas</li>");
// factsList.insertAdjacentHTML("afterbegin", "<li>Bharath</li>");

const htmlArr = dataArray.map((fact) => `<li class="fact">
<p>${fact.text}<a  class="Source"  href="${fact.source}"
                target="_blank">(Source)</a> </p>
                <span class="tag" style="background-color: ${CATEGORIES.find((cat) =>  cat.name ===  fact.category )}">${fact.category}</span></li>`)
console.log(htmlArr);
const html = htmlArr.join("");
factsList.insertAdjacentHTML("afterbegin", html);
}


//Toggle form visibility:
btn.addEventListener("click", function () {
  

   if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
    btn.textContent = "Close";
   }
   else{
    form.classList.add("hidden");
    btn.textContent =" Share a fact";
   }
} )

console.log([7,64,6,-23,11].filter((el) => el > 10));
console.log([7,64,6,-23,11].find((el) => el > 6));







// let votesInteresting = 25;
// let votesMindblowing = 5;
// const text = "Lisbon is the capial of portugal";

// votesInteresting = votesInteresting + 1;
// votesInteresting++;
// console.log(votesInteresting);



// let totalUpvotes = votesInteresting + votesMindblowing ;
// console.log("Upvotes : "+totalUpvotes);

// let votesFalse = 34;
// const isCorrect = votesFalse < totalUpvotes;
// console.log(isCorrect);


 //Functions
function calcFactAge(year){
// const currentYear = 2024;
const currentYear = new Date().getFullYear();
const age = currentYear - year;
if(age >= 0){
    return age;
}
else{
    return `Impossible Year. the year needs to be less than or equal ${currentYear} `;
}



}

const age1 = calcFactAge(2015);
console.log(age1);

console.log(calcFactAge(2025));
console.log(calcFactAge(2028));



//Arrow Functions
const calcFactAge2 = (year) =>  new Date().getFullYear() - year;
const calcFactAge3 = (year) => year <=  new Date().getFullYear() ? new Date().getFullYear() - year : `Impossible Year. the year needs to be less than or equal ${ new Date().getFullYear()}`;
console.log(calcFactAge2(2015))
console.log(calcFactAge3(2015))

// //Taking decision with if/else statement:-
// let votesInteresting = 10;
// let votesMindblowing = 20;

// console.log(votesInteresting === votesMindblowing);
// if(votesInteresting === votesMindblowing){
//  alert("this fact is equally interesting and mindblowing");
// }
// else if(votesInteresting > votesMindblowing){
//     console.log("Interesting fact")
// }
// else{
// console.log("Something else")
// }


// //Ternary Operator
// let votesFalse = 7;
// const totalUpvotes = votesInteresting + votesMindblowing;

// const message = totalUpvotes > votesFalse ? "the fact is true " : "Might be false, check more sources...";

// // alert(message);



// //Working with Strings
// const text = "Lisbon is the capial of portugal";
// const upperText = text.toUpperCase();
// console.log(upperText);
// const num = 2+2;

// const str = `the current fact is "${text}"  It is probably ${totalUpvotes > votesFalse ? "correct": "not True"}`;
// console.log(str);


// Arrays :- 
const fact = ["Hi i am bharath",2015,true];
console.log(fact);
console.log(fact[0]);
console.log(fact.length);
//destructuring in Array
const [text, createdIn, isCorrect] = fact;
console.log(text);
//spreading in Array
const newFact = [...fact,"society"];
console.log(newFact);
//Looping Over Arrays:forEach & map Methods:-
// [2, 3, 4, 5].forEach(function(el){
//   console.log(el);
// });
// //map using functions:-
// const times10 = [2, 3, 4, 5].map(function(el){
//     return el*10;
// });
// console.log(times10);
//map using Arrow functions:-
const times11 = [2, 3, 4, 5].map((el) => el * 11 );
console.log(times11);
// const CATEGORIES = [
//     { name: "technology", color: "#3b82f6" },
//     { name: "science", color: "#16a34a" },
//     { name: "finance", color: "#ef4444" },
//     { name: "society", color: "#eab308" },
//     { name: "entertainment", color: "#db2777" },
//     { name: "health", color: "#14b8a6" },
//     { name: "history", color: "#f97316" },
//     { name: "news", color: "#8b5cf6" },
//   ];

  // console.log (CATEGORIES.find((cat) => cat.name === "society"));
  const allCategories = CATEGORIES.map((el) => el.name);
  console.log(allCategories);


  // const initialFacts = [
  //   {
  //     id: 1,
  //     text: "React is being developed by Meta (formerly facebook)",
  //     source: "https://opensource.fb.com/",
  //     category: "technology",
  //     votesInteresting: 24,
  //     votesMindblowing: 9,
  //     votesFalse: 4,
  //     createdIn: 2021,
  //   },
  //   {
  //     id: 2,
  //     text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
  //     source:
  //       "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
  //     category: "society",
  //     votesInteresting: 11,
  //     votesMindblowing: 2,
  //     votesFalse: 0,
  //     createdIn: 2019,
  //   },
  //   {
  //     id: 3,
  //     text: "Lisbon is the capital of Portugal",
  //     source: "https://en.wikipedia.org/wiki/Lisbon",
  //     category: "society",
  //     votesInteresting: 8,
  //     votesMindblowing: 3,
  //     votesFalse: 1,
  //     createdIn: 2015,
  //   },
  // ];

  function calcFactAge(year){
    // const currentYear = 2024;
    const currentYear = new Date().getFullYear();
    const age = currentYear - year;
    if(age >= 0){
        return age;
    }
    else{
        return `Impossible Year. the year needs to be less than or equal ${currentYear} `;
    }
    
}

const factAges = initialFacts.map((el) => calcFactAge(el.createdIn));
console.log(factAges);

// //objects:-

// const factObj = {
//     text : " hi i am bharath...",
//     category: "society",
//     createdIn: 2015,
//     isCorrect: true,
//     createSummary: function () {
//         return `the fact "${this.text}" and is created in "${this.createdIn}"`
//     },
// };
// console.log(factObj.text)
// console.log(factObj)


// //destructuring in objects 
// const{text, category, createdIn, isCorrect} = factObj;
// console.log(factObj);
// console.log(factObj.createSummary());