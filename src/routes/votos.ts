import { Request, Response, Application, Router } from "express";

import { VotosController } from "../controllers/votos.controllers";

export class VotosRoutes {
    public votosController: VotosController =  new VotosController();

    public routes(app: Application): void {
        app.route("/votos").get(this.votosController.getAllVotos);
        app.route("/votos/:id").get(this.votosController.getOneVotos);
        app.route("/votos").post(this.votosController.createVotos);
        app.route("/votos/:id").put(this.votosController.updateVotos);
        app.route("/votos/:id").delete(this.votosController.deleteVotos);
    }
}
