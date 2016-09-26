"use strict";

$(document).ready(function() {
	
	var studentsList = [],	
	generateTableHead = function(table, properties) {
		table.append([ '<thead>', '<tr>', '<th>',
		               properties.join('</th><th>'), '</th>', '</tr>',
		               '</thead>' ].join(''));
	},
	generateTable = function(items, parentNode) {
		var table = $('<table class="table"></table>'),
			tbody = $('<tbody></tbody');
		
		generateTableHead(table, ['id', 'name', 'course']);
		items.forEach(function (item) {
			var row = $('<tr><td>' + [item.id, item.name, item.course].join('</td><td>') + '</td></tr>');
			
			tbody.append(row);
		});
		table.append(tbody);
		parentNode.append(table);
		
	};
	
	 $.getJSON('http://localhost:1335/students', function(students) {
		 	var row = $('<div class="row"></div>');
			studentsList = students;
			$('.table-container').append(row);
			generateTable(studentsList, row);
		});


  $("#group-btn").on("click", function() {
	 var tableContainer = $('.table-container'),
	 	 groupedStudents = groupBy(studentsList, 'course'),
	 	 counter = 0,
	 	 row, col;
	 tableContainer.empty();
	 
	 for (var group in groupedStudents) {
		 if (counter % 3 === 0) {
             row = $('<div class="row"></div>');
             tableContainer.append(row);
         }
		 col = $('<div class="col-xs-4"></div>');
         generateTable(groupedStudents[group], col);
         row.append(col);
         counter+=1;
	 }
  });
  
  $("#search-btn").on("click", function() {
	  $('.success').removeClass('success');
	    var searched = $("#search-box").val();  
	    $('table tr').each(function(index) {
	    	var row = $(this);
	    	
	    	var name = row.find("td:nth-child(2)").text();
	    	
	    	if (name.search(searched) != -1) {
	    		row.addClass('success');
	    	}
	    	
	    })
	   
	  });

  var groupBy = function(objects, val) {
	  var sortedObj = {};	  
	  objects.forEach(function(obj){
		  console.log(obj.val in sortedObj == true);
		  if (sortedObj[obj[val]]) {
			  sortedObj[obj[val]].push(obj);
		  }
		  else {
			  sortedObj[obj[val]] = [obj];
		  }
		  
	  });
	  
	  return sortedObj;
  }		 

});