class Record {
    constructor(title, name, genre, release, label, format, trackListing) {
        this.title = title;
        this.name = name;
        this.genre = genre;
        this.release = release;
        this.label = label;
        this.format = format;
        this.trackListing = trackListing;
    }
    isBefore(date){
        return (date > this.release);
    }
}
module.exports= {Record}