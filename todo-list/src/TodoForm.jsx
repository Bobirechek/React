export default function TodoForm({ notes, addNote }) {
    let inpHeader = "";
    let inpBody = "";

    return <form className="todo-form" onSubmit={(e) => {
        e.preventDefault();
        if (inpHeader && inpBody) {
            addNote([...notes, {id: notes.length ? notes[notes.length - 1].id + 1: 0, head: inpHeader, body: inpBody}]);
            e.target.reset();
        }
    }}>
        <h2 className="list-header">new note</h2>

        <input id="head" className="inp-head" placeholder="Header" onChange={e => inpHeader = e.target.value}/>

        <textarea id='body' className="inp-body" placeholder="Text" onChange={e => inpBody = e.target.value}></textarea>

        <button className="subBut" type="submit">submit</button>
    </form>
}