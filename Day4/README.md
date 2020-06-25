# Nodejs Training: Day 4

## What is MVC pattern for Node.js?

Model View Controller (MVC) approach is based on three components:

- **Model**

  Model represents the structure of data, the format and the constraints with which it is stored. It maintains the data of the application. Essentially, it is the database part of the application.

- **View**

  View is what is presented to the user. Views utilize the Model and present data in a form in which the user wants. A user can also be allowed to make changes to the data presented to the user. They consist of static and dynamic pages which are rendered or sent to the user when the user requests them.

- **Controller**

  Controller controls the requests of the user and then generates appropriate response which is fed to the viewer. Typically, the user interacts with the View, which in turn generates the appropriate request, this request will be handled by a controller. The controller renders the appropriate view with the model data as a response.

![MVC](https://www.cleveroad.com/images/article-previews/what-is-mvc.png)

So, to sum it up:

- **Model** is data part.
- **View** is User Interface part.
- **Controller** is request-response handler.
