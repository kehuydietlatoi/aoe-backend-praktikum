let fs = require('fs');
let parser = require('xml2json');
const {Record} = require("./model/Record");
const {Track} = require("./model/Track");

/**
 * get all release match given conditions
 * @param minTracksNumber min number of tracks
 * @param date the release date need to be sooner than param date
 * @param data our current data set/list
 * @returns {[]} array of matched Record obj
 */
function getReleaseQuery(minTracksNumber, date, data) {
    let res = []
    for ( let i = 0; i < data.length; i++){
        if (data[i].isBefore(date) && (data[i].trackListing.length >= minTracksNumber)) {
            res.push(data[i]);
        }
    }
    return res;
}

/**
 * read and convert xml file to list of records
 * @param filename name of source xml
 * @returns {Promise<[]>}
 */
async function init(filename){
    let recordList = [];
    let text = fs.readFileSync( './data/'+filename);
    let json = JSON.parse(parser.toJson(text, {reversible: true}));
    let records = json["records"]["record"];
    for ( let i = 0; i < records.length; i++){
        let cur = new Record();
        cur.title = records[i]["title"]['$t'];
        cur.name = records[i]["name"]['$t'];
        cur.genre = records[i]["genre"]['$t'];
        cur.release = new Date(records[i]["releasedate"]['$t']);
        cur.label = records[i]["label"]['$t'];
        cur.format = records[i]["formats"]['$t'];
        let tracklist = records[i]["tracklisting"]["track"];
        cur.trackListing = [];
        for (const tracklistKey in tracklist) {
            cur.trackListing.push(tracklist[tracklistKey]['$t']);
        }
        recordList.push(cur);
    }
    return recordList;
}

/**
 * export data obj to xml with format as "aufgabe"
 * @param listObj
 */
function exportXml(listObj){
    let builder = require('xmlbuilder');
    let xml = builder.create('matchingRelease')
    for ( let i = 0; i < listObj.length; i++){
        xml.ele('release').ele('name',listObj[i].name).up().ele('trackCount',listObj[i].trackListing.length);
    }
    xml.end();
    fs.writeFileSync('./data/queriedData.xml', xml.end({ pretty: true }));
}
async function main (){
    const list = await init('worldofmusic.xml');
    const res = (getReleaseQuery(10, new Date('2001-01-01'), list));
    exportXml(res);
}
main();
//let res = (getReleaseQuery(10, new Date('2001-01-01'), list));
module.exports= {init,getReleaseQuery}