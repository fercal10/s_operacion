import prisma from "@lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const consulta = await prisma.consulta.findMany({
          include: { paciente: true, responsable: true },
        });

        res.status(200).json(consulta);
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: error });
      }
      break;
    case "POST":
      try {
        const {
          title,
          enfermedadAct,
          antecedente,
          examenfisico,
          diagnostico,
          fecha,
          medicamentoAd,
          tratamientoMand,
          comentarios,
          modalidad,
          cobro,
          pacienteId,
          responsableId,
        } = req.body;
        const consulta = await prisma.consulta.create({
          data: {
            title,
            enfermedadAct,
            antecedente,
            examenfisico,
            diagnostico,
            fecha,
            responsable: { connect: { id: responsableId } },
            medicamentoAd,
            tratamientoMand,
            comentarios,
            modalidad,
            cobro,
            paciente: { connect: { id: pacienteId } },
          },
        });

        console.log("Guardado ", consulta);

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
      try {
         const pacientes = await prisma.consulta.delete({
           where: { id: req.body.id },
         });
      } catch (error) {}

    default:
      res.status(400).json({ success: false });
      break;
  }
}
