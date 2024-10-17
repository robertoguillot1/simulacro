import { Request, Response } from 'express';
import { Afiliados, AfiliadosI } from '../models/afiliados';

export class AfiliadosController {

    // Método para probar el controlador
    public async test(req: Request, res: Response): Promise<void> {
        try {
            res.send('Hola, método test para Afiliados');
        } catch (error) {
            res.status(500).json({ message: 'Error en test de Afiliados' });
        }
    }

    // Obtener todos los afiliados activos
    public async getAllAfiliados(req: Request, res: Response) {
        try {
            const afiliados: AfiliadosI[] = await Afiliados.findAll();
            res.status(200).json({ afiliados });
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener afiliados', error });
        }
    }

    // Obtener un solo afiliado por ID
    public async getOneAfiliados(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const afiliado: AfiliadosI | null = await Afiliados.findOne({ 
                where: { id }
            });
            if (afiliado) {
                res.status(200).json(afiliado);
            } else {
                res.status(404).json({ message: "El Afiliado no existe" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error al obtener el Afiliado" });
        }
    }

    // Crear un afiliado
    public async createAfiliados(req: Request, res: Response): Promise<void> {
        const { nombre, programa, telefono, fecha_ingreso } = req.body;

        try {
            const newAfiliados: AfiliadosI = await Afiliados.create({ nombre, programa, telefono, fecha_ingreso });
            res.status(201).json(newAfiliados);
        } catch (error) {
            res.status(500).json({ message: 'Error al crear el Afiliado' });
        }
    }

    // Actualizar un afiliado por ID
    public async updateAfiliados(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { nombre, programa, telefono, fecha_ingreso } = req.body;

        try {
            const afiliadosExist: AfiliadosI | null = await Afiliados.findByPk(id);
            if (!afiliadosExist) {
                res.status(404).json({ message: "El Afiliado no existe" });
            } else {
                await Afiliados.update({ nombre, programa, telefono, fecha_ingreso }, { where: { id } });
                const updatedAfiliados: AfiliadosI | null = await Afiliados.findByPk(id);
                res.status(200).json(updatedAfiliados);
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el Afiliado' });
        }
    }

    // Eliminar un afiliado por ID
    public async deleteAfiliados(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const afiliadosExist: AfiliadosI | null = await Afiliados.findByPk(id);
            if (!afiliadosExist) {
                res.status(404).json({ message: "El Afiliado no existe" });
            } else {
                await Afiliados.destroy({ where: { id } });
                res.status(200).json({ message: "Afiliado eliminado" });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar el Afiliado' });
        }
    }
}
