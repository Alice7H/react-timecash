import CardBox from './CardBox';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import '../../styles/NotFoundPage.css';

export default function NotFoundPage() {
    return (
        <div className="background">
            <CardBox minHeight="65vh" maxWidth="900px">
                <div className="text-right">
                    <h1 className="text-uppercase">ERROR 404</h1>
                    <h3 className="text-uppercase"> Page not found</h3>
                </div>
                <div id="align-button">
                    <Link to="/">
                        <Button variant="outline-primary">Home</Button>
                    </Link>
                </div >
            </CardBox>
        </div>
    )
}
