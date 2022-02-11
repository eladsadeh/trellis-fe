### Your project idea 

Trellis is a tool for planning a vegetable garden. It takes the user through the garden planning proccess.
Users will be able to select the vegetables they want to grow, select the varieties, compile a seed order, and plan when to plant what.

### Your tech stack (frontend, backend, database)

Frontend: Next.js, React, Ant Design, Blueprint
Backend: Python, Django, Django REST Framework
Database: PostgreSQL

### List of backend models and their properties

1. Crop
    - name
    - seeds per ounce
    - seed to transplant

2. Variety
    - name
    - days to maturity
    - crop (linked)
    - seeds per ounce
    - seeds per feet
    - seeds per
    - spacing

3. Planting
    - variety (linked)
    - start_date
    - method
    - transplant_date

### React component hierarchy

App
 |--> Navigation
 |--> About
 |--> Login/Register
 |--> Home
        |--> Crops
        |      |--> Varieties
        |--> Seeds
        |--> Plantings
               |--> Planting detail

### User stories
- As a user, I want to be able to select the crops I want to grow and save the list
- As a user, I want to be able to add varieties to each crop I plant to grow
- As a user, I want to be able to delete varieties and crops that I don't want to grow
- As a user, I want to be able to edit the properties of the varieties
- As a user, I want to get default values for crops and varieties so I have a starting point
- As a user, I want to be able to add plantings information for each variety
- As a user, I want to see a list of all my plantings
- As a user, I wnat to get a list of seeds that I need to order

### Wireframes

#### Home View

![Screen Shot 2022-02-10 at 9 50 40 PM](https://user-images.githubusercontent.com/93807931/153530528-d21f1dcc-1160-4081-97ab-1bfc28ae9b17.png)


#### Crops Selection/Add

![Screen Shot 2022-02-10 at 9 51 13 PM](https://user-images.githubusercontent.com/93807931/153530548-52a07e0b-02dc-4e24-83f2-1bff4f8d7013.png)


#### Varieties 

![Screen Shot 2022-02-10 at 9 51 24 PM](https://user-images.githubusercontent.com/93807931/153530563-bb0b9b88-124f-46a6-9be9-f699d4b8446c.png)


#### Seed list

![Screen Shot 2022-02-10 at 9 51 36 PM](https://user-images.githubusercontent.com/93807931/153530578-c3c2ef3c-02b5-43aa-80c6-24d36ba707f3.png)


#### Planting Plan

![Screen Shot 2022-02-10 at 9 51 47 PM](https://user-images.githubusercontent.com/93807931/153530601-bd727565-7a07-45ef-b5f1-a35536081e3a.png)


### Anything else your squad lead should know
