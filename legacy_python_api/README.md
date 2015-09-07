# Monitoring API
### WuKong Data Store API Reference
Origin https://docs.google.com/document/d/1AdKRufgZDxIfumPvMs62GlXlFfUZP6DTaNDr1t_ZDjQ/edit

Migrated to README to track documentation with implementation

### API Methods

### CreateUser

##### Description
Create a user information which involve the WuKong system. This created user have authority to build and store & access system data which is belong to this user.

##### Request Parameters
[It should also indicate what system/app/device belong to him, but the current version of WuKong didn’t support it]
For information about the common parameters that all actions use, see Common Parameters.

##### Response Element

UserId: the specific ID in Database for this user which can identify this user in any action.

Insert Target: wukong.user

##### Examples

##### Sample Request
http://localhost:8888/createuser?id=wukong&pwd=wukong2014&type=adult&pref=Null&loc=BL-7F/Workspace/Entrance

##### Sample Response
Return, shown on web.
> Document EXIST:1

##### Data at DataBase

>\> db.user.find()

>{ "_id" : ObjectId("5535c262491d435bd09db055"), "Type" : "b", "User_id" : "a", "Preference" : "c", "Location" : "d" },{ "_id" : ObjectId("553e2b39491d4367b9c15679"), "User_id" : "wukong", "User_pwd" : "wukong2014", "Location" : "BL-7F/Workspace/Entrance", "Type" : "adult", "Preference" : "Null" }


