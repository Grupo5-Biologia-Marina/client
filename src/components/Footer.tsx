import { Link } from "react-router-dom";
import "../styles/footer.css";
import logo from '../assets/logo.png'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="logo">
               <img className="footer-logo" src={logo} alt="logo" /> 
            </div>
            <div className="text">
                <p>
                    © 2025 Proyecto colaborativo desarrollado por 5 coders del bootcamp FemCoders de  <a className="factoria-f5" href="https://factoriaf5.org" target="_blank" rel="noopener noreferrer">
                        {' '} Factoría F5. 
                    </a> Todos los derechos reservados.
                </p>
            </div>


        </footer>
    )
}