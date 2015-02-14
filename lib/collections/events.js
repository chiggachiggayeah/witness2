Events = new Mongo.Collection('events');

// Events.allow({
//   insert: function(userId, doc){
//     return !! userId;
//   }
// })

//allow edit and delete
//should be different
//need ownsOrInvited & owns
Events.allow({
  update: function(userId, event){return ownsDocument(userId, event);},
  remove: function(userId, event){return ownsDocument(userId, event);}
});

//should put in deny statements to make sure that only certain features can be updated


//might run into an issue with the invitees array check
Meteor.methods({
  eventInsert: function(eventAttrs){
    check(Meteor.userId(), String);
    check(eventAttrs, {
      title: String,
      description: String,
      invitees: Array
    });

    //check for duplicate event names
    var duplicateEvent = Events.findOne({title: eventAttrs.title});
    if(duplicateEvent){
      return {
        eventExists: true,
        _id: duplicateEvent._id
      }
    };

    var user = Meteor.user();
    var event = _.extend(eventAttrs, {
      userId: user._id,
      author: user.username,
      blurbs: [],
      images: [],
      key_moments: [],
      submitted: new Date()
    });
    var eventId = Events.insert(event);
    return {_id: eventId}; //return id to client
  },

  //don't think that this'll scale particularly well
  //both might need their own models
  //Might be good to think about using schemas directly


  //don't actually think I'm calling this anywhere
  inUsers: function(name, inviteeList){
    var newInvitee = Meteor.users.findOne({username: name});
    if(newInvitee){
      inviteeList.push(name);
      return {
        userFound: true
      }
    }
  }
})
