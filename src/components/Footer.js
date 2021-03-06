import '../styles/Footer.css';

export default function Footer() {

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
            <span className="pl-5">Developed by <a href="https://github.com/Alice7H"> Alice Hata</a></span>
            <br/>
            <span className="pl-5">Photo by 
                <a href="https://unsplash.com/@joannakosinska?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"> Joanna Kosinska </a> on <a href="https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"> Unsplash</a>
            </span>
            <br/>
            <p className="pl-5">
                © 2020-2021 H&M -IT Company, Inc. · 
                <a href="/"> Privacy </a>  · 
                <a href="/"> Terms </a>
            </p>
        </footer>
    )
}
