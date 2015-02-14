ownsDocument = function(userId, doc){
  return doc && doc.userId === userId;
};

//for blurb and image to allow narration
isInvitee = function(userId, doc){
  var uname = Meteor.users.findOne({_id: userId}).username;
  var event = Events.findOne({_id: doc.eventId});
  return _.contains(event.invitees, uname)
}
