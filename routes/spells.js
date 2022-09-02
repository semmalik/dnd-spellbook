const express = require("express");
const router = express.Router();
const todosController = require("../controllers/spells);
const { ensureAuth } = require("../middleware/auth");

router.get("/", ensureAuth, spellListController.getSpell);

router.post("/createSpell", spellListController.createSpell);

router.put("/markComplete", spellListController.markComplete);

router.put("/markIncomplete", spellListController.markIncomplete);

router.delete("/deleteSpell", spellListController.deleteSpell);

module.exports = router;
