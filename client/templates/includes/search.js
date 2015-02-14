Template.search.rendered = function(){
  AutoCompletion.init("input#searchBox");
};

Template.search.events({
  'keyup input#searchBox': function(){
    // e.preventDefault();
    AutoCompletion.autocomplete({
      element: 'input#searchBox',
      collection: Meteor.users,
      field: 'username',
      limit: 5
    })
  }
})
