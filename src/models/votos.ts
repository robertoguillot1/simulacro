import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";
import { Afiliados } from "./afiliados";
import { Candidatura } from "./candidatura";

export class Votos extends Model {
  public afiliado_id!: number;
  public candidatura_id!:number;
}

export interface VotosI {
  afiliado_id: number;
  candidatura_id: number;
}

Votos.init(
  {
    afiliado_id: { 
    type: DataTypes.INTEGER,
      references: {
        model: 'afiliados', // Nombre de la tabla en la base de datos
        key: 'id'
      },
      allowNull: false},

    candidatura_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'candidatura', // Nombre de la tabla en la base de datos
        key: 'id'
      },
      allowNull: false
    }
  },
  {
    tableName: "votos",
    sequelize: database,
    timestamps: false
  }
);



Votos.belongsTo(Afiliados, {foreignKey: "afiliado_id"});
Afiliados.hasMany(Votos, {foreignKey: "afiliado_id"});

Votos.belongsTo(Candidatura, {foreignKey: "candidatura_id"});
Candidatura.hasMany(Votos, {foreignKey: "candidatura_id"});
