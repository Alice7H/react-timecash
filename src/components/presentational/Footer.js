import '../../styles/Footer.css';
import logo from '../../images/timecash_logo.svg';

export default function Footer() {

    return (
        <footer className="bg-light">
            <div className="d-flex justify-content-center mt-2">
                {/* <h3 className="text-center">TimeCash</h3> */}
                <img src={logo} alt="logo" width="250" height="50" />
            </div>
            <br />
            <div className="media-icons text-center">
                <a href='/'><i className="fa fa-facebook-square" /></a>
                <a href='/'><i className="fa fa-instagram" /></a>
                <a href='/'><i className="fa fa-twitter-square" /></a>
                <a href='/'><i className="fa fa-youtube-square" /></a>
            </div>
            <br />
            <p className="text-center">Developed by <a href="https://github.com/Alice7H" target="_blank" rel="noreferrer noopener"> Alice Hata</a></p>
            {/* <p className="pl-5 text-center">Photo by
                <a href="https://unsplash.com/@joannakosinska?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" target="_blank" rel="noreferrer noopener"> Joanna Kosinska </a> on <a href="https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" target="_blank" rel="noreferrer noopener"> Unsplash</a>
            </p> */}
            <p className="text-center">
                © 2020-2021 H&M -IT Company, Inc. ·
                <a href="/"> Privacy </a>  ·
                <a href="/"> Terms </a>
            </p>
        </footer>
    )
}
