export default function CreatePost() {
  return (
    <div className="container-md">
      {/* Header */}
      <div className="row text-center">
        <h1>Create a post</h1>
      </div>

      {/* Form */}
      <div className="row justify-content-center">
        <form className="col-md-6">
          {/* Username */}
          <div className="mb-3">
            <label for="inputUsername" className="form-label">Username</label>
            <input type="text" className="form-control" id="inputUsername"/>
          </div>

          {/* Book title */}
          <div className="mb-3">
            <label for="inputBookTitle" className="form-label">Title</label>
            <input type="text" className="form-control" id="inputBookTitle"/>
          </div>

          {/* Book author */}
          <div className="mb-3">
            <label for="inputBookAuthor" className="form-label">Author</label>
            <input type="text" className="form-control" id="inputBookAuthor"/>
          </div>

          {/* Text */}
          <div class="mb-3">
            <label for="inputText" class="form-label">Text</label>
            <textarea class="form-control" id="inputText" rows="10"></textarea>
          </div>

          {/* Submit button */}
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
}