import { Router } from "express";
import prisma from "../config/db.js";
import { v4 as uuid } from "uuid";
import bcrypt from "bcryptjs";
import {
  usuarioCorreoUnico,
  usuarioUserUnico,
  usuarioValidar,
} from "../middlewares/usuarioValidar.js";
import { usuarioSchemaRegistrarZ } from "../schemas/usuario.schema.js";

const router = Router();

router.post(
  "/usuario",
  usuarioValidar(usuarioSchemaRegistrarZ),
  usuarioCorreoUnico,
  usuarioUserUnico,
  async (req, res) => {
    try {
      const { usuario, nombre, apellido, correo, clave } = req.body;

      const contraHash = await bcrypt.hash(clave, 10);

      const nuevoUsuario = await prisma.usuarios.create({
        data: {
          id: uuid(),
          usuario,
          nombre,
          apellido,
          correo,
          clave: contraHash,
          foto: "/uploads/fotoFija.jpg",
        },
      });

      res.status(201).json(nuevoUsuario);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: [error.message] });
    }
  }
);

export default router;
