import { Link } from "react-router-dom";
export default function Update() {
    return (
        <>
            <h1>MODIFIER LA POSSESSION CHOISIE</h1>
            <br></br>
            <br></br>
            <form>
                <label>Libelle :</label>
                <br></br>
                <input type="text"></input>
                <br></br>
                <br></br>
                <label>Date fin :</label>
                <br></br>
                <input type="text"></input>
                <br></br>
                <br></br>
                <button className="btn btn-primary">Modifier</button>
            </form>

            <Link to={`/`}>
                <button className="btn btn-primary">Revenir à la page d'acceuil</button>
            </Link>
        </>
    )
}