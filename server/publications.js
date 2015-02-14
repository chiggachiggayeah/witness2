Meteor.publish('events', function(){
  return Events.find();
});

Meteor.publish('blurbs', function(){
  return Blurbs.find();
});

Meteor.publish('images', function(){
  return Images.find();
});
