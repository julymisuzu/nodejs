$(function() {
  // load all the books results
  getBooksList();

  // when a new book is created
  $('form').on('submit', function(formData) {
    formData.preventDefault();

    var bookName = formData.target[0].value;
    var authorName = formData.target[1].value;

    if(bookName !== "" && authorName !== "") {
      var books = { book: bookName, author: authorName };
      $.post('/books/create', books).success(getBooksList);
    }
  });

  /*$('#orderByAuthor').on('click', function() {
    $.get('/books', function(data) {
      var li = {}, h4, p;
      var dataJSON = JSON.parse(data);

      var authorList = {};

      // debugger;

      var test = new Array();
      dataJSON.livros.forEach(function(item, key) {
        console.log(item.author);
        console.log(test[item.author]);
        // debugger;
        var list = test[item.author];
    
        if(list) {
          list.push(item.name);
        } else {
          test[item.author] = new Array(item.name);

          li[test.indexOf(item.author)] = document.createElement("li");

          h4 = document.createElement("h4");
          h4.appendChild(document.createTextNode(item.author));
          li[test.indexOf(item.author)].appendChild(h4);
        }

        span = document.createElement("span");
        span.appendChild(document.createTextNode(item.name));
        li[test.indexOf(item.author)].appendChild(span);
      });
      
      console.log(test, li);

      // dataJSON.livros.forEach(function(item, key) {
      //   var list = authorList[item.author];

      //   if(list) {
      //     list.push(item.name);
      //   } else {
          
      //     authorList[item.author] = [item.name];
      //   }

      //   // p.appendChild(document.createTextNode(item.name));
      //   // li[key].appendChild(p);
      // });

      // console.log(authorList);
      // console.log(li);

      // debugger;

      // dataJSON.livros.forEach(function(item, key) {
      //   // create a dynamic list item
      //   li[key] = document.createElement("li");
      //   h4 = document.createElement("h4");
      //   span = document.createElement("span");
      //   // set a value
      //   h4.appendChild(document.createTextNode(item.name));
      //   span.appendChild(document.createTextNode(item.author));
      //   li[key].appendChild(h4);
      //   li[key].appendChild(span);

      // });

      // $('#results').html(li);
    });
  });*/

  function getBooksList() {
    $.get('/books', function(data) {
      var li = {}, h4, p, edit, remove;
      var dataJSON = JSON.parse(data);

      dataJSON.livros.forEach(function(item, key) {
        // debugger;
        // create a dynamic list item
        li[key] = $("<li />", { class: "grid-x grid-padding-x" })[0];
        h4 = $("<h4 />", { text: item.name, class: "medium-12 cell" })[0];
        p = $("<p />", { text: item.author, class: "medium-12 cell" })[0];
        edit = $("<a />", { text: "Edit", class: "medium-2 cell" });
        edit.on('click', function(key) {
          console.log(key);
        });
        remove = $("<a />", { text: "Remove", "data-id": item.id, class: "medium-3 cell" });
        remove.on('click', function(event) {
          var id = event.currentTarget.dataset.id;

          $.post('/books/remove', {bookId: id}).success(getBooksList);
        });

        $(li[key]).append(h4)
                  .append(p)
                  .append(edit)
                  .append(remove)
                  .append($("<hr />", { class: "medium-12" })[0]);
      });

      $('#results').html(li);
    });
  }

});