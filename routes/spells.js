const express = require("express");
const router = express.Router();
const spellsController = require("../controllers/spells");
const { ensureAuth } = require("../middleware/auth");

router.get("/", ensureAuth, spellsController.getSpell);

router.post("/createSpell", spellsController.createSpell);

router.put("/markComplete", spellsController.markComplete);

router.put("/markIncomplete", spellsController.markIncomplete);

router.delete("/deleteSpell", spellsController.deleteSpell);

module.exports = router;
