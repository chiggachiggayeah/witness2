Template.eventItem.events({
  'click .submitNarForImg': function(e){
      e.preventDefault();

      var eventId = Session.get('cEvent');

      var cImgUrl = this.url;

      var nar = $('.narrationImg').val();

      var narItem = {
        author: Meteor.user().username,
        content: nar
      }

      Images.update(this._id, {$push : {narration: narItem}});

      console.log(nar);
  },

  'click .submitNarForBlurb': function(e){
    e.preventDefault();

    var eventId = Session.get('cEvent');

    var cImgUrl = this.url;

    var nar = $('.narrationBlurb').val();



    var narItem = {
      author: Meteor.user().username,
      content: nar
    }

    Blurbs.update(this._id, {$push : {narration: narItem}});
  },
});

Template.eventItem.helpers({
  blurbAuthor: function(){
    var blurb = Blurbs.findOne({_id: this._id});
    console.log(blurb)
    var author = Meteor.users.findOne({_id: blurb.userId});
    console.log(author.username);
    return author.username;
  },

  imgAuthor: function(){
    var image = Images.findOne({_id: this._id});
    var author = Meteor.users.findOne({_id: image.userId});
    return author.username;
  },

  curEventHelper: function(){
    Session.set('cEvent', this._id)
  },

  blurbs: function(){
    // var blurbs = Blurbs.find({eventId: Session.get('cEvent')});
    // console.log(Blurbs.find());
    // return blurbs;
    var blurbs = Blurbs.find({eventId: Session.get('cEvent')});
    return blurbs
  },

  images: function(){
    var images = Images.find({eventId: Session.get('cEvent')});
    return images;
  },

  imgHelper: function(){
    return Images.findOne({_id: this});
  },

  isInvitee: function(){
    var eventId = Session.get('cEvent');
    var event = Events.findOne({_id: eventId});
    return _.contains(event.invitees, Meteor.user().username);
  }
})
