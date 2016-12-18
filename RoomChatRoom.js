function Room(name,id,owner){
	this.name = name;
	this.id = id;
	this.owner = owner
	this.people = [];
}

Room.prototype.addPerson = function(personID){
	this.people.push(personID);
};

module.exports = Room;