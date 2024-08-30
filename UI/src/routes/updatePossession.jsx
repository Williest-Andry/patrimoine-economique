import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Root from "./root";

export default function Update() {
    const { libelle } = useParams(); 
    const [formData, setFormData] = useState({
        libelle: "",
        dateFin: "",
    });
    const [isUpdate, setIsUpdate] = useState(false);
    const [isNotUpdate, setIsNotUpdate] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:3000/possession/${libelle}`)
            .then(response => response.json())
            .then(data => {
                setFormData({
                    libelle: data.libelle,
                    dateFin: data.dateFin ? new Date(data.dateFin).toISOString().slice(0, 10) : "", 
                });
            })
            .catch(error => console.error('Erreur lors du fetch :', error));
    }, [libelle]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3000/possession/${libelle}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                libelle: formData.libelle,
                dateFin: formData.dateFin || null,
            }),
        })
            .then(response => response.json())
            .then(data => {
                setIsUpdate(true);
                setFormData({libelle: "", dateFin: ""})
            })
            .catch(error => setIsNotUpdate(false));
    };

    setTimeout(() => {
        setIsUpdate(false);
        setIsNotUpdate(false);
    }, 1500);

    return (
        <>
            <Root/>
        
            <section className="possessions">

            <h1>MODIFIER LA POSSESSION CHOISIE</h1>
            <br />
            <br />
            <form onSubmit={handleSubmit}>
                <label>Libelle :</label>
              
                <input
                    type="text"
                    name="libelle"
                    value={formData.libelle}
                    onChange={handleChange}
                />
                
               
                <label>Date fin :</label>
              
                <input
                    type="date"
                    name="dateFin"
                    value={formData.dateFin}
                    onChange={handleChange}
                />
                <br />
                <br />
                <button type="submit" className="btn btn-primary">Modifier</button>
            </form>

            {
                isUpdate && 
                <h1>Succès, la possession a été mise à jour</h1>
            }

            {
                isNotUpdate && 
                <h1>Erreur, la possession n'a pas été mise à jour</h1>
            }
            </section>
        </>
    );
}
