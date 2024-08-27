export default function Create() {
    return (
        <>
            <h1>AJOUTER UNE POSSESSION</h1>
            <br></br>
            <br></br>
            <form>
                <label>Libelle :</label>
                <br></br>
                <input type="text"></input>
                <br></br>
                <br></br>
                <label>Valeur :</label>
                <br></br>
                <input type="text"></input>
                <br></br>
                <br></br>
                <label>Date début :</label>
                <br></br>
                <input type="text"></input>
                <br></br>
                <br></br>
                <label>Taux d'amortissement :</label>
                <br></br>
                <input type="text"></input>
                <br></br>
                <br></br>
                <button className="btn btn-primary" >Ajouter</button>
            </form>
        </>
    )
}