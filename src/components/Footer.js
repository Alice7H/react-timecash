import { useLocation } from 'react-router-dom';
import '../styles/Footer.css';

export default function Footer() {

    const location = useLocation();

    return (
        <footer className="bg-dark">
            <h3 className="text-center">TimeCash</h3>
            <br/>
            <div className="media-icons text-center">
            <a href='/'><i className="fa fa-facebook-square"/></a>
            <a href='/'><i className="fa fa-instagram"/></a>
            <a href='/'><i className="fa fa-twitter-square"/></a>
            <a href='/'><i className="fa fa-youtube-square"/></a>
            </div>
            <br/>
            {  location.pathname === '/' ? (<p className="float-right pr-5">
                <a href="/">Back to top</a>
            </p>) : null }
            <p className="pl-5">
                © 2020-2021 H&M -IT Company, Inc. · 
                <a href="/"> Privacy </a>  · 
                <a href="/"> Terms </a>
            </p>
        </footer>
    )
}
