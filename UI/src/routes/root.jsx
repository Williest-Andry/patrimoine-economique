import { Link } from "react-router-dom";
import '../App.css'
export default function Root() {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary navPrincipal">
                <div className="container-fluid">
                    <a className="navbar-brand" >Gestion de patrimoine économique</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 menu">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to={'/possession'}>Menu Possession</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to={`/patrimoine`}>Menu Patrimoine</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}