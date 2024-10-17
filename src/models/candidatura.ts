import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";
import { Votos } from "./votos";


export class Candidatura extends Model {
  public nombre_candidatura!: string;}

export interface CandidaturaI {
   nombre_candidatura: string;
}

Candidatura.init(
  {
    nombre_candidatura: {
        type: DataTypes.STRING,
        allowNull: false
      },},
  {
    tableName: "candidatura",
    sequelize: database,
    timestamps: false
  }
);
