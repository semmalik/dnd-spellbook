const express = require("express");
const router = express.Router();
const spellsController = require("../controllers/spells");
const { ensureAuth } = require("../middleware/auth");

router.get("/", ensureAuth, spellsController.getSpells);

router.post("/createSpell", spellsController.createSpell);

router.post("/createCustomSpell", spellsController.createCustomSpell);

router.delete("/deleteSpell", spellsController.deleteSpell);

// changed from router.update to router.put
// router.put("/editSpell", spellsController.editSpell);

//getting spell to send to modal for editing
router.get("/getSpell/:_id", spellsController.getSpell);

router.put("/saveSpell/:_id", spellsController.saveSpell);

module.exports = router;
