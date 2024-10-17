import { Request, Response } from 'express';
import { Votos, VotosI } from '../models/votos';

export class VotosController {

    // Método para probar el controlador
    public async test(req: Request, res: Response) {
        try {
            res.send('Hola, método test para Votos');
        } catch (error) {
            res.status(500).json({ message: 'Error en test de Votos' });
        }
    }

    // Obtener todos los votos
    public async getAllVotos(req: Request, res: Response) {
        try {
            const votos: VotosI[] = await Votos.findAll(); 
            res.status(200).json({ votos });
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener Votos', error });
        }
    }

    // Obtener un voto por su ID
    public async getOneVotos(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const voto = await Votos.findOne({ where: { id } });
            if (voto) {
                res.status(200).json(voto);
            } else {
                res.status(404).json({ message: 'Voto no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el voto', error });
        }
    }

    // Crear un nuevo voto
    public async createVotos(req: Request, res: Response) {
        const { afiliado_id, candidatura_id } = req.body;

        try {
            const newVoto = await Votos.create({ afiliado_id, candidatura_id });
            res.status(201).json(newVoto);
        } catch (error) {
            res.status(500).json({ message: 'Error al crear el voto', error });
        }
    }

    // Actualizar un voto
    public async updateVotos(req: Request, res: Response) {
        const { id } = req.params;
        const { afiliado_id, candidatura_id } = req.body;

        try {
            const votoExistente = await Votos.findByPk(id);
            if (!votoExistente) {
                res.status(404).json({ message: 'Voto no encontrado' });
            } else {
                await Votos.update({ afiliado_id, candidatura_id }, { where: { id } });
                const votoActualizado = await Votos.findByPk(id);
                res.status(200).json(votoActualizado);
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el voto', error });
        }
    }

    // Eliminar un voto
    public async deleteVotos(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const votoExistente = await Votos.findByPk(id);
            if (!votoExistente) {
                res.status(404).json({ message: 'Voto no encontrado' });
            } else {
                await Votos.destroy({ where: { id } });
                res.status(200).json({ message: 'Voto eliminado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar el voto', error });
        }
    }
}
