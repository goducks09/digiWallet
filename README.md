After taking multiple courses on front-end, back-end, and full-stack applications, I decided to try my hand at a full-stack application on my own. I wanted to create a project that could have real-world application, and I decided on a digital wallet for giftcards. With my experience using Javascript and React, I decided to use the MERN (MongoDB, Express, React, Node) stack to build the application.

This application uses MongoDB Atlas to store users and cards. I used Mongoose schema to easily model the data for the database, and ExpressJS for defining the routes and middleware. The front-end was built using React.

In building the application, I was able to learn new functionalities and processes. One of these was React Context. The wallet application requires user authentication to access most routes. During development, I found that the authentication credentials were being lost while navigating, breaking the application. After researching, I found React Context which allows data to be accessed by any component without having to pass it through props. This allowed me to store the authentication information during navigation without having to implement a state store like Redux.

Being my first full-stack application, I ran into roadblocks on a few occasions that required me to research and troubleshoot new concepts, such as user authentication. I was able to work through these issues and had a full-stack application ready to be deployed! To stick with the theme of learning new technologies for this project, I decided to deploy my application using Heroku. It was my first time using it, and after solving a few issues, I was able to succesfully have it up and running.

While the application has been deployed, there are updates that would need to be made for it to be production ready. Currently, the card information is stored to the database without being encrypted. I do use encryption for user information, so I will likely extend this logic to the stored card information.

Check out the app at https://digi-wallet.herokuapp.com/!
