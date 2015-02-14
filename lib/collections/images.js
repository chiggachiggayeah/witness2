Images = new Mongo.Collection('images');

Images.allow({
  update: function(userId, image){return isInvitee(userId, image);}
});

Meteor.methods({
  imgInsert: function(imgAttrs, eventId){
    check(Meteor.userId(), String);
    check(imgAttrs, {
      url: String,
      caption: String
    });

    var user = Meteor.user();
    var img = _.extend(imgAttrs, {
      narration: [],
      userId: user._id,
      eventId: eventId,
      submitted: new Date()
    });

    var imgId = Images.insert(img);
    //insert into event
    Events.update(eventId, {$push: {images: imgId}});
  }
})
