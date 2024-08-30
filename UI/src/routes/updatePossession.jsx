import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function Update() {
    const { libelle } = useParams(); // Récupère le libelle depuis les paramètres de l'URL
    const [formData, setFormData] = useState({
        libelle: "",
        dateFin: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        // Récupère les données actuelles de la possession pour pré-remplir le formulaire
        fetch(`http://localhost:3000/possession/${libelle}`)
            .then(response => response.json())
            .then(data => {
                setFormData({
                    libelle: data.libelle,
                    dateFin: data.dateFin ? new Date(data.dateFin).toISOString().slice(0, 10) : "", // Format YYYY-MM-DD
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
                console.log('Données mises à jour avec succès :', data);
            })
            .catch(error => console.error('Erreur lors de la mise à jour :', error));
    };

    return (
        <>
            <h1>MODIFIER LA POSSESSION CHOISIE</h1>
            <br />
            <br />
            <form onSubmit={handleSubmit}>
                <label>Libelle :</label>
                <br />
                <input
                    type="text"
                    name="libelle"
                    value={formData.libelle}
                    onChange={handleChange}
                />
                <br />
                <br />
                <label>Date fin :</label>
                <br />
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

            <Link to={`/`}>
                <button className="btn btn-primary">Revenir à la page d'accueil</button>
            </Link>
        </>
    );
}
