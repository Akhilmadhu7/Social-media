import React from "react";

function Post() {
  const a = [1, 2, 3, 4, 5, 6, 7, 7, 8, 9];
  return (
    <div className="pb-8">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-8 bg-white">
        <div className="text-center pb-12">
          {/* <h2 className="text-base font-bold text-indigo-600">
            We have the best equipment in the market
        </h2> */}
          <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-gray-900">
            Posts
          </h1>
          <hr />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div className="w-full bg-white rounded-lg sahdow-lg overflow-hidden flex flex-col md:flex-row">
            <div className="w-full h-80">
              <img
                className="object-center object-cover w-full h-full "
                src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
                alt="photo"
              />
            </div>
          </div>

          <div className="w-full bg-white rounded-lg sahdow-lg overflow-hidden flex flex-col md:flex-row">
            <div className="w-full h-80">
              <img
                className="object-center object-cover w-full h-full"
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
                alt="photo"
              />
            </div>
          </div>
          <div className="w-full bg-white rounded-lg sahdow-lg overflow-hidden flex flex-col md:flex-row">
            <div className="w-full h-80">
              <img
                className="object-center object-cover w-full h-full"
                src="https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1176&q=80"
                alt="photo"
              />
            </div>
          </div>
          <div className="w-full bg-white rounded-lg sahdow-lg overflow-hidden flex flex-col md:flex-row">
            <div className="w-full h-80">
              <img
                className="object-center object-cover w-full h-full"
                src="https://images.unsplash.com/photo-1500048993953-d23a436266cf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1169&q=80"
                alt="photo"
              />
            </div>
          </div>
          <div className="w-full bg-white rounded-lg sahdow-lg overflow-hidden flex flex-col md:flex-row">
            <div className="w-full h-80">
              <img
                className="object-center object-cover w-full h-full"
                src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
                alt="photo"
              />
            </div>
          </div>
          <div className="w-full bg-white rounded-lg sahdow-lg overflow-hidden flex flex-col md:flex-row">
            <div className="w-full h-80">
              <img
                className="object-center object-cover w-full h-full"
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
                alt="photo"
              />
            </div>
          </div>
          <div className="w-full bg-white rounded-lg sahdow-lg overflow-hidden flex flex-col md:flex-row">
            <div className="w-full h-80">
              <img
                className="object-center object-cover w-full h-full"
                src="https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1176&q=80"
                alt="photo"
              />
            </div>
          </div>
          <div className="w-full bg-white rounded-lg sahdow-lg overflow-hidden flex flex-col md:flex-row">
            <div className="w-full h-80">
              <img
                className="object-center object-cover w-full h-full"
                src="https://images.unsplash.com/photo-1554151228-14d9def656e4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=686&q=80"
                alt="photo"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Post;
