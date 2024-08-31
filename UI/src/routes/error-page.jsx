import { useRouteError } from "react-router-dom"
import '../App.css';

export default function ErrorPage() {
    const error = useRouteError();

    return (
        <>
            <h1>Oops !</h1>
            <p>Une erreur c'est produite :</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </>
    )
}