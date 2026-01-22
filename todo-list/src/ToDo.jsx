export default function ToDo({ id, header, text, note, delNote }) {
    return <li id={ id } className="list-el">
        <h3 className="el-header">{ header }</h3>
        <p className="el-text">{ text }</p>
        <div className="del" onClick={e => delNote([...note.filter(ob => ob.id !== Number(e.target.parentElement.id))])}></div>
    </li>
}