# CHATBOT NEURAL-NETWORK
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![version](https://img.shields.io/badge/version-1.0.0-blue)

![alt text](https://chatbotmaker.io/wp-content/uploads/ia-e-chatbots.png)

CHATBOT NEURAL-NETWORK is an open source project developed with RNA aimed at automating chat processes in systems.<br/>

Every system runs on top of Google's powerful TensorFlow and the Adonis.js Framework (with node.js).<br/>

Without a database dependency, all brain models and files are stored in Binary.<br/>

![alt text](https://raw.githubusercontent.com/rhaymisonbetini/neural-network-chatbot/main/public/print/print.jpg)

# 1 HOW TO INSTALL

```
git clone
```
```
cd project-name
```
```
npm install
```

```
adonis serve --dev
```
Your chatbot will start at localhost on port 3333

# 2 HOW TO TRAIN YOUR CHATBOT

This is a very cool step in our system.
inside ```/app/Providers/Train.js /``` there is our Train class.<br/>
It has a method called returnDatas ().<br/>
This is our method that returns all questions with their answers so that our system does all the training.<br/>

An array of objects will be returned that should contain the phrase that our chat should learn and the possible answers that exist for that phrase.
<b>It is very important that each sentence had 5 and only 5 answer alternatives.<b/><br/>
```javascript
async returnDatas() {
        return [
            {
                Question: "Olá",
                Answer: {
                    Aliases: [
                        "Ei,tudo bem?",
                        "Ola,tudo bem?",
                        "Ei como vai voce?",
                        "Oi, tudo bem?",
                        "Que bom que voce veio, ola!",
                    ],
                },
            }
        ]
  }
```
Perfect. Now we must define our training times ... The more times, the greater the number of neural connections in our network. <br/>
Inside of ```/app/Services/TensorFlowService.js``` existe o seguinte metodo do nosso TensorFlow:
```javascript 
await model.fit(xs, ys, {epochs: 100, shuffle: true,});
```
Change the times to the quantity you want. The greater the processing of your machine, the faster the training will be. <br/>
Initially configured for 100 times. <br/>
  
Okay, now with our phrases and responses defined, let's call the following training route:
```javascript
Route.get('/train', 'BrainController.train');
```

After the training, 3 files will be generated within ```/public/brain/```
* model.json ( TensorFlow)
* weights.bin ( TensorFlow)
* wordReference.bin ( TensorFlow)

These files are basically the brain of our application. Whenever you send a sentence, our chatbot will load <br/>
your model to process and give you the best answer.

# 3 TALKING WITH OUR CHATBOT

You must initially call the route below with the POST verb

```javascript
Route.post('/chatbot', 'BrainController.chatbot');
```
Ok, remember to put the phrase in your call with the name of QUESTION so that it is interpreted by our <br/>
controller and sent to our chat. The method below exemplifies

```javascript
let question = request.all();
let chatPredict = new ChatPredict();
let chatBotResponse = await chatPredict.chatbotResponse(question.question);
```

Okay, now just wait for the answers from our RNA.

# 4 production environment

To run our AI in a production environment to validate our images and texts, we follow the steps below:

initially install PM2:
```
npm install pm2 -g
```
All right, now we must configure our AI. Our .env file must have the following characteristics

```
HOST=0.0.0.0
PORT=3333
NODE_ENV=production 
APP_URL=http://${HOST}:${PORT}
CACHE_VIEWS=false
APP_KEY=DgtuWIF6DlJq1UK4NjPlqwecPCzbvbfm

DB_CONNECTION=sqlite
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_DATABASE=adonis

SESSION_DRIVER=cookie
HASH_DRIVER=bcrypt

```
Now we are going to generate a new APP_KEY for our AI (in the future it will be used for authentication on our system).

```
 adonis key:generate
```

Okay, now it's time to get our AI to run.
Within the root folder of the system, execute the command:

```
pm2 start server.js --name
```
Now run the command to see if everything is running:

```
pm2 list
```

All right, now just start validating the images and texts sent to your system

# 5 Authentication system
* Development
