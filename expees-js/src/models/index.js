



import Autentic from "./modelsAutentic.js";
import DadosUsuarios from "./modelsUsuarios.js";
import Planos from "./modelsPlanos.js";
import PerfisUsuarios from "./modelsPerfisUsuarios.js";
import Historico from "./modelsHistorico.js";
import Genero from "./modelsGenero.js";
import Temporada from "./modelsTemporada.js";
import Sinopse from "./modelsSinpse.js";
import Autores from "./modelsAutores.js";
import Episodios from "./modelsEpisodios.js";
import SinopseAutores from "./modelsSinAutores.js";
import SinopseGenero from "./modelsSinGenero.js";
import SinopseTemporada from "./modelsSinTemporada.js";
import Movie from "./moviemodels.js";







(async () => {
    await Planos.sync({ force: true });
    await Autentic.sync({ force: true });
    await DadosUsuarios.sync({ force: true });
    await PerfisUsuarios.sync({ force: true });
    await Genero.sync({ force: true });
    await Temporada.sync({ force: true });
    await Episodios.sync({ force: true });
    await Autores.sync({ force: true });
    await Sinopse.sync({ force: true });
    await SinopseAutores.sync({ force: true });
    await SinopseGenero.sync({ force: true });
    await SinopseTemporada.sync({ force: true });
    await Historico.sync({ force: true });
    await Movie.sync({ force: true });
    
})();