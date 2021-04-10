'use strict'

const TensorFlowService = use("App/Services/TensorFlowService");
const Train = use("App/Providers/Train");

let bagOfWords = {};
let allWords = [];
let vectors = [];
let wordReference = {};
const maxSentenceLength = 30;

class ChatPredict {

    async trainChatBot() {

        let train = new Train();
        let datasToLearn = await train.returnDatas();
        let questions = datasToLearn.map(question => question.Question);

        await questions.forEach(async (q) => {
            let words = q.replace(/[^a-z ]/gi, "").toLowerCase().split(" ").filter(x => !!x);
            words.forEach(w => {
                if (!bagOfWords[w]) {
                    bagOfWords[w] = 0;
                }
                bagOfWords[w]++;
            });
        });

        allWords = Object.keys(bagOfWords);
        allWords.forEach(async (w, i) => {
            wordReference[w] = i + 1;
        });

        let outputs = await this.tokenizer(questions);
        let tensorFlowService = new TensorFlowService()
        let trained = await tensorFlowService.train(allWords, maxSentenceLength, questions, vectors, outputs)
        return trained;
    }

    async tokenizer(questions) {

        await questions.forEach(async (q) => {
            let qVec = [];
            let words = q.replace(/[^a-z ]/gi, "").toLowerCase().split(" ").filter(x => !!x);
            for (let i = 0; i < maxSentenceLength; i++) {
                if (words[i]) {
                    qVec.push(wordReference[words[i]]);
                }
                else {
                    qVec.push(0);
                }
            }
            vectors.push(qVec);
        })

        let outputs = questions.map((q, index) => {
            let output = [];
            for (let i = 0; i < questions.length; i++) {
                output.push(i === index ? 1 : 0);
            }
            return output;
        });

        return outputs;

    }

    async chatbotResponse(parmas) {

        let qVec = [];
        let words = parmas.replace(/[^a-z ]/gi, "").toLowerCase().split(" ").filter(x => !!x);
        for (let i = 0; i < maxSentenceLength; i++) {
            if (words[i]) {
                qVec.push(wordReference[words[i]]);
            }
            else {
                qVec.push(0);
            }
        }
        let tensorFlowService = new TensorFlowService()
        let response = await tensorFlowService.textAnalizer(qVec)

        let train = new Train();
        let datas = await train.returnDatas();

        return { response: datas[response].Answer.Aliases[Math.floor((Math.random() * 5) + 1)]}
    }


}

module.exports = ChatPredict;