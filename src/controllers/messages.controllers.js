const { Messages, Participants, Conversations } = require("../models")

const createMessage = async (req, res, next) =>{
    try {
        const {conversationId, content, senderId } = req.body;
        await Messages.create({
            conversationId,
            content,
            senderId
        });
        res.status(201).end();        
    } catch (error) {
        next(error);
    }
}
const getMessagesUser = async (req, res, next)=> {
    try {
        const {id} = req.params;
        const data = await Conversations.findAll({
        //   where : {senderId:id},
            include:[{
                model: Participants
            },{
                model: Messages,
                where: {senderId: id}
            }
        ]
        })
        res.json(data)
    } catch (error) {
        next(error)
    }
}

const deleteMessage = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      await Messages.destroy({  where: {  id } })
      // antes de eliminar la conversacion 3
      // elimino todos los registros en participantes que usen ese id
      res.status(200).json({message: "Eliminado "});
    } catch (error) {
      next(error);
    }
  };




module.exports = {
    createMessage,
    getMessagesUser,
    deleteMessage
}