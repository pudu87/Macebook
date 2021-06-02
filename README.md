## Macebook

_Replicating a social network site as the final project of the Javascript course._

Made with Rails and React  
Macebook has a separate back end API. You can find it's repository over [here](https://github.com/pudu87/Macebook-api)

* Check it out [here](https://pudu87.github.io/macebook/)
* From The Odin Project's [curriculum](https://www.theodinproject.com/paths/full-stack-ruby-on-rails/courses/javascript/lessons/final-project-116ff273-1e55-4055-bd7f-146c17d0ec9c)

### How to use Macebook

Navigate to the Sign Up page and create an account. There is no  confirmation required of any kind, so the email field can be fictitious.  

You will be redirected to the Home Page. Nothing to see there yet. Check your 'Friends' list on the 'My Page' section of the menu. You should be assigned some free friends on creating your account. Accept their friendship requests and check out their posts.

### Features

* Macebook is based on Facebook, it also offers
  * Creating, editing and deleting
    * Posts
    * Comments
    * Replies (comments on comments)
  * Liking and unliking all of the above
  * An editable profile
  * Uploading pictures for Posts or Profiles
  * Adding and removing Friends
* Image storage through Amazon S3
* User authentication through Devise
* Responsive Design
* Login time limited to 30min

### Issues

* Macebook doesn't like it when you refresh a page. Needs to be evaluated
