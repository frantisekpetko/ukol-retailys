const fs = require('fs');
const fsExtra = require('fs-extra');
const { resolve } = require('path');
const axios = require('axios');
const xml2js = require('xml2js');
const unzipper = require('unzipper');
const express = require('express')
const cors = require('cors')
const fspromises = require('fs').promises;

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

const downloadZip = (url, zip_path) =>
    axios({
        url,
        responseType: 'stream',
    }).then(
        (response) =>
            new Promise((resolve, reject) => {
                var stream = response.data.pipe(
                    fs.createWriteStream(zip_path).on('finish', () => resolve())
                        .on('error', (e) => reject(e))
                );
            }),
);


async function getExportFullData() {
    try {
        await downloadZip(
            `http://www.astramodel.cz/b2b/export_xml_PSs6t5prnOYaHfTOUI-6XNF6m.zip`,
            resolve(`./export.zip`),
        );


        fs.createReadStream('./export.zip')
            .pipe(unzipper.Parse())
            .on('entry', (entry) => {
                var fileName = entry.path;
                var type = entry.type;

 
                if (/\/$/.test(fileName)) {
                    console.log('[DIR]', fileName, type);
                    return;
                }

                entry.pipe(fs.createWriteStream('./' + fileName));


                
        })

        await sleep(1000);

        const xml = fs.readFileSync(
            './export_full.xml',
            'utf8',
        ).toString();


        //console.log(xml);


        xml2js.parseString(xml, (err, result) => {
            if (err) {
                throw err;
            }

            let json = JSON.stringify(result, null, 4);

            fs.writeFileSync(
                './export_full.json',
                json,
                'utf8',
            );
        });

        var app = express();

        var corsOptions = {
            origin: 'http://localhost:3000',
            optionsSuccessStatus: 200
        }

        app.use(cors(corsOptions))


        app.get('/api/export-full', function (req, res) {
            const json = fsExtra.readJsonSync(
                './export_full.json',
                'utf8',
            );

            res.json(json.export_full.items[0]);
        })

        const port = 4000;

        app.listen(port, () => {
            console.log(`App listening on port ${port}`);
        })
    }
    catch (e) {
        console.log('Error: ', e)
    };
}

getExportFullData();


