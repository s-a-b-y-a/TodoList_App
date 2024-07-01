import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showfinished, setShowfinished] = useState(true);

  useEffect(() => {
    let todostring = localStorage.getItem("todos");
    if (todostring) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const togglefinished = (params) => {
    setShowfinished(!showfinished);
  };

  const savetoLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleadd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    savetoLS();
  };

  const handleedit = (e, id) => {
    let t = todos.filter((item) => {
      return item.id === id;
    });
    setTodo(t[0].todo);
    let newtodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newtodos);
    savetoLS();
  };

  const handledelete = (e, id) => {
    let newtodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newtodos);
    savetoLS();
  };

  const handlechange = (e) => {
    setTodo(e.target.value);
  };

  const handlecheckbox = (e) => {
    let id = e.target.name;
    console.log(`the id is ${id}`);
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    setTodos(newtodos);
    savetoLS();
  };

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto rounded-xl bg-gray-300 my-5 p-5 min-h-[80vh] md:w-[35%]">
        <h1 className="font-bold text-center text-3xl">
          iTask - manage your Todos at one place
        </h1>
        <div className="addtodos flex flex-col gap-2">
          <h2 className="text-2xl font-bold py-4">Add a Todo</h2>
          <div className="flex">
            <input
              onChange={handlechange}
              value={todo}
              className="w-full rounded-full px-5 py-1"
              type="text"
            />
            <button
              onClick={handleadd}
              disabled={todo.length <= 3}
              className="bg-violet-700 hover:bg-violet-950 text-sm text-white py-2 p-4 mx-2 font-bold
            rounded-md"
            >
              Save
            </button>
          </div>
        </div>
        <input
          className="my-4"
          id="show"
          onChange={togglefinished}
          type="checkbox"
          checked={showfinished}
        />
        <label className='mx-2' htmlFor="show">Show Finished</label> 
        <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
        <h2 className="text-2xl font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-3">No Todos to display</div>}
          {todos.map((item) => {
            return (
              (showfinished || !item.isCompleted) && (
                <div key={item.id} className="todo flex justify-between my-3">
                  <div className="flex gap-5">
                    <input
                      onChange={handlecheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                      name={item.id}
                      id=""
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>
                  <div className="button flex h-full">
                    <button
                      onClick={(e) => {
                        handleedit(e, item.id);
                      }}
                      className="bg-violet-700 hover:bg-violet-950 text-sm text-white py-1 p-2 font-bold
          rounded-md mx-1"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        handledelete(e, item.id);
                      }}
                      className="bg-violet-700 hover:bg-violet-950 text-sm text-white py-1 p-2 font-bold
          rounded-md mx-1"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
