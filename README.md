# Sync Lists

This application allows you to store multiple lists on your self hosted server, with syncronisation between devices and compatability between mobile and desktop without dependance on third parties to store your information

## List types

There are 2 list types available within this application:

1. To-do lists allow you to cross items off as you complete them
2. Stock lists allow you to keep track of what items you have, with a flag button for tracking other statistics (such as needing to restock an item soon)

## Setup for Dockerised solutions
(for non dockerised solutions you'll still need to change the API as mentioned in step 2)

This is a 3 part solution, requiring this frontend application, the backend counterpart and a mysql database to store the list items. Learn more about the backend counterpart here: https://github.com/JessQwest/sync-lists-backend

It's recommended that you have the backend set up first.

1. Clone the repository locally
2. Within `src/api/listApi.ts` update the API value to point to your endpoint. Ensure that the endpoint is a URL your client will be able to access. I used `listsbackend.mydomain.com` as mine
3. Build the container and run. I built within linux using the ./build.sh script

### Example docker compose 

coming soon
