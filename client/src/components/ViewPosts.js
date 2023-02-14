export default function ViewPosts() {
  return (
    <div className="container-md">
      {/* Header */}
      <div className="row text-center">
        <h1>View all posts</h1>
      </div>

      {/* Cards */}
      <div className="row justify-content-center">
        <div className="card col-md-8 my-3">
          <div className="card-body">
            <h5 className="card-title">Book Title by Book Author</h5>
            <h6 className="card-subtitle mb-2 text-muted">Username</h6>
            <p className="card-text">This is my review of the book.</p>
          </div>
        </div>

        <div className="card col-md-8 my-3">
          <div className="card-body">
            <h5 className="card-title">Book Title by Book Author</h5>
            <h6 className="card-subtitle mb-2 text-muted">Username</h6>
            <p className="card-text">This is my review of the book.</p>
          </div>
        </div>
      </div>

    </div>
  );
}