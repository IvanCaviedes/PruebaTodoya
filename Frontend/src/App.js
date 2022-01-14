import { Redirect, Route, Switch, BrowserRouter } from "react-router-dom";

import Login from './Pages/Login/Login'
import ListaCarpetas from './Pages/listCarpetas/ListaCarpetas'
import ListaArchivos from './Pages/listArchivos/ListaArchivos'
import RouteSegure from './utils/RouteSegure'

import './assets/css/index.css'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact  path="/login" component={Login} />
        <RouteSegure exact  path="/carpetas" component={ListaCarpetas} />
        <RouteSegure exact  path="/carpeta/:id" component={ListaArchivos} />
        <Redirect from="/" to="/login" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;