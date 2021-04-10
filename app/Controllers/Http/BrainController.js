'use strict'

const ChatPredict = use("App/Cortex/ChatPredict");

class BrainController {

    async train({ response }) {

        try {

            let chatPredict = new ChatPredict();
            let learned = await chatPredict.trainChatBot();

            if (learned) {
                return response.status(200).send({ message: 'Ashiley learned' });
            } else {
                return response.status(406).send({ message: 'NOT ACCEPTABLE' })
            }


        } catch (e) {
            console.log(e);
            return response.status(500).send(e);
        }

    }

    async chatbot({request, response}){

        try {

            let question = request.all();
            console.log(question);

            let chatPredict = new ChatPredict();
            let chatBotResponse = await chatPredict.chatbotResponse(question.question);

            if (chatBotResponse) {
                return response.status(200).send(chatBotResponse);
            } else {
                return response.status(406).send({ message: 'NOT ACCEPTABLE' })
            }


        } catch (e) {
            console.log(e);
            return response.status(500).send(e);
        }
    }

}

module.exports = BrainController