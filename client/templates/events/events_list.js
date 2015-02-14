var eventsData = [
  {
    title: 'Being Happy',
    content: "The key to bein happy really ain't no big dark secret. It just takes a bit of work"
  },
  {
    title: 'Being Creative',
    content: 'Just be creative. There is no try'
  }
];

Template.eventsList.helpers({
  events: function(){
    return Events.find();
  }
});
