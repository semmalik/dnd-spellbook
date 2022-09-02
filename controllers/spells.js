const fetch = require("node-fetch");
const Spell = require("../models/Spell");

module.exports = {
  getSpells: async (req, res) => {
    console.log(req.user);
    try {
      let spells = await Spell.find({ userId: req.user.id });
      spells = spells.map((spell) => {
        //convert level to correct string
        const levels = ['cantrip', '1st', '2nd', '3rd'];
        const level = spell.level < 4 ? levels[spell.level] : `${spell.level}th`;
        //Mongoose gives a mongoose object which when spread reveals all those hidden properties
        //Using spread might cause type problems on the id in the future
        //Given that this object is just being used to display data in a view it should be fine
        return {...spell.toObject(), level};
      })
      res.render("spells.ejs", { spells: spells, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createSpell: async (req, res) => {
    try {
      const spellName = req.body.name.replace(' ','-');
      //find the spell in the api
      const response = await fetch(
        `https://www.dnd5eapi.co/api/spells/${spellName}`
      );
      const spell = await response.json();

      //not found
      if (spell["error"]) {
        console.log("Spell not found!");
        console.log(spell);
      } else {
        await Spell.create({
          name: spell.name,
          description: spell.desc.join(" "),
          level: spell.level,
          userId: req.user.id,
        });
        console.log("Spell has been added!");
      }

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
