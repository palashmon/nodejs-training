# Book an Appointment

```
Please go through the document carefully to understand the requirement along with
our expectations.
```

## Scope of work

Allow patients to book an appointment with doctors based on their availability.

Doctor Data: Insert a couple of doctor's records. Reference: http://www.doctorsdirectoryindia.com/doctor

### Sections

- Patient (Login required for patients to book an appointment)
- Doctor (sign-in required)
- Upcoming appointment listing with option to filter by date having Today as default
  date
- A doctor should have the option to close (seen patient) or cancel (patient no-show)
  appointments, i.e. status will change to 'Closed' or 'Cancelled'

### Reports: Export to PDF

- Month all appointments summary with all doctor's and patient info
- Appointment Detailed Report for a single appointment

## Book an Appointment

```

- Select a doctor from a list of all the doctors
- Shows available time-slots for selected doctor
- Patient to select time-slot (see entity / attribute section), enter name, email, phone
- Submit to book appointment.
- After submission the appointment status will be 'Open'

```

## Entities / Attributes

```
user
user_id
name
email (use it as user name for sign-in)
password
doctor
doctor_id
```

```
doctor_name
user_id
appointment_slot_time (15min, 30min, 45min, 60min, etc)
day_start_time (9:00am, 10:00am, etc)
day_end_time (6:00pm, 7:00pm, etc)
appointment
appointment_id
appointment_date
appointment_time (slot time)
doctor_id
patient_name
patinet_email
patinet_phone
appointment_status (Open, Closed, Cancelled)
```

## Reports

Appointment Summary Report (selected month)

Appointment Detailed Report (selected month)

```
Feel free to format the reports as you find appropriate.
```

```
Date # of Appointments # of Appointment Closed # of Appointment
Cancelled
2020-02-20 5 4 1
2020-02-21 5 5 0
2020-02-22 5 2 0
...
```

```
Date Patient Name Status
2020-02-20 Patient 01 Closed
Patient 02 Closed
Patient 03 Closed
Patient 04 Closed
Patient 05 Canceled
2020-02-21 Patient 06 Closed
Patient 07 Closed
Patient 08 Closed
Patient 09 Closed
Patient 10 Closed
2020-02-20 Patient 11 Closed
Patient 12 Closed
Patient 13 Open
Patient 14 Open
Patient 15 Open
```

## Technologies / Tools

Node, Express, MySQL or MongoDB

## Deliverables Expectations

```
All features are expected to be working
Use object oriented approach for the solution with reasonable classes and attributes. Keep it
as modular and clean as possible and follow common software practices to include
reusability, portability, encapsulation, etc
Provide code comments and in code documentation where necessary
Provide sufficient amount of unit tests for implementation (framework of your choice)
A README describing how to run the program.
```

```
Share github project URL, by pushing both API
Share database schema with sample data as needed.
```

## Review Process

Submitted code will be reviewed internally to assess the quality of the implementation / code.
