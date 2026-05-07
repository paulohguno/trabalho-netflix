import dadosUsuariosRoutes from "./routesUsuarios.js";
import autenticRoutes from "./routesAutentic.js";
import perfisUsuariosRoutes from "./routesPerfisUsuarios.js";
import historicoRoutes from "./routesHistoricos.js";
import planosRoutes from "./routesPlanos.js";
import sinopseRoutes from "./routesSinpse.js";
import episodiosRoutes from "./routesEpisodios.js";
import temporadaRoutes from "./routesTemporada.js";
import autoresRoutes from "./routesAutores.js";
import sinTemporadaRoutes from "./routesSinTemporada.js";


function Routes(app) {
    autenticRoutes(app);
    dadosUsuariosRoutes(app);
    perfisUsuariosRoutes(app);
    historicoRoutes(app);
    planosRoutes(app);
    sinopseRoutes(app);
    episodiosRoutes(app);
    temporadaRoutes(app);
    autoresRoutes(app);
    sinTemporadaRoutes(app);
}

export default Routes;
