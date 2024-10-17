import { AfiliadosRoutes } from "./afiliados";
import { VotosRoutes } from "./votos";
import { CandidaturaRoutes } from "./candidatura";

export class Routes {
    public afiliadosRoutes: AfiliadosRoutes = new AfiliadosRoutes();
    public votosRoutes: VotosRoutes = new VotosRoutes();
    public candidaturaRoutes: CandidaturaRoutes = new CandidaturaRoutes();
}
