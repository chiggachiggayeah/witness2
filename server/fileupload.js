Slingshot.fileRestrictions("myImageUploads", {
  allowedFileTypes: ["image/png", "image/jpeg", "image/gif"],
  maxSize: 10 * 1024 * 1024 //10mb, use null for unltd
});

Slingshot.createDirective("myImageUploads", Slingshot.S3Storage, {
  bucket: "witness2",
  acl: "public-read",
  region: "us-west-2",
  authorize: function(){
    if(!this.userId) {
      var message="Please login before uploading files";
      throw new Meteor.Error("Login Required", message);
    }
    return true;
  },

  //use a meta context
  key: function(file, mContext){
    var user = Meteor.users.findOne({_id: this.userId});
    return mContext.eventId + "/" + file.name;
  }
});
