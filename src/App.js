import "./style.css";
import { useEffect, useState } from "react";
import supabase from "./supabase";

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

// function Counter (){
//   const [count,setCount] = useState(0);
//   return(
//       <div>
//           <span style={{fontSize:"40px"}}>{count}</span>
//           <button className="btn btn-large" onClick={() => setCount((c) => c+1) }>+1</button>
//       </div>
//   );
// }



function App() {
  // 1 define state variable 

  
 const [showForm, setShowForm] = useState(false);
 const [facts, setFacts] = useState([]);
 const [isLoading, setIsLoading] = useState(false);
 const [currentCategory, setCurrentCategory] = useState("all");

 useEffect(function() {
  async function getFacts() {
    setIsLoading(true);

    let query = supabase.from('facts').select('*');

    if(currentCategory !== "all")
      query = query.eq("category", currentCategory);

    const { data: facts, error } = await query
    .order("text", {ascending: true}).limit(1000);
console.log(currentCategory, );
   

      if(!error) setFacts(facts);
      else alert("there was a problem getting data")
    setIsLoading(false);
  }
  getFacts();

 }, [currentCategory])


  return (
    <>
      {/* Header */}
    <Header showForm ={showForm} setShowForm ={setShowForm} />

      {/* 2 use state variable */}
      {showForm ? <NewFactForm setFacts={setFacts} facts={facts} setShowForm={setShowForm}/> : null}
      {/* <NewFactForm /> */}
      {/* <Counter/> */}
     

      <main className="main">
      <CategoryFilters setCurrentCategory ={setCurrentCategory} />

        {isLoading ? <Loader/> :  <FactList facts = {facts} setFacts={setFacts} /> }

        {/* <CategoryFilters /> */}
        {/* <FactList facts = {facts} /> */}
      </main>
    </>
  );
}


function Loader(){
  return <p className="message">Loading....</p>
}

function Header ({showForm, setShowForm}){
  const appTitle = "Fact Flow";

  return(
    <header className="header">
    <div className="logo">
      <img
        src="logo.png"
        height="68px"
        width="68px"
        alt="Today I Learned Logo"
      />
    
      <h1>{appTitle}</h1>
    </div>
    {/* 3 update state variable */}
    <button className="btn btn-large btn-open" onClick={()=>setShowForm((show) => !show)}>{showForm ? "Close" : "Share a fact"}</button>
  </header>

  );
}



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

function isValidHttpUrl(String){
  let url;
  try{
    url = new URL(String);
    } catch(_){
      return false;
    }
    return url.protocol === "https:" || url.protocol === "https:";
}

function NewFactForm({setFacts,facts,setShowForm}) {
  const [text,setText] = useState("");
  const [source,setSource] = useState("http://example.com");
  const [category,setCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const textLength = text.length;


 async function handleSubmit (e){
    //1. Prevent the browser reload
    e.preventDefault();
   console.log(facts);

    //2. Check if data is vaild .if so create a new fact
       if (text && source && category && textLength <= 100) {
        console.log(text,source,category);
   //3. Create a new fact object
  //  const newFact = {
  //   id: Math.round(Math.random() * 1000000000),
  //   text,
  //   source,
  //   category,
  //   votesInteresting: 0,
  //   votesMindblowing: 0,
  //   votesFalse: 0,
  //   createdIn: new Date().getFullYear(),
  //  };

  //3.upload fact to Supabase and recieve the new fact object
      setIsUploading(true);
     const{ data: newFact , error} = await supabase.from("facts").insert([{text,source,category}]).select();
     setIsUploading(false);

     console.log(newFact);
//4. Add the new fact to the UI : add the fact to state
    // setFacts(newFact);
    // console.log(newFact, facts);

    if(!error) setFacts([newFact[0],...facts]);

    //5. Reset the input fields
    
      setText("");
      setCategory("");
      setSource("");
    //6.Close the form

     setShowForm(false);
  }
}

  return <form className="fact-form" onSubmit={handleSubmit}> 
   <input type="text" placeholder="Share a fact with the world..." 
   value={text}
   onChange={(e) => setText(e.target.value)}
   disabled={isUploading}
   />
  <span>{Math.abs(textLength - 100)}</span>
  <input value={source} 
        type="text" 
        placeholder="Trust Worthy Source"
        onChange={(e) => setSource(e.target.value)}
        disabled={isUploading}
  />
  <select value={category}  onChange={(e) => setCategory(e.target.value)} disabled={isUploading}>
      <option value="">Choose Category:</option>
      {CATEGORIES.map((cat) => <option key={cat.name} value={cat.name}>{cat.name.toUpperCase()}</option>)}
  </select>
  <button className="btn btn-large" disabled={isUploading}>Post</button></form>;
}




function CategoryFilters({setCurrentCategory}) {
  
  return <aside>
            <ul>
            <li className="Category"><button className="btn btn-all-categories" onClick={() => setCurrentCategory("all")}>All</button></li>
              {CATEGORIES.map((cat) =>  <li key={cat.name} className="Category"><button className="btn btn-category" style={{backgroundColor: cat.color}}  onClick={() => setCurrentCategory(cat.name)} >{cat.name}</button></li> )}

            </ul>
          </aside>;
}

function FactList({facts, setFacts}) {
  //TEMPORARY

  if(facts.length === 0){
    return (
    <p className="message">No facts for this category yet! Create the first one ✌️</p>

    );
  }

  return (
  <section><ul className="facts-list"> {
    facts.map((fact) => (
    <Fact key= {fact.id} fact = {fact} setFacts = {setFacts}/>
    
  ))} 
   </ul>
   
   </section>
  
);
}

function Fact ({fact, setFacts}){
  const[isUpdating, setIsUpdating] = useState(false);

  async function handleVote(columnName) {
    setIsUpdating(true);
  const{ data: updatedFact , error} = await supabase.from("facts").update({[columnName]: fact[columnName] + 1}).eq("id", fact.id).select();
  setIsUpdating(false);

  console.log(updatedFact);
  if(!error) setFacts((facts)=>facts.map((f) => f.id === fact.id ? updatedFact[0] : f))
  }

 console.log(fact);
  return (
    <li  className="fact">
        {fact.text}
      <p>
          <a  className="Source"  href={fact.source}
          target="_blank">(Source)</a> 
          <span className="tag" style={{backgroundcolor: CATEGORIES.find((cat) =>  cat.name ===  fact.category )}}>{fact.category}</span>
         
      </p>
       <div className="vote-buttons">
          <button onClick={() => handleVote("voteInteresting")} disabled= {isUpdating}>👍{fact.voteInteresting}</button>
          <button onClick={() => handleVote("votesMindBlowing")} disabled= {isUpdating}>🤯{fact.votesMindBlowing} </button>
          <button onClick={() => handleVote("votesFalse")} disabled= {isUpdating}>⛔️{fact.votesFalse}</button>
      </div>
  </li>
  );
  
}
export default App;
