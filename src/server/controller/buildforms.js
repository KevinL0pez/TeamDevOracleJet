const service = require('../service/buildforms')
const messages = require("../constant/messages");
const express = require("express");
const app = express();

// Configuración de Express
app.use(cors());
app.use(express.json());

app.get("/paises", async (req, res) => {
    try {
      const resultadosFormateados = await service.getPaises();
      res.status(200).json({
        code: 0,
        data: resultadosFormateados,
        messages: [messages.SUCCES],
        success: true,
        status: 200
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        code: 1,
        data: {},
        messages: [messages.ERROR],
        success: false,
        status: 500
      });
    }
});