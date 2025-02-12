# product-app-react-nestjs
## Demo shopping cart & ChatbotAI (updated 12/02/2025)

[![Demo project ChatbotAI_ShoppingCart on youtube](https://github.com/user-attachments/assets/c6087a15-8745-4128-bf42-fe75e1f5105f)](https://youtu.be/JSRGRXHy_Ag)

# Features:
1- Website 
1. Layout
![image](https://github.com/user-attachments/assets/12a779bb-b6e0-4da2-b7c9-61bdbfd80cf0)

Developing a shopping cart management website with the frontend built using the React library and the backend implemented using the NestJS framework, with database connectivity using MySQL through the TypeORM library.
# Key modules in this project:
## 1. Product Management:

Register/Modify/Delete products with support for attaching images.
Validate input forms and display error messages for invalid inputs.
## 2. Order catogory Management:

Allow users to select products and add them to the shopping cart.

## 3. Shopping Cart Management:
Manage the shopping cart for each user with selected products.
Enable quantity adjustments for purchased items.
Automatically calculate the total amount, including delivery fees.
Support order items.

## 4. Order Tracking Management:

Track details of placed orders.
Display an order management screen in a list format, showing orders and detailed order items.
## 5. Product Search Screen:
Provide a search feature by product name  for products.

## 6. Chatbot AI (DialogFlow) Search:
Provide a search feature with Chatbot, our AI-powered chatbot provides a smart and interactive shopping experience with the following capabilities:
Search products by category. 
Search products by name.
Search products by price.
and It helps search using a context chain: category -> productname -> price.

# Layout of features:

# Key modules in this project:
## 1. Flow Layout Product Management:
![image](https://github.com/user-attachments/assets/f00aef01-5b7b-4f1d-a75e-4e4d9e4a89fd)

### Register Product:
![image](https://github.com/user-attachments/assets/d4b5a7dc-d451-4dc0-9821-d819cb85901b)

![image](https://github.com/user-attachments/assets/7bc6928b-efa9-4643-b84b-76810cd9c93a)


### Select image of product:

![image](https://github.com/user-attachments/assets/80fe408e-6787-4588-b6a6-75d47048417a)


### Select category for product:
![image](https://github.com/user-attachments/assets/3e0745ba-69c1-4d65-9f41-acee5dbca5b7)


### Click register.

![image](https://github.com/user-attachments/assets/0421fbed-7754-4873-a694-f818aad2fa51)

### Display registerd product  
![image](https://github.com/user-attachments/assets/026459fb-42ab-4944-b72f-af9d5040c242)


### In home page, we can purchase new product.
 ![image](https://github.com/user-attachments/assets/be0102db-8c5d-4a37-94c3-764bf7e1f352)



## 2. Flow layout of Order catogory Management:

 ![image](https://github.com/user-attachments/assets/7f975019-3644-4f56-b336-4fe243a96768)

### Click Add to Bag list
 ![image](https://github.com/user-attachments/assets/976503be-8d2f-48e5-80f7-c704c6ebcd6b)

### Show Modal popup notice: Added to your bag
 ![image](https://github.com/user-attachments/assets/1b7e1eae-fa7c-4084-85a1-673b1e375391)
 
### View your Bag
![image](https://github.com/user-attachments/assets/87920221-3c0e-4287-84e9-9cbbca938583)

## 3. Flow layout of Shopping Cart Management:
### Can select multi items: do the same for the 2nd item, and view bag.
And select link Cart on Header area to confirm, adjust quantity items, and Order Products.

![image](https://github.com/user-attachments/assets/05108c83-1ad7-42a0-a4ad-56a433f14b0c)

### Click Order Products:
![image](https://github.com/user-attachments/assets/c305520e-b324-488b-a95e-cb4402cde111)

### Order success:
![image](https://github.com/user-attachments/assets/7330c63b-fb18-45bd-a4d3-ba006f270ff2)
### Carts in your bag will be cleared, and register data to Database.


##  4. Flow layout of Order Tracking Management:
After order Products in Cart screen, select link Tracking-Order to confirm ordered data.

### Click link Tracking-Order on Header area.
![image](https://github.com/user-attachments/assets/57c8afb3-9d7e-4ce9-92aa-bd347b37004f)

### Select Order info that just create Order Products:
![image](https://github.com/user-attachments/assets/d4f543a8-fac7-428b-8072-b5b24e7e2155)

### View detail items on the same track order screen.
![image](https://github.com/user-attachments/assets/67546abb-c373-49ce-8fd3-4a684a2f8011)

##  5. Flow layout of Product Search Screen:
### Input Product Name and click search 
![image](https://github.com/user-attachments/assets/581ef9ef-b178-4c70-8696-f3d0424afa79)
### Show results
![image](https://github.com/user-attachments/assets/dae92f03-d03a-4c25-9e34-e50aee043e51)

# How to do it and source code of this project  
**How to run Chatbot AI: please view on the link below:**  
https://github.com/bdcuongvn83/product-app-react-nestjs/wiki/ChatbotAI%E2%80%90DialogFlow-ShoppingCart

Installation Guide
![image](https://github.com/user-attachments/assets/912db3d3-fb90-42aa-a791-e0b3d55e722a)

## Install node.js
1. https://nodejs.org/en/download
Node v22.11.0 (LTS)

## BackEnd:

1. clone this repository, move to folder backend
2. Open cmd in backend
3. npm install (install node.js firstly)

## FrondEnd:
1. clone this repository, move to folder frondend 
2. Open cmd in backend
3. npm install (install node.js firstly)
## set up database.
Install MySQL
### Link download: mySQL
https://dev.mysql.com/downloads/installer/

1. clone this repository, move to database folder.
2. Import structure sql in this database folder to My SQL database
![image](https://github.com/user-attachments/assets/5aa3c806-f8b9-4839-b12e-673adb394b4a)

## How to run
1. Firstly, run backend.
From cmd, move to folder backend
npm run start:dev
(run option start:dev, help us when change source code, source code will aumatically be builded.
(run with port 3001)
2. Run frondend
npm start
(run with port 3000)
3. Open browser, run url:
http://localhost:3000

![image](https://github.com/user-attachments/assets/1b91fbd5-12e8-48d4-af13-f31beb55df97)

Maybe, need to move link Product on Header, and register some your products, after that comeback link Home.

## Contributions  
Contributions are welcome! Please open an issue or submit a pull request.  

## structure source code:
### Backend structure:

![image](https://github.com/user-attachments/assets/f6f19c8e-fbd1-4745-84d6-d5dfccd4d77e)
Every module such as FileManage module : has controler and service.
Controler provide RestAPI for front end.
Register/update/delete Database : using FileManageService, insert/update/delete/query through Entity (mapping to Table via TypeORM)
### 1.a FileManageController
![image](https://github.com/user-attachments/assets/8cb20dae-f5b5-4166-a32b-238c69d06533)
### 1.b FileManageService
![image](https://github.com/user-attachments/assets/1097e4d5-414d-4ffb-bd3c-cb47aa73e772)
### 1.c Entity:
![image](https://github.com/user-attachments/assets/a6632f02-4951-484a-818f-7c5175aaa391)

### 1.d Setting connect MySQL:
![image](https://github.com/user-attachments/assets/9db439a4-cf61-431b-8005-e221d40fc136)

### Frondend structure:
![image](https://github.com/user-attachments/assets/a92e7267-5453-457c-aff9-082c392181b6)

### 1. Folder File: FileDownloadDisplay: component to display Image
### 2. Folder Orders: relating  Tracking Order (screens for user)
### 3. Folder Product: relating product management, add new/modify/delete product. (screens for Admin)
### 4. Folder Users: relating screen products, modal popup (screens for users: home page, select product to add cart bag, cart bag screen)


Author: [DUC CUONG BUI] Project: [school manage aspnetcore] GitHub Repository: [Repository URL] License: GPL License

GPL-3.0 License

Copyright (C) [2025] [DUC CUONG BUI]

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see http://www.gnu.org/licenses/.

