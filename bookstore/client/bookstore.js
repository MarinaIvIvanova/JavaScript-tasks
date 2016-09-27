$(document).ready(function() {
    var nextId = 0;
    var books = [];
    var countPurchaseBooks = 0;
    var numPages = 0;
    addBook = function(book) {   
    	if (nextId == 0) {
    		$("<tr>").appendTo(".booksContainer");
    	}
    	books.push(book);
    	book.id = nextId;
	   $("#bookTemplate").tmpl(book).appendTo(".booksContainer");
	   
	   if (nextId % 3 == 2) {
		   $("</tr>").appendTo(".booksContainer");
		   $("<tr>").appendTo(".booksContainer");
	   	}
	    	 
	   nextId += 1;
	   
    };
    
    $(document).on('click', '.addToCart', function(){
    	var bookToAdd = $(this).closest('.book');
    	var id = bookToAdd.attr('id');    	
    	$('#purchaseTemplate').tmpl(books[id]).appendTo('.purchaseBooksContainer');
    	
    	countPurchaseBooks += 1;
    	numPages += books[id].num_pages;
    	$('.cartInfo > p').text('Total number of pages in cart: ' + numPages);
    	if (countPurchaseBooks % 3 == 0) {
    		$('<br>').appendTo('.purchaseBooksContainer');
    	}
    
    });
    
    $(document).on('click', '.removeFromCart', function(){
    	var bookToAdd = $(this).closest('.book');
    	var id = bookToAdd.attr('id');
    	bookToAdd.remove();
    	
    	numPages -= books[id].num_pages;
    	$('.cartInfo > p').text('Total number of pages in cart: ' + numPages);    	
    	
    });
    
    $(document).on('click','.description', function(){
    	var bookForDescription = $(this).closest('.book');
    	var id = bookForDescription.attr('id');    	
    	$('#descriptionTemplate').tmpl(books[id]).appendTo('.descriptionBook');
   
    	$('.modal').last().modal({
    		show: true
    	});
    	
    	$('.modal').last().prev().remove();
    });
	
  
$.getJSON('http://localhost:1337/books', function(books) {
		books.forEach(addBook);
	
	});
});

