import { Request, Response } from 'express';
import { Candidatura, CandidaturaI } from '../models/candidatura';

export class CandidaturaController {

    // Método para probar el controlador
    public async test(req: Request, res: Response) {
        try {
            res.send('Hola, método test para Candidaturas');
        } catch (error) {
            res.status(500).json({ message: 'Error en test de Candidaturas' });
        }
    }

    // Obtener todas las candidaturas
    public async getAllCandidatura(req: Request, res: Response) {
        try {
            const candidaturas: CandidaturaI[] = await Candidatura.findAll(); // select * from candidaturas
            res.status(200).json({ candidaturas });
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener candidaturas', error });
        }
    }

    // Obtener una candidatura por id
    public async getOneCandidatura(req: Request, res: Response): Promise<void> {
        const { id: idParam } = req.params;

        try {
            const candidatura: CandidaturaI | null = await Candidatura.findOne({ where: { id: idParam } });
            if (candidatura) {
                res.status(200).json(candidatura);
            } else {
                res.status(404).json({ msg: "La candidatura no existe" });
            }
        } catch (error) {
            res.status(500).json({ msg: "Error al obtener la candidatura" });
        }
    }

    // Crear una candidatura
    public async createCandidatura(req: Request, res: Response): Promise<void> {
        const { nombre_candidatura } = req.body;

        try {
            const newCandidatura: CandidaturaI = await Candidatura.create({ nombre_candidatura });
            res.status(201).json(newCandidatura);
        } catch (error) {
            res.status(500).json({ msg: 'Error al crear la candidatura' });
        }
    }

    // Actualizar una candidatura
    public async updateCandidatura(req: Request, res: Response): Promise<void> {
        const { id: pk } = req.params;
        const { nombre_candidatura } = req.body;

        try {
            const candidaturaExist: CandidaturaI | null = await Candidatura.findByPk(pk);
            if (!candidaturaExist) {
                res.status(404).json({ msg: "La candidatura no existe" });
            } else {
                await Candidatura.update({ nombre_candidatura }, { where: { id: pk } });

                const updatedCandidatura: CandidaturaI | null = await Candidatura.findByPk(pk);
                res.status(200).json(updatedCandidatura);
            }
        } catch (error) {
            res.status(500).json({ msg: 'Error al actualizar la candidatura' });
        }
    }

    // Eliminar una candidatura
    public async deleteCandidatura(req: Request, res: Response): Promise<void> {
        const { id: pk } = req.params;

        try {
            const candidaturaExist: CandidaturaI | null = await Candidatura.findByPk(pk);
            if (!candidaturaExist) {
                res.status(404).json({ msg: "La candidatura no existe" });
            } else {
                await Candidatura.destroy({ where: { id: pk } });
                res.status(200).json({ msg: "Candidatura eliminada" });
            }
        } catch (error) {
            res.status(500).json({ msg: 'Error al eliminar la candidatura' });
        }
    }
}
