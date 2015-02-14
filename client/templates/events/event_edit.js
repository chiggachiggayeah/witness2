// Session.set('curInvitees', Events.findOne({id: this._id}).invitees);
// curInvitees = [];

// template = Template.instance();

Template.eventEdit.events({
  'submit form': function(e){
    e.preventDefault();

    var eventProps = {
      title: $(e.target).find('[name=edTitle]').val(),
      description: $(e.target).find('[name=edDescription]').val(),
    };

    var eventId = this._id;

    Events.update(eventId, {$set: eventProps}, function(error){
      if(error) {
        alert(error.reason)
      } else {
        Router.go('eventPage', {_id: eventId});
      }
    });
  },

  'click .delete':function(e){
    e.preventDefault();

    var eventId = this._id;

    Events.remove(eventId);

    // makes sense to go to eventList now

    Router.go('eventsList');
  },

  'click .iName': function(e){

    e.preventDefault();

    var cInvitee = this.toString();

    var eventId = Session.get('cEvent');


    var tempEvent = Events.findOne({_id: eventId});

    var ind = tempEvent.invitees.indexOf(cInvitee);

    Events.update({_id: eventId}, {$pull: {invitees: cInvitee}});
   },

  'click [name=addI]': function(e){
    e.preventDefault();
    var eventId = Session.get('cEvent');
    var newInvitee = $('[name=inviteeName]').val();
    Events.update({_id: eventId}, {$push: {invitees: newInvitee}});
  },

});

Template.eventEdit.helpers({
  // inviteeHelper: function(){
  //   Session.set('curInvitees', this.toString());
  // },
  isAuthor: function(){
    console.log(this.userId);
    return currentUser = this.author; //that's an extended field.
  },
  curEventHelper: function(){
    Session.set('cEvent', this._id);
  }
})
