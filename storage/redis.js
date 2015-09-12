var Redis = function(){
    this.entities = {};

    this.get = function(collection, key){
        // check collection
        if(this.entities.hasOwnProperty(collection) == false)
            return null;
        // check item in collection
        var entities = this.entities[collection];
        if (entities.hasOwnProperty(key) == false)
            return [];
        // return list
        return entities[key];
    };
    this.set = function(collection, key, value){
        // check collection
        if(this.entities.hasOwnProperty(collection) == false)
            this.entities[collection] = {};
        this.entities[collection][key] = [value];
    };
    this.push = function(collection, key, item){
        // check collection
        if(this.entities.hasOwnProperty(collection) == false)
            this.entities[collection] = {};
        // array must flow
        var entities = this.entities[collection];
        if (entities.hasOwnProperty(key) == false)
            entities[key] = [];
        // add to array
        entities[key].push(item);
    };
};

module.exports = new Redis();