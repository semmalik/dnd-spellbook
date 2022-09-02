const express = require("express");
const router = express.Router();
const spellsController = require("../controllers/spells");
const { ensureAuth } = require("../middleware/auth");

router.get("/", ensureAuth, spellsController.getSpells);

router.post("/createSpell", spellsController.createSpell);

router.delete("/deleteSpell", spellsController.deleteSpell);

router.update("/editSpell", spellsController.editSpell);

module.exports = router;
