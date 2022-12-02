// print all messages
const getTexts = (req, res, next) => {
    res.json({message: req.params.chat_id + " GET messages"});
  };
  
  // add message
  const newText = (req, res, next) => {
    res.json({message: "POST new message"});
  };
  
  // delete one message
  const deleteText = (req, res, next) => {
    res.json({message: "DELETE message " });
  };
  
  module.exports = {
    getTexts,
    newText,
    deleteText
  };