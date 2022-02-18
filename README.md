# Trellis Garden App

## Introduction

Trellis is a web application that supports the home gardener in planning the vegetable garden. The user can add and select the crops they want to grow, select the varieties and quantity to grow, and compile a seed order.

This app is a prototype for one component of a bigger platform that supports the "Grow your own food" movement.

More features to come ...

The user interface uses a backend API that save all data in a database.

## Deployed Application

https://trellis-garden.netlify.app

## How to use the app

### Account

Since all the information is saved in a database, in order to use the app, the user needs to open an accout, or login to an existing accout.

### Home page

The application guide the user through a process of designing the garden. The home page show the steps of the process. Click on a step to go to the relevant step (or choose from the dropdown menu).

<img width="797" alt="Screen Shot 2022-02-18 at 8 55 54 AM" src="https://user-images.githubusercontent.com/93807931/154696316-3e45f081-33b8-4aee-9335-5b8421af6757.png">

### Crops selection

The first step is to choose the crops you want to grow. In this page, you can select the crops as well as add or delete crops.
<img width="592" alt="Screen Shot 2022-02-18 at 9 01 16 AM" src="https://user-images.githubusercontent.com/93807931/154696632-8dea331f-fd00-4d40-bd9e-b5de5c843f17.png">

### Varieties

For each selected crop, you can add/delete/modify varieties. Each crop need to have at least one variety. For each variety, sepecify the method of growing, number of plants/feet to grow, and other attributes specific for that variety.
<img width="420" alt="Screen Shot 2022-02-18 at 9 04 37 AM" src="https://user-images.githubusercontent.com/93807931/154697182-497ca206-3a91-4265-b72f-210f9c3b7609.png">

### Seeds order

This page show a list of varieties and the amount of seeds that is needed. Use this list to order your seeds.
<img width="591" alt="Screen Shot 2022-02-18 at 9 06 29 AM" src="https://user-images.githubusercontent.com/93807931/154697479-025abfd3-5909-4988-a6d9-27ae98cdbecb.png">

### Planting Plan

This page is not implemented yet ...

The Planting plan is where you decide when to plants what and how much.

## API

Trellis application is supported by API developed using Django REST Framework. The git repository for the API is at https://github.com/eladsadeh/trellis-be. The API is deployed to Heroku at https://trellis-garden-api.herokuapp.com/.

## Technologies Used

- JavaScript
- Next.js
- CSS

## Instalation

You are welcome to copy this repository.

- Fork and clone the repository
- go to the new directory (`cd trellis-fe`)
- To set the url of the API, use the variable NEXT_PUBLIC_BACKEND_URL
  add `NEXT_PUBLIC_BACKEND_URL="your-api-url"` to your `.env.local` file.
- run `npm install` to install dependencies.
- run `npm run dev` to run the app on local server
