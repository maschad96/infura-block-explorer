import { hot } from 'react-hot-loader/root';
import Homepage from './layouts/Homepage';
import Sidebar from './components/Sidebar';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function App() {
    return (
        <div className="App">
            <Helmet>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Helmet>
            <Sidebar />
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Homepage} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default hot(App);
