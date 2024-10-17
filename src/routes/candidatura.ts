import { Request, Response, Application, Router } from "express";

import { CandidaturaController } from "../controllers/candidatura.controllers";

export class CandidaturaRoutes {
    public candidaturaController: CandidaturaController =  new CandidaturaController();

    public routes(app: Application): void {
        app.route("/candidatura").get(this.candidaturaController.getAllCandidatura);
        app.route("/candidatura/:id").get(this.candidaturaController.getOneCandidatura);
        app.route("/candidatura").post(this.candidaturaController.createCandidatura);
        app.route("/candidatura/:id").put(this.candidaturaController.updateCandidatura);
        app.route("/candidatura/:id").delete(this.candidaturaController.deleteCandidatura);
    }
}
