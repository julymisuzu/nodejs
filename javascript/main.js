$(function() {
  // load all the books results
  getBooksList();

  function successCallout(message) {
    $('#successCallout').fadeIn(400);
    $('#successMessage').html(message);

    setTimeout(function() {
      $('#successCallout').fadeOut(400);
    }, 2000);
  }

  function errorCallout(message) {
    $('#errorCallout').fadeIn(400);
    $('#errorMessage').html(message);

    setTimeout(function() {
      $('#errorCallout').fadeOut(400);
    }, 2000);
  }

  // when a new book is created
  $('#createForm').on('submit', function(formData) {
    formData.preventDefault();

    var formType = formData.target[0].value;
    var bookId = formData.target[1].value;
    var bookName = formData.target[2].value;
    var authorName = formData.target[3].value;

    if(bookName !== "" && authorName !== "") {
      var books = { id: bookId, book: bookName, author: authorName };
      if(formType === "edit" && bookId) {
        $.post('/books/edit', books).done(function() {
          $('#bookId, #formType, #bookName, #authorName').val('');
          $('#cancelEdit').hide();
          $('#saveEdit').hide();
          $('#submitForm').show();
          getBooksList();
          successCallout('The book has been edited');
        }).fail(function(xhr, textStatus, errorThrown) {
          errorCallout(xhr.responseText);
        });
      } else {
        $.post('/books/create', books).done(function() {
          $('#bookId, #formType, #bookName, #authorName').val('');
          getBooksList();
          successCallout('The book has been created!');
        }).fail(function(xhr, textStatus, errorThrown) {
          errorCallout(xhr.responseText);
        });
      }
    }
  });

  $('#cancelEdit').on('click', function() {
    $('#bookId, #formType, #bookName, #authorName').val('');
    $('#cancelEdit').hide();
    $('#saveEdit').hide();
    $('#submitForm').show();
  });

  function getBooksList() {
    $.get('/books', function(data) {
      var li = {}, h4, p, edit, remove;
      var dataJSON = JSON.parse(data);

      dataJSON.livros.forEach(function(item, key) {
        // create a dynamic list item
        li[key] = $("<li />", { class: "grid-x grid-padding-x" })[0];
        h4 = $("<h4 />", { text: item.name, class: "medium-12 cell" })[0];
        p = $("<p />", { text: item.author, class: "medium-12 cell" })[0];

        editForm = $('<form />', { name: 'editForm-'+key, 
                                   class: 'editForm', 
                                   action: '/books/edit', 
                                   method: 'post' });
        editFormBook = $('<input />', { type: 'text', name: 'editBookName', value: item.name })[0];
        editFormAuthor = $('<input />', { type: 'text', name: 'editAuthorName', value: item.author })[0];
        editFormSave = $('<input />', { type: 'submit', value: 'Save', class: 'button' })[0];

        edit = $("<a />", { text: "Edit", 
                            class: "medium-2 cell", 
                            "data-id": key, 
                            "data-book": item.name, 
                            "data-author": item.author });
        edit.on('click', function(key) {
          var id = event.currentTarget.dataset.id;
          var book = event.currentTarget.dataset.book;
          var author = event.currentTarget.dataset.author;

          $('#bookId').val(id);
          $('#formType').val("edit");
          $('#bookName').val(book);
          $('#authorName').val(author);
          $('#cancelEdit').show();
          $('#saveEdit').show();
          $('#submitForm').hide();
        });

        remove = $("<a />", { text: "Remove", "data-id": item.id, class: "medium-3 cell" });
        remove.on('click', function(event) {
          var id = event.currentTarget.dataset.id;

          $.post('/books/remove', {bookId: id}).success(function() {
            getBooksList();
            successCallout('The book has been removed from the list');
          });
        });

        editForm.on('submit', function(formData) {
          formData.preventDefault();
      
          var bookName = formData.target[0].value;
          var authorName = formData.target[1].value;

          if(bookName !== "" && authorName !== "") {
            var books = { book: bookName, author: authorName };
            $.post('/books/edit', books).success(getBooksList);
          }
        });

        $(editForm).append(editFormBook)
                   .append(editFormAuthor)
                   .append(editFormSave)
                   .hide();
        $(li[key]).append(h4)
                  .append(p)
                  .append(editForm)
                  .append(edit)
                  .append(remove)
                  .append($("<hr />", { class: "medium-12" })[0]);
      });

      $('#results').html(li);
    }).fail(function(xhr, textStatus, errorThrown) {
      errorCallout(xhr.responseText);
    });
  }

});