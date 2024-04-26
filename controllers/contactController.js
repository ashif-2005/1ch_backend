const {contactModel} = require('../models/contactSchema')

const getContact = async (req,res)=>{
    try{
        const contact = await contactModel.find({})
        console.log(contact)
        res.status(200).json({error:false,message:{contact : contact}})
    }
    catch(error){
        console.log(error.message)
        res.status(400).json({error:true,message:error.message})
    }
}

const getContactsbyAgent = async (req,res)=>{
    try{
        const contact = await contactModel.find({agentName:req.user.username})
        if(!contact){
            return res.status(400).json({error:true,message:'unable to fetch contacts'})
        }
        res.status(200).json({error:false,message:{contacts : contact}});
       
    }catch(err){
        console.log(err.message); 
        return res.status(400).json({error:true,message:err.message})
    }
}

const createContact = async(req,res)=>{
    try{
      const newContact = await contactModel.create({
        contactName:req.body.contactName,
        contactMail:req.body.contactMail,
        contactPhone:req.body.contactPhone,
        topic:req.body.topic,
        agent_email:req.body.agent_email,
      })
      if(!newContact){
        return res.status(400).json({error:true,message:"failed to create contact"})
      }
    }catch(err){
       console.log(err.message);
       return res.status(400).json({error:true,message:err.message})
    }
  }

  const deleteContact = async(req,res)=>{
     try{
        const contact = await contactModel.findByIdAndDelete(req.params.id);
        if(!contact){
            return res.status(400).json({error:true,message:"deletion failed"})
        }
        return res.status(200).json({error:false,message:"contact deleted"})
     } catch(err){
        console.log(err.message);
        return res.status(400).json({error:true,message:err.message})
     }
  }

  const updateStatus = async (req, res) => {
    try {
        const user = await contactModel.findOne({ contactPhone: req.body.contactPhone });
        if (!user) {
            return res.status(400).json({ error: true, message: "contact not found" });
        }
        const contact = await contactModel.findOneAndUpdate(
            { contactPhone: req.body.contactPhone },
            { status: req.body.status }, 
            { new: true }
        );
        if (!contact) {
            return res.status(400).json({ error: true, message: "update failed" });
        }
        return res.status(200).json({ error: false, message: "contact updated", contact });
    } catch (err) {
        console.error(err.message);
        return res.status(400).json({ error: true, message: err.message });
    }
}



module.exports = {getContact,createContact,deleteContact,updateStatus,getContactsbyAgent};
// const updateStatus = async(req,res)=>{  
//    try{
//      const newStatus= req.body.status;
//      const updated = await contactModel.findByIdAndUpdate(req.params.id,{
//        leadStatus:newStatus
//      })
//      if(!updated){
//          return res.status(400).json({error:true,message:"update failed"})
//      }
//      return res.status(200).json({error:false,message:"lead status updated"})
//    }catch(err){
//       console.log(err.message)
//    }
// }

// const updateDate = async(req,res)=>{
//     try{
//         const newDate= req.body.dateAssigned;
//         const updated = await contactModel.findByIdAndUpdate(req.params.id,{
//             dateAssigned:newDate
//         })
//         if(!updated){
//             return res.status(400).json({error:true,message:"update failed"})
//         }
//         return res.status(200).json({error:false,message:"date assigned updated"})
//     }catch(err){
//         console.log(err.message)
//     }
// }

// const updatePriority = async(req,res)=>{
//     try{ 
//         const newPriority= req.body.priority;
//         const updated = await contactModel.findByIdAndUpdate(req.params.id,{
//             priority:newPriority
//         })
//         if(!updated){
//             return res.status(400).json({error:true,message:"update failed"})
//         }
//         return res.status(200).json({error:false,message:"priority updated"})
//     }catch(err){
//         console.log(err.message)
//     }
// }
