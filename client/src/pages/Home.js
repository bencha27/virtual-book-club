import React from 'react';

export default function Home() {
  return (
    <div className="container-md">
      {/* Header */}
      <div className="row text-center">
        <h1 className="my-5">Virtual Book Club</h1>
      </div>

      <div className="row text-center my-3">
        <p className="fs-3 fw-light lh-1">An online community where we</p>
        <p className="fs-3 fw-light lh-1">share, connect, and learn with others</p>
        <p className="fs-3 fw-light lh-1">in our love of books</p>
      </div>

      <div className="row text-center my-5">
        <p className="fs-3 fw-lighter">Click on one of the links above to get started!</p>
      </div>

    </div>

  );
}