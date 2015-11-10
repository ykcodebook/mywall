/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	display: function (req, res) {

		var Filesystem = require('machinepack-fs');

		var filePath = process.env.PWD + '/data/resume.json';

		// Read and parse JSON file located at source path on disk into usable data.
		Filesystem.readJson({
			source: filePath,
			schema: '*',
		}).exec({
			// An unexpected error occurred.
			error: function (err){
			 sails.log(err);
			},
			// No file exists at the provided `source` path
			doesNotExist: function (){
			 sails.log("does not exist");
			},
			// Could not parse file as JSON.
			couldNotParse: function (){
			 sails.log("parse error");
			},
			// OK.
			success: function (data){
			 	return res.view('homepage',{resume: data});
			},
		});
	}
};

