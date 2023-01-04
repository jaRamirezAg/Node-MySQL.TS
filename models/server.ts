import express from "express";
import userRoutes from "../routes/usuario";
import cors from "cors";
import db from "../database/connection";

class Server {
  private app: express.Application;
  private port: string;
  private apiPaths = {
    usuarios: "/api/usuarios",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8000";

    // conectar base de datos
    this.dbConnection();

    // Middlewares
    this.middlewares();

    // Definir rutas
    this.routes();
  }

  async dbConnection() {
    try {
      await db.authenticate();
      console.log("Base de datos conectada");
    } catch (error) {
      throw new Error("Error al conectar la base de datos");
    }
  }

  middlewares() {
    // cors
    this.app.use(cors());

    // lectura body
    this.app.use(express.json());

    // carpeta publica
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.apiPaths.usuarios, userRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en el puerto ", this.port);
    });
  }
}

export default Server;
