import { z } from "zod";

export const usuarioSchemaRegistrarZ = z.object({
  usuario: z
    .string({
      required_error: "Usuario requerido",
      invalid_type_error: "El usuario tiene que ser tipo caracter",
    })
    .refine((usuario) => usuario.length >= 1, {
      message: "El usuario no debe ser vacio",
    }),
  nombre: z
    .string({
      required_error: "nombre requerido",
      invalid_type_error: "el nombre tiene que ser caracteres",
    })
    .refine((nombre) => nombre.length >= 1, {
      message: "El nombre no debe ser vacio",
    }),
  apellido: z
    .string({
      required_error: "apellido requerido",
      invalid_type_error: "el apellido tiene que ser caracteres",
    })
    .refine((apellido) => apellido.length >= 1, {
      message: "El apellido no debe ser vacio",
    }),
  correo: z
    .string({ required_error: "email requerido" })
    .email({ message: "email invalido" })
    .refine((email) => email.length >= 1, {
      message: "El email no debe ser vacio",
    }),
  clave: z
    .string({ required_error: "clave requerido" })
    .min(6, { message: "clave minima de 6 caracteres" })
    .refine((clave) => clave.length >= 1, {
      message: "El clave no debe ser vacio",
    }),
});

export const usuarioLoginSchemaZ = z.object({
  correo: z
    .string({ required_error: "email requerido" })
    .email({ message: "email invalido" })
    .refine((email) => email.length >= 1, {
      message: "El email no debe ser vacio",
    }),
  clave: z
    .string({ required_error: "clave requerido" })
    .min(6, { message: "clave minima de 6 caracteres" })
    .refine((clave) => clave.length >= 1, {
      message: "El clave no debe ser vacio",
    }),
});
