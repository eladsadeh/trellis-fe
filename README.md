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

### Crops selection

The first step is to choose the crops you want to grow. In this page, you can select the crops as well as add or delete crops.

### Varieties

For each selected crop, you can add/delete/modify varieties. Each crop need to have at least one variety. For each variety, sepecify the method of growing, number of plants/feet to grow, and other attributes specific for that variety.

### Seeds order

This page show a list of varieties and the amount of seeds that is needed. Use this list to order your seeds.

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
