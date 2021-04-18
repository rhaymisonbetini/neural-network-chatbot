# CHATBOT NEURAL-NETWORK
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![version](https://img.shields.io/badge/version-1.0.0-blue)

![alt text](https://chatbotmaker.io/wp-content/uploads/ia-e-chatbots.png)

CHATBOT NEURAL-NETWORK is an open source project developed with RNA aimed at automating chat processes in systems.<br/>

Every system runs on top of Google's powerful TensorFlow and the Adonis.js Framework (with node.js).<br/>

Without a database dependency, all brain models and files are stored in Binary.<br/>

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


