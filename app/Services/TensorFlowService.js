'use strict';
const tf = require('@tensorflow/tfjs');
require('tfjs-node-save');

class TensorFlowService {

    async train(allWords, maxSentenceLength, questions, vectors, outputs) {

        console.log(allWords)
        console.log(maxSentenceLength)
        console.log(questions)
        console.log(vectors)
        console.log(outputs)

        const model = tf.sequential();

        model.add(tf.layers.embedding({ inputDim: allWords.length + 1, outputDim: 128, inputLength: maxSentenceLength, maskZero: true }));
        model.add(tf.layers.simpleRNN({ units: 32 }));
        model.add(tf.layers.dense({ units: 50 }));
        model.add(tf.layers.dense({ units: 25 }));
        
        model.add(tf.layers.dense({
            units: questions.length,
            activation: "softmax"
        }));

        model.compile({
            optimizer: tf.train.adam(),
            loss: "binaryCrossentropy",
            metrics: ["accuracy"]
        });

        const xs = tf.stack(vectors.map(x => tf.tensor1d(x)));
        const ys = tf.stack(outputs.map(x => tf.tensor1d(x)));
        await model.fit(xs, ys, {epochs: 20, shuffle: true,});

        let response = await this.salvar(model);
        return response;

    }

    async salvar(model) {
        const salvo = await model.save('file://./public/brain');
        if (salvo) return true;
        else return false;
    }

    async textAnalizer(exection) {
        let model = await tf.loadLayersModel(`file://./public/brain/model.json`);
        let prediction = await model.predict(tf.stack([tf.tensor1d(exection)])).data();
        let id = prediction.indexOf(Math.max(...prediction));
        return id;
    }

}

module.exports = TensorFlowService;