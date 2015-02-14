Template.eventPage.events({

  'click [name=addText]': function(e){
    e.preventDefault();

    var text = $('[name=newTexts]').val().toString();
    var title = $('[name=newTitle]').val().toString();
    var blurb = {
      title: title,
      content: text
    };
    var eventId = Session.get('cEvent');
    if(text.length < 1){
      alert("Ya gotta enter something!")
    } else {
      Meteor.call('blurbInsert', blurb, eventId, function(error, result){
        if (error) return alert(error.reason);
      });
    };

    $('[name=newTexts]').val("")
  },

  // delete text
  'click .tContent': function(e){
    e.preventDefault();

    var text = this.toString();

    var eventId = Session.get('cEvent');

    Events.update({_id: eventId}, {$pull: {texts: text}});
  },

  'click #iUpload': function(e){
    e.preventDefault();
    var mContext = {eventId: Session.get('cEvent')};
    var uploader = new Slingshot.Upload("myImageUploads", mContext);
    //weird syntax bc using a jquery selector, not actually DOM element,
    //what if I used val()
    var image = ($('#imgForUpload'))[0].files[0];
    var caption = $('#imgCaption').val();
    var eventId = Session.get('cEvent');
    uploader.send(image, function(error, downloadUrl){
      var img = {
        url: downloadUrl,
        caption: caption
      };
      Meteor.call('imgInsert', img, eventId, function(error, result){
        if (error) return alert(error.reason);
      });
    });
  }
});

Template.eventPage.helpers({

  curEventHelper: function(){
    Session.set('cEvent', this._id);
  },

  isInvitee: function(){
    var inviteeList = Events.findOne({_id: this._id}).invitees;
    return _.contains(inviteeList, Meteor.user().username);
  },

  ownsEvent: function(){
    return this.userId === Meteor.userId();
  }
})
