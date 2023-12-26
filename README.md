<!-- # I have made ocr using google vision api 
## Tech stack - Mongodb ExpressJs ReactJs Nodejs Bootstrap 
## To set this repo in local system one should clone the code from github and run npm install and then npm start

## features 
- you can upload thai card image and fetch data from it using google vision api
- save the data in mongoDB
- There is one button to check all history
- In history one can perform search edit and delete function

## Test Case / Error Handling 

- I suppose image is not of thai card then no result will will displayed feild will be empty and user can't save this data
- Suppose if data is not present in some feild but present in some other feild then also user can save the data
- user can only save data when data is completely fetched from ocr and field is complete
- if same image is being uploaded and saved numerous time then also one time data will be saved in data base

# Routes 
- get - with identication number fetch 
- put - identication number
- post - 
- delete - identication number

# 

 -->
 # OCR Using Google Vision API

This project implements Optical Character Recognition (OCR) using the Google Vision API with the following tech stack:

- MongoDB
- Express.js
- React.js
- Node.js
- Bootstrap

## Getting Started

To set up this repository on your local system:

   Clone the code from GitHub:
   ```bash
   git clone https://github.com/kashish609jain/frontend-ocr
   cd frontend-ocr
   npm install
   npm start

## Features
-Upload Thai card images and fetch data from them using the Google Vision API.
-Save the data in MongoDB.
-View history with a button to check all saved data.
-Perform search, edit, and delete functions in the history.   

## Test Case / Error Handling
- If the image is not a Thai card, no result will be displayed, and the user can't save the data.
- If data is not present in some fields but present in others, the user can still save the data.
- The user can only save data when the data is completely fetched from OCR, and all fields are complete.
- If the same image is uploaded and saved numerous times, only one instance of the data will be saved in the   database.

## Routes
-GET - With identification number, fetch data.
-PUT - Update data with identification number.
-POST - Create new data.
-DELETE - Delete data with identification number.

