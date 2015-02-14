Blurbs = new Mongo.Collection('blurbs');

Blurbs.allow({
  update: function(userId, blurb){return isInvitee(userId, blurb);}
});

Meteor.methods({
  blurbInsert: function(blurbAttrs, eventId){
    check(Meteor.userId(), String);
    check(blurbAttrs, {
      title: String,
      content: String
    });

    var user = Meteor.user();
    var blurb = _.extend(blurbAttrs, {
      narration: [],
      userId: user._id,
      eventId: eventId,
      submitted: new Date()
    });
    var bId = Blurbs.insert(blurb);
    Events.update(eventId, {$push: {blurbs: bId}});
  },
})
