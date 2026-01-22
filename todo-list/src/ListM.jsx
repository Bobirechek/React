import ToDo from "./ToDo";
import TodoForm from "./TodoForm";

export default function List_M({ arr, setArr }) {
    return <div className="all-list">
        <div className="todo-list">
            <h2 className="list-header">list</h2>

            <ul className="list">
                { arr.map(obj => 
                    <ToDo key={ obj.id } id={ obj.id } header={obj.head} text={obj.body}  note={arr} delNote={setArr} />) 
                }
            </ul>
        </div>

        <TodoForm notes={ arr } addNote={ setArr }/>
        
    </div>
}