import prisma from "../config/db.js";

export const usuarioValidar = (schema) => (req, res, next) => {
  try {
    const body = req.body;
    schema.parse(body);
    next();
  } catch (error) {
    return res
      .status(400)
      .json({ message: error.errors.map((err) => err.message) });
  }
};

export const usuarioCorreoUnico = async (req, res, next) => {
  try {
    const { correo } = req.body;
    const usuarioCorreo = await prisma.usuarios.findFirst({
      where: { correo: correo },
    });

    if (usuarioCorreo) {
      return res
        .status(400)
        .json({ message: ["El correo ya esta registrado"] });
    }

    next();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: [error.message] });
  }
};


export const usuarioUserUnico = async (req, res, next) => {
  try {
    const { usuario } = req.body;

    const usuarioUser = await prisma.usuarios.findFirst({
      where: { usuario: usuario },
    });
    if (usuarioUser) {
      return res
        .status(400)
        .json({ message: ["El usuario ya esta registrado"] });
    }

    next();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: [error.message] });
  }
};
