# [ppsbathrooms](https://ppsbathrooms.org)

PPS Bathrooms allows students at PPS schools find open bathrooms. PPS Bathrooms currently covers Cleveland, Franklin, and Ida B Wells High Schools.

Bathrooms are labeled with green or red boxes, coorisponding to if the bathrooms are open or closed. you can click a bathroom or it's coorisponding box to change the status. after updating bathrooms, you can click the button in the bottom right of the screen and enter a confirmation password to confirm your changes. We require a password to ensure the validity of the data that is submitted, to be added to the team that updates bathrooms, contact us [here](https://ppsbathrooms.org/contact).

You can create an account [here](https://ppsbathrooms.org/createaccount). With an account you can enter your class schedule and school and on the main map a line will be drawn to the closest bathrooms.

## Environment Variables

To run this project, you will need to add the following environment variables to a config.json file in the root directory

`URI`

Connection string for connection to mongodb database

`EMAIL_API`

API key to send emails

`TRIVORY_API`

API key to support the Trivory API, allowing access to school schedules

`DISCORD_TOKEN`

Token for Discord bot

`DISOCRD_ID`

ID of Discord bot

## Run Locally

Clone the project

```bash
  git clone https://github.com/pps-bathrooms/ppsbathrooms
```

Install dependencies

```bash
  npm install
```

Start the server in

```bash
  cd src; node app.js
```

## Authors

-   [@finnmprice](https://www.github.com/finnmprice)
-   [@lucahaverty](https://www.github.com/lucahaverty)
-   [@AidanMoellering](https://www.github.com/AidanMoellering)

## Feedback

If you have any feedback, please reach out to us at contact@ppsbathrooms.org
