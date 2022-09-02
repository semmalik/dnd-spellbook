const Spell = require("../models/Spell");

module.exports = {
  getSpells: async (req, res) => {
    console.log(req.user);
    try {
      const spells = await Spell.find({ userId: req.user.id });
      res.render("spells.ejs", { spells: spells, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createSpell: async (req, res) => {
    try {
      //find the spell in the api
      const response = await fetch(`https://www.dnd5eapi.co/api/spells/${req.body.name}`);
      const spell = await response.json();
      
      //not found
      if(spell['error']) {
        console.log("Spell not found!");
        res.redirect("/spells");
      }
      
      await Spell.create({
        name: spell.name,
        description: spell.desc,
        level: spell.level,
        userId: req.user.id,
      });
      console.log("Spell has been added!");
      res.redirect("/spells");
    } catch (err) {
      console.log(err);
    }
  },

  // markComplete: async (req, res)=>{
  //     try{
  //         await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
  //             completed: true
  //         })
  //         console.log('Marked Complete')
  //         res.json('Marked Complete')
  //     }catch(err){
  //         console.log(err)
  //     }
  // },
  // markIncomplete: async (req, res)=>{
  //     try{
  //         await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
  //             completed: false
  //         })
  //         console.log('Marked Incomplete')
  //         res.json('Marked Incomplete')
  //     }catch(err){
  //         console.log(err)
  //     }
  // },
  // deleteTodo: async (req, res)=>{
  //     console.log(req.body.todoIdFromJSFile)
  //     try{
  //         await Todo.findOneAndDelete({_id:req.body.todoIdFromJSFile})
  //         console.log('Deleted Todo')
  //         res.json('Deleted It')
  //     }catch(err){
  //         console.log(err)
  //     }
  // }
};
