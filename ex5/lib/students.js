function Students(db){
	this.db = db;
};

Students.prototype.save = function(data){
	var self = this;
	return new Promise (function (resolve, reject){
		self.db.students.save(data, function (err, doc){
			if (err) reject(err);
			else resolve(doc);
		});
	});
}

Students.prototype.get = function (){
	var self = this;
	return new Promise(function(resolve, reject){
		self.db.students.find({},{}, function (err, docs){
			if (err) reject(err);	
			else resolve(docs);
		})
	});
}

module.exports = Students;