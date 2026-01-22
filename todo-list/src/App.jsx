import style from "./style.css";
import ListM from "./ListM";
import { useState } from "react";

export default function App () {
    const [notes, setNotes] = useState([{id:0, head: "QQWE", body: "text"}, {id:1, head: "QWEQWE", body: "text"}]);

    return <div className="main" style={ style }>
        <h1 className="header">mashakakashkaitimatozhe</h1>
        <ListM arr={ notes } setArr={ setNotes } />
    </div>;
}