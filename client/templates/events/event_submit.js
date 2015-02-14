newInvitees = [];
//
// Template.eventSubmit.settings = function(){
//   return {
//     position: 'top',
//     limit: '5',
//     rules: [
//       {
//         token: '@',
//         collection: Meteor.users,
//         field: 'username',
//         template: Template.userPill
//       }
//     ]
//   }
// };

Template.eventSubmit.events({
  'submit form': function(e){
    e.preventDefault();

    var event = {
      title: $(e.target).find('[name=title]').val(),
      description: $(e.target).find('[name=description]').val(),
      invitees: Session.get('newInvitees')
    };

    // event._id = Events.insert(event);
    Meteor.call('eventInsert', event, function(error, result){
      if(error) return alert(error.reason);
      if(result.eventExists) alert("Event name taken")

      Router.go('eventPage', {_id: result._id});
    });
    //Unset the local list of invitees
    Session.set('newInvitees', []);

    // Router.go('eventPage', {_id: event._id});
  },

  'click #addInvitee': function(e){
    e.preventDefault();

    Session.set('userNotFound', false);

    var invitee = $("#searchBox").val();
    console.log(newInvitees);
    // console.log(Meteor.users.findOne({username: }));
    var foundUser = Meteor.users.findOne({username: invitee});

    if(foundUser){
      newInvitees.push(invitee);
    } else {
      Session.set('userNotFound', true)
    };

    Session.set('newInvitees', newInvitees);
    // $(e.target).find('[name=newInvitee]').val("");
  },

  'click [name=callT]': function(e){
    e.preventDefault();

    Meteor.call('getTweets', "#beingawesome", function(error, result){
      if(error) return alert(error.reason);
      console.log(result.content);
    })
  }
});

Template.eventSubmit.helpers({
  newInvitees: function(){
    // console.log(Meteor.user().username)
    return Session.get('newInvitees');
  },
  settings: function(){
    return {
      position: 'top',
      limit: '1',
      rules: [
      {
        // token: '@',
        collection: Meteor.users,
        field: 'username',
        template: Template.userPill
      }
      ]
    }
  },
  userNotFound: function(){
    return Session.get('userNotFound')
  }
});
