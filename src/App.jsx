import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";

function App() {

  // hii
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showfinished, setshowfinished] = useState(true)
  const saveToLs = () => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }
  
  const handelEdit = (e,id)=>{
    let t = todos.filter(item=>{ return item.id === id})
    settodo(t[0].todo)
    let newtodos = todos.filter(item=>{
      return item.id !=id;
    })
    settodos(newtodos)
    saveToLs()
  }

  useEffect(() => {
    let todostring  = localStorage.getItem("todos")
    if(todostring != null){
      let data = JSON.parse(localStorage.getItem("todos"))
      settodos(data)
    }
  }, [])
  
  

  const handelDelete = (e,id)=>{
    const isConfirmed = window.confirm("Are you sure you want to delete this item?");
    if (isConfirmed) {
      let newtodos = todos.filter(item=>{
        return item.id !=id;
      })
      settodos(newtodos)
      saveToLs()
    }}
  const handelAdd = ()=>{
    settodos([...todos,{ id:uuidv4(), todo,isComplete:false}])
    settodo("")
    saveToLs()
  }
  const handelChange = (e)=>{
    settodo(e.target.value)
  }
  const handelCheck =(e)=>{
    let id = e.target.name;
    let index = todos.findIndex(item =>{
      return item.id === id;
    })
        let newtodos = [...todos];
    newtodos[index].isComplete = !newtodos[index].isComplete;
    settodos(newtodos)
    saveToLs()

  }
  const togglefinish =(e) => {
     setshowfinished(!showfinished)
  }
  
  return (
    <>
      <Navbar/>
      <div className="conatainer border-2 border-black   w-[90%]  overflow-hidden md:w-2/3 mx-auto my-8 p-5 rounded-xl bg-violet-200 h-[75vh]">
        <div className="addtodo">
        <h2 className='text-ld font-bold text-2xl m-2 '>Add Todo</h2>
        <input onChange={handelChange} value={todo} className=' w-[65%] md:w-[50%]' type="text" />
        <button onClick={handelAdd} disabled={todo.length<1 } className='bg-violet-800 text-sm font-bold p-3 py-0.5 text-white rounded-md mx-6 px-5 disabled:bg-violet-950  hover:bg-violet-950'>Add</button>
        </div>
        <input onChange={togglefinish} type="checkbox" checked={showfinished} /> Show Finished
        <h2 className='text-ld font-bold'>Your Todos</h2>
        <div className="todos ">
          {todos.length === 0 && <div className='m-3'>Add your task here</div>}
          {todos.map(item=>{ 
          return (showfinished || !item.isComplete)&&<div key={item.id} className="todo flex justify-between w-[80%]  m-3">
            
            <div className={item.isComplete?"line-through":""}><input  name ={item.id} onChange={handelCheck} type="checkbox" checked={item.isComplete} />{item.todo}</div>
            <div className="button flex h-full">
              <button onClick={(e)=>{handelEdit(e,item.id)}} className='bg-violet-800 px-4 text-sm font-bold p-3 py-0.5 text-white rounded-md mx-1 hover:bg-violet-950'><FaEdit />
              </button>
              <button onClick={(e)=>{handelDelete(e,item.id)}} className='bg-violet-800 px-4 text-sm font-bold p-3 py-0.5 text-white rounded-md mx-1 hover:bg-violet-950' ><RiDeleteBin5Fill /></button>
            </div>
          </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
