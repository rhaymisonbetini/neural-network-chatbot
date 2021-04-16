'use strict'

const fs = require('fs');
const Helpers = use('Helpers')

class WriteBrainService {

    async writeBrain(wordReference, fileName) {
        fs.writeFileSync(Helpers.publicPath(`brain/${fileName}`), JSON.stringify(wordReference));
        return;
    }

    async readBrainBin(fileName) {
        let classification = fs.readFileSync((Helpers.publicPath(`brain/${fileName}`, { encoding: 'utf8' })));
        return JSON.parse(classification.toString().trim());
    }

}

module.exports = WriteBrainService;