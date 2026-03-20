import style from "./style.css";
import ListM from "./ListM";
import { useState } from "react";

export default function App () {
    const [notes, setNotes] = useState([{id:0, head: "Header", body: "text"}]);

    return <div className="main" style={ style }>
        <h1 className="header">ToDo list</h1>
        <ListM arr={ notes } setArr={ setNotes } />
    </div>;
}