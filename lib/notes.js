const mongoose=require('mongoose');
// const Notess=require('./models/notes-schema.js');
const Collection=require('./models/notes-collection');
const MONGOSE_URI='mongodb://localhost:27017/notes';
mongoose.connect(MONGOSE_URI,{useNewUrlParser:true,useUnifiedTopology:true});
const collection=new Collection();
class Notes 
{
  constructor()
  {
    this.id=Math.ceil(Math.random()*10);
  }

  execute(obj)
  {
    if(obj.get)
    {
      return this.get(obj);

    }
    else if(obj.create)
    {
      return this.create(obj);
    }
    else if(obj.delete)
    {
      return this.delete(obj);
    }
    
    else if(obj.update)
    {
      return this.update(obj);
    }
    else if(obj.list)
    {
      return this.list(obj);
    }
  }
  async get(note)
  {
    let id=note.get;
    console.log(note.get);
    let oneNode = await collection.get(id);
    console.log(`get Note ${oneNode}`);
  }
  async create(note)
  {
    let notedetail={
      text:`${note.create}`,
      catagory:`${note.catagory}`,
    };
    let newNode = await collection.create(notedetail);
  
    console.log('added',newNode.text);
  }
  async delete(note)
  {
    let id=note.delete;
    let DeleteNode = await collection.delete(id);
    console.log('deleted noded is',DeleteNode);
  }
  async update(note)
  {
    let notedetail={
      text:`${note.newtext}`,
      catagory:`${note.newcatagory}`,
    };
    let id=note.update;
    console.log(id);
    let UpdateNode = await collection.update(id,notedetail);
    console.log('updated node is',UpdateNode);
  }
  async list(note)
  {
    let list = await collection.list(note); // select foods with apple name
    console.log('all list',list);
  }
}
module.exports = Notes;
