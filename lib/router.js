Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function(){return [
    Meteor.subscribe('events'),
    Meteor.subscribe('blurbs'),
    Meteor.subscribe('images')
  ];}
});

Router.route('/', {name: 'eventsList'});

Router.route('/events/:_id', {
  name: 'eventPage',
  data: function(){return Events.findOne(this.params._id)}
});

Router.route('/events/:_id/edit', {
  name: 'eventEdit',
  data: function(){return Events.findOne(this.params._id);}
});

Router.route('/submit', {name: 'eventSubmit'});

var requireLogin = function(){
  if(! Meteor.user()){
    if(Meteor.loggingIn()){
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
};

//Valid URL'S tht don't return data displays notFoundTemplate
Router.onBeforeAction('dataNotFound', {only: 'eventPage'});
Router.onBeforeAction(requireLogin, {only: 'eventSubmit'});
