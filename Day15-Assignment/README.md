# Nodejs Training: Day 15 Assignment

## Book an Appointment

Allow patients to book an appointment with doctors based on their availability.

### Solution

My node and npm versions used for this demo:

- Node: `12.16.2`
- Npm: `6.14.5`

How to run locally:

1. Clone this repo.
2. Then go to this folder and install npm modules like:
   ```bash
   cd nodejs-training\Day15-Assignment
   npm install
   ```
3. I am using MongoDB for this demo app. You can update the connection string by updating the `.env` file in root:
   ```env
   MONGODB_URL=mongodb://127.0.0.1:27017/appointment-api
   MONGODB_URL_TEST=mongodb://127.0.0.1:27017/appointment-api-test
   ```
   Here the DB name is set as `appointment-api` and test DB is named as `appointment-api-test`
4. To insert some sample `users` and `appointments` run this command in CLI:

   ```bash
   npm run sample
   ```

   If you have previously added some data and want to delete all of the previous data first and then insert new sample data again, then run this command in CLI:

   ```bash
   npm run blowitallaway
   npm run sample
   ```

5. Then finally start the node app like:
   ```bash
   npm start
   ```
   If you want to run nodemon, then you can use:
   ```bash
   npm run dev
   ```
6. If everything is fine, then we should see an output in CLI like:

   ```
   Connected to mongodb://127.0.0.1:27017/appointment-api
   App is running ...

   Press CTRL + C to stop the process.
   ```

   Please ignore the express-validator deprecated warnings, as this is just a demo app.

### Sample Users

The logins for the users created using `npm run sample` are as follows:

| Name                | Email (login)    | Password | Role    |
| ------------------- | ---------------- | -------- | ------- |
| Palash Mondal       | palash@test.com  | 1234     | Patient |
| Rahul Das           | rahul@test.com   | 1234     | Patient |
| Dr. Gaurav Rajender | gauravr@test.com | 1234     | Doctor  |
| Dr. Naman Mathur    | namanm@test.com  | 1234     | Doctor  |

## Sections

