import prisma from "@lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const { name, cedula, genero, fechaN, telefono, dirrecion, familiar } =
    req.body;

  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const pacientes = await prisma.paciente.findMany({
          include: { consultas: true },
        });

        res.status(200).json(pacientes);
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: error });
      }
      break;
    case "POST":
      console.log(req.body);
      try {
        const paciente = await prisma.paciente.create({
          data: {
            name: name,
            genero: genero,
            cedula: cedula,
            fechaN: fechaN,
            telefono: telefono,
            dirrecion: dirrecion,
            familiar: familiar,
          },
        });
        res.status(200).json({ success: true });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: error });
      }
      break;

    case "PUT":
      try {
        // // const enpleado =
        // // Object.assign(enpleado, req.body);
        //   res.status(200).json({ success: true });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: error });
      }
      break;
    case "DELETE":
      console.log(req.body);
      try {
        const pacientes = await prisma.paciente.delete({
          where: { id: req.body.id },
        });

        res.status(200).json({ success: true });
      } catch (error) {}

    default:
      res.status(400).json({ success: false });
      break;
  }
}
