const express = require("express");
const router = express.Router();

const {
  _registrarDatDif,
  _findByUsername,
  _findEstadoCivil
} = require("../controllers/personController");

router.post("/registroDif", async (req, res) => {
  try {
    const person = await _registrarDatDif(req.body);
    return res.status(201).json({
      status: "success",
      message: `El usuario ${person.nombre} fue registrado`,
    });
  } catch (e) {
    return res.status(500).json(e.message);
  }
});

router.get("/getUserByname", async (req, res) => {
  try {
    const user = await _findByUsername(req.query.nombre);
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

router.get("/getEstadoCivil", async (req, res) => {
  try {
    const data = await _findEstadoCivil();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

module.exports = router;
