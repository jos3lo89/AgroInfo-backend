import { Router } from "express";
import prisma from "../config/db.js";
import { v4 as uuid } from "uuid";
import bcrypt from "bcryptjs";
import * as fs from "node:fs/promises";
import {
  usuarioCorreoUnico,
  usuarioUserUnico,
  usuarioValidar,
} from "../middlewares/usuarioValidar.js";
import {
  usuarioLoginSchemaZ,
  usuarioSchemaRegistrarZ,
} from "../schemas/usuario.schema.js";
import { subirFoto } from "../middlewares/multer.js";
import { crearToken } from "../libs/jwt.js";
import { URL_SERVER } from "../config/config.js";
import { authValidar } from "../middlewares/authValidar.js";

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

router.post(
  "/usuario/login",
  usuarioValidar(usuarioLoginSchemaZ),
  async (req, res) => {
    try {
      const { correo, clave } = req.body;

      const usuarioEncontrado = await prisma.usuarios.findFirst({
        where: { correo },
      });

      if (!usuarioEncontrado)
        return res.status(400).json({ message: ["usuario no existe"] });

      const contraComparar = await bcrypt.compare(
        clave,
        usuarioEncontrado.clave
      );

      if (!contraComparar)
        return res.status(401).json({ message: ["La contraseña no coincide"] });

      const token = await crearToken({ id: usuarioEncontrado.id });

      res.cookie("token", token, {
        httpOnly: false,
        secure: true,
        sameSite: "none",
      });

      res.status(200).json({
        id: usuarioEncontrado.id,
        usuario: usuarioEncontrado.usuario,
        nombre: usuarioEncontrado.nombre,
        apellido: usuarioEncontrado.apellido,
        correo: usuarioEncontrado.correo,
        foto: `${URL_SERVER}${usuarioEncontrado.foto}`,
        rol: usuarioEncontrado.rol,
        fechaCreacion: usuarioEncontrado.createdAt,
        fechaActualizado: usuarioEncontrado.updatedAt,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message33: [error.message] });
    }
  }
);

router.post("/usuario/logout", authValidar, (_req, res) => {
  try {
    res.clearCookie("token");
    res.sendStatus(204);
  } catch (error) {
    console.log(error.message);

    return res.status(500).json({ message: [error.message] });
  }
});

router.post("/usuario/foto", authValidar, subirFoto, async (req, res) => {
  try {
    const { id } = req.user;

    const userFound = await prisma.usuarios.findFirst({ where: { id } });

    if (userFound.foto !== "/uploads/fotoFija.jpg") {
      await fs.unlink(`./public${userFound.foto}`);
    }

    await prisma.usuarios.update({
      where: { id },
      data: { foto: `/uploads/${req.file.filename}` },
    });

    res.json({
      message: ["foto registrada"],
      foto: `/uploads/${req.file.filename}`,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: [error.message] });
  }
});

export default router;
