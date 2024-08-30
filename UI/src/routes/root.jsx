import { Link } from "react-router-dom";
export default function Root() {
    return (
        <>
            <header>
                <ul>
                    <li>
                        <Link to={`/patrimoine`}>Menu Patrimoine</Link>
                    </li>
                    <li>
                        <Link to={'/possession'}>Menu Possession</Link>
                    </li>
                </ul>
            </header>


        </>
    )
}