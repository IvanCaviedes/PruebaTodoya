import { Redirect, Route, Switch, BrowserRouter } from "react-router-dom";

import Login from './Pages/Login/Login'
import ListaCarpetas from './Pages/listCarpetas/ListaCarpetas'
import ListaArchivos from './Pages/listArchivos/ListaArchivos'
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/carpetas" component={ListaCarpetas} />
        <Route path="/carpeta/:id" component={ListaArchivos} />
        <Redirect from="/" to="/login" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;