import { NextApiHandler, NextApiRequest } from "next";
import formidable from "formidable";
import path from "path";
import fs from "fs/promises";
import prisma from "@lib/prisma";

export const config = {
  api: {
    bodyParser: false,
  },
};

const readFile = (
  req: NextApiRequest,
  saveLocally?: boolean
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const options: formidable.Options = {};

  if (saveLocally) {
    options.uploadDir = path.join(process.cwd(), "/public/images");
    options.filename = (name, ext, path, form) => {
      return Date.now().toString() + "_" + path.originalFilename;
    };
  }
  options.maxFileSize = 4000 * 1024 * 1024;
  const form = formidable(options);
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

const handler: NextApiHandler = async (req, res) => {
  try {
    await fs.readdir(path.join(process.cwd() + "/public", "/images"));
  } catch (error) {
    await fs.mkdir(path.join(process.cwd() + "/public", "/images"));
  }
  const data = await readFile(req, true);
  const idetificador = JSON.parse(JSON.stringify(data.fields.id));
  const nombrefile = JSON.parse(JSON.stringify(data.files.myImage.newFilename));
  console.log("Hey " + idetificador);
  console.log("Paso " + nombrefile);

  const old = await prisma.paciente.findUnique({
    where: { id: idetificador },
  });

  await prisma.paciente.update({
    where: { id: idetificador },
    data: {
      archivos: old?.archivos ? [...old.archivos, nombrefile] : [nombrefile],
    },
  });
  res.json({ done: "ok" });
};

export default handler;