All of the functionality development and testing is done using [Postman](https://www.postman.com/). Here are all of the route urls, body and header passed of each functionality:

### Patient Register

- **Http**: POST
- **URL**: http://localhost:3000/api/auth/register
- **Body**: Passed as raw json

  ```json
  {
    "firstName": "Palash",
    "lastName": "Mondal",
    "email": "palash@test.com",
    "role": "Patient",
    "password": "1234"
  }
  ```

- **Result**: It returns an object like `"message": "Registration Success."`

Please note: This user is already created using sample database command. So, please use different user name, email and details for testing.

### Doctor Register

- **Http**: POST
- **URL**: http://localhost:3000/api/auth/register
- **Body**: Passed as raw json

  ```json
  {
    "firstName": "Dr. Gaurav",
    "lastName": "Rajender",
    "email": "gauravr@test.com",
    "role": "Doctor",
    "password": "1234"
  }
  ```

Please note: This user is already created using sample database command. So, please use different user name, email and details for testing.

### Patient Login

For login we use `email` as username. Here are the postman testing details:

- **Http**: POST
- **URL**: http://localhost:3000/api/auth/login
- **Body**: Passed as raw json

  ```json
  {
    "email": "palash@test.com",
    "password": "1234"
  }
  ```

- **Result**: It returns an object like

  ```json
  {
    "status": true,
    "message": "Login Success.",
    "data": {
      "_id": "5f0ead8085905e2bb8bba69d",
      "firstName": "Palash",
      "lastName": "Mondal",
      "email": "palash@test.com",
      "role": "Patient",
      "token": "xyz"
    }
  }
  ```

**Note**: The `token` returned here is very important. Please copy it wherever we will need to validate authorization or `Patient` role authorization specifically.

### Doctor Login

- **Http**: POST
- **URL**: http://localhost:3000/api/auth/login
- **Body**: Passed as raw json

  ```json
  {
    "email": "gauravr@test.com",
    "password": "1234"
  }
  ```

- **Result**: It returns an object like

  ```json
  {
    "status": true,
    "message": "Login Success.",
    "data": {
      "_id": "5f0ead6a85905e2bb8bba69c",
      "firstName": "Dr. Gaurav",
      "lastName": "Rajender",
      "email": "gauravr@test.com",
      "role": "Doctor",
      "token": "abc"
    }
  }
  ```

**Note**: The `token` returned here is very important. Please copy it wherever we will need to validate authorization or `Doctor` role authorization specifically.

### Get all the active status doctor details

- **Access**: Only logged in users can view this route. Logged in user can be of any role.
- **Http**: POST
- **URL**: http://localhost:3000/api/doctor/
- **Headers**: Add a new header for this request with `KEY` as `authorization` and `VALUE` as `Bearer token`. Here, replace token with the actual `token` that we get from either [**Patient Login**](#patient-login) or [**Doctor Login**](#doctor-login) section above. So, if the `token` is "abc123", then the `VALUE` would be like `Bearer abc123`.

- **Result**: A successful json will be returned like:

  ```json
  {
    "doctors": [
      {
        "_id": "5f0ead6a85905e2bb8bba69c",
        "name": "Dr. Gaurav Rajender",
        "email": "gauravr@test.com"
      },
      {
        "_id": "5f0ead8085905e2bb8bba69d",
        "name": "Dr. Naman Mathur",
        "email": "namanm@test.com"
      }
    ]
  }
  ```

### Get available time-slots for selected doctor

For this demo app, each doctor working time is from 10:00 AM - 04:00 PM and each slot is for 30 minutes each. So, you can select any of the open slots from 10:00 AM till 3.30 PM. So, if a patient book an appointment at 11 AM, then time from 11 AM - 11.30 AM is closed and other patents can not book that slot anymore.

- **Access**: Only `Patient` role users can access this route.
- **Http**: GET
- **URL**: http://localhost:3000/api/doctor/:id/slots

  - Here replace the `:id` param with `_id` of a user with `Doctor` role.

- **Headers**: Add a new header for this request with `KEY` as `authorization` and `VALUE` as `Bearer token`. Here, replace token with the actual `token` that we get from [**Patient Login**](#patient-login) section above. So, if the `token` is "abc123", then the `VALUE` would be like `Bearer abc123`.

- **Result**: If all validations are fine, then we should see the open slots for today & tomorrow for the selected doctor like:

  ```json
  {
    "status": true,
    "message": "Available Slots:",
    "data": {
      "open_slots": [
        "20-07-2020 10:00 AM",
        "20-07-2020 10:30 AM",
        "20-07-2020 11:30 AM",
        "20-07-2020 12:00 PM",
        "20-07-2020 12:30 PM",
        "20-07-2020 01:00 PM",
        "20-07-2020 01:30 PM",
        "20-07-2020 02:30 PM",
        "20-07-2020 03:00 PM",
        "20-07-2020 03:30 PM",
        "21-07-2020 10:00 AM",
        "21-07-2020 10:30 AM",
        "21-07-2020 11:30 AM",
        "21-07-2020 12:00 PM",
        "21-07-2020 12:30 PM",
        "21-07-2020 01:00 PM",
        "21-07-2020 01:30 PM",
        "21-07-2020 02:30 PM",
        "21-07-2020 03:00 PM",
        "21-07-2020 03:30 PM"
      ],
      "doctor": "Dr. Naman Mathur",
      "doctor_schedule": "Everyday from 10:00 AM - 04:00 PM for 30 minutes each"
    }
  }
  ```

### Patient select a time-slot and book appointment.

- **Access**: Only `Patient` role users can access this route.
- **Http**: POST
- **URL**: http://localhost:3000/api/doctor/:id

  - Here replace the `:id` param with `_id` of a user with `Doctor` role.

- **Headers**: Add a new header for this request with `KEY` as `authorization` and `VALUE` as `Bearer token`. Here, replace token with the actual `token` that we get from [**Patient Login**](#patient-login) section above.

- **Body**: Passed as raw json

  ```json
  {
    "date": "20-07-2020 11:30 AM"
  }
  ```

  We just need to copy a slot from `Get available time-slots for selected doctor` section and paste as `date` key's value. This is the date and time at which we need to make an appointment with the selected doctor, which is represented by `:id` slug.

- **Result**: If all validations are fine, then we should see json result like:

  ```json
  {
    "status": true,
    "message": "New Appointment successfully created!"
  }
  ```

### Doctor can view their Upcoming appointments

- **Access**: Only `Doctor` role logged-in users can access this route.
- **Http**: GET
- **URL**: http://localhost:3000/api/doctor/appointments/:date

  - Date is optional here, if no date is passed, then it defaults to today's date
  - Here replace the `:date` param with date string like `20-07-2020` in "DD-MM-YYYY" format.

- **Headers**: Add a new header for this request with `KEY` as `authorization` and `VALUE` as `Bearer token`. Here, replace token with the actual `token` that we get from [**Doctor Login**](#doctor-login) section above.

- **Result**: If all validations are fine, then we should see json result like:

  ```json
  {
    "status": true,
    "message": "Upcoming Appointments found!",
    "data": [
      {
        "_id": "5f146c105c920308b85f87fd",
        "patient": {
          "name": "Palash Mondal",
          "email": "palash@test.com"
        },
        "date": "20.07.2020 11:00 AM"
      },
      {
        "_id": "5f146c105c920308b85f87fe",
        "patient": {
          "name": "Rahul Das",
          "email": "rahul@test.com"
        },
        "date": "20.07.2020 02:00 PM"
      }
    ]
  }
  ```

### Doctor can close or cancel appointments

A doctor has the option to close (seen patient) or cancel (patient no-show) appointments, i.e. status will change to 'Closed' or 'Cancelled'

- **Access**: Only `Doctor` role logged-in users can access this route.
- **Http**: GET
- **URL**: http://localhost:3000/api/doctor/appointment/:id

  - Here replace the `:id` param with `_id` of the appointment that you want to close.

- **Headers**: Add a new header for this request with `KEY` as `authorization` and `VALUE` as `Bearer token`. Here, replace token with the actual `token` that we get from [**Doctor Login**](#doctor-login) section above.

- **Body**: Passed as raw json

  ```json
  {
    "status": "Closed"
  }
  ```

  Here we just need to pass the status as string. Valid string options are either 'Open', 'Closed' or 'Cancelled'.

- **Result**: If all validations are fine, then we should see json result like:

  ```json
  {
    "status": true,
    "message": "Appointment has been updated successfully!"
  }
  ```

### Monthly Report of all appointments summary with all doctor's and patient info

- **Access**: Only logged in users can view this route. Logged in user can be of any role.
- **Http**: GET
- **URL**: http://localhost:3000/api/report/monthly/:month

  - Month is optional here, if no month is passed, then it defaults to current month
  - Here replace the `:month` param with number between 0 - 11, where 0 = Jan & 11 = Dec respectively.

- **Headers**: Add a new header for this request with `KEY` as `authorization` and `VALUE` as `Bearer token`. Here, replace token with the actual `token` that we get from either [**Patient Login**](#patient-login) or [**Doctor Login**](#doctor-login) section above.

- **Result**: If there are appointments found for selected month or default one, then we should see json result like:

  ```json
  {
    "status": true,
    "message": "Appointment Monthly Report",
    "data": [
      {
        "status": "Open",
        "patient": {
          "name": "Palash Mondal",
          "email": "palash@test.com"
        },
        "doctor": {
          "name": "Dr. Gaurav Rajender",
          "email": "gauravr@test.com"
        },
        "date": "20.07.2020 10:00 AM"
      },
      {
        "status": "Open",
        "patient": {
          "name": "Palash Mondal",
          "email": "palash@test.com"
        },
        "doctor": {
          "name": "Dr. Naman Mathur",
          "email": "namanm@test.com"
        },
        "date": "20.07.2020 11:00 AM"
      }
    ]
  }
  ```

### Appointment Detailed Report for a single appointment

- **Access**: Only logged in users can view this route. Logged in user can be of any role.
- **Http**: GET
- **URL**: http://localhost:3000/api/report/appointment/:id

  - Here replace the `:id` param with `_id` of the appointment that you want to find details about.

- **Headers**: Add a new header for this request with `KEY` as `authorization` and `VALUE` as `Bearer token`. Here, replace token with the actual `token` that we get from either [**Patient Login**](#patient-login) or [**Doctor Login**](#doctor-login) section above.

- **Result**: If an appointment is found for selected id, then we should see json result like:

  ```json
  {
    "status": true,
    "message": "Appointment Details:",
    "data": {
      "status": "Open",
      "patient": {
        "name": "Palash Mondal",
        "email": "palash@test.com"
      },
      "doctor": {
        "name": "Dr. Naman Mathur",
        "email": "namanm@test.com"
      },
      "date": "20.07.2020 11:00 AM"
    }
  }
  ```
