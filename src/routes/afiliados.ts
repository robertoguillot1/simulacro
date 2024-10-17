import { Request, Response, Application, Router } from "express";

import { AfiliadosController } from "../controllers/afiliados.controllers";


export class AfiliadosRoutes {
    public afiliadosController: AfiliadosController =  new AfiliadosController();

    public routes(app: Application): void {
        app.route("/afiliados").get(this.afiliadosController.getAllAfiliados);
        app.route("/afiliados/:id").get(this.afiliadosController.getOneAfiliados);
        app.route("/afiliados").post(this.afiliadosController.createAfiliados);
        app.route("/afiliados/:id").put(this.afiliadosController.updateAfiliados);
        app.route("/afiliados/:id").delete(this.afiliadosController.deleteAfiliados);
    }
}
