import React from "react";

function Team() {
  return (
    <div className="container">
      <div className="row p-3  border-top ">
        <h1 className="text-center">People</h1>
      </div>
      <div
        className="row p-5 text-muted"
        style={{ lineHeight: "1.8em", fontSize: "1.2em" }}
      >
        <div className="col-6 col-sm-12  p-3  text-center ">
          <img
            src="/media/images/myImage.jpg"
            style={{ width: "350px" ,height: "300px",borderRadius:"50%",marginBottom:"10px"} }
            alt=""
          />
          <h5>Nishant Kumar Rawani</h5>
          <h6 className="text-muted">Founder</h6>
        </div>
        <div className="col-6 p-3 col-sm-12">
          <p>
            My name is Nishant Kumar Rawani and I am pursuing a Diploma in
            Computer Science Engineering at Silli Polytechnic, Silli. 
            I am
            passionate about technology, coding, and solving problems through
            innovative ideas. I have knowledge of Python, Java, HTML, CSS,
            JavaScript, and React JS. Currently, I am also learning backend
            development with Node.js and Express to strengthen my full-stack
            skills.
            </p>
            
        </div>
      </div>
    </div>
  );
}

export default Team;
