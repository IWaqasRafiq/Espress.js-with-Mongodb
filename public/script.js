const formWrapper = document.querySelector(".formbold-form-wrapper");
const formActionButton = document.querySelector(".formbold-action-btn");
function chatboxToogleHandler() {
  formWrapper.classList.toggle("active");
  formActionButton.classList.toggle("active");
}

window.createPost = function () {

    let postTitle = document.querySelector("#postTitle").value;
    let postText = document.querySelector("#postText").value;
    let postDes = document.querySelector("#postDescription").value;

    // baseUrl/api/v1/post
    axios.post(`/api/v1/post`, {
        title: postTitle,
        text: postText,
        description: postDes,
    })
        .then(function (response) {
            console.log(response.data);
            document.querySelector("#result").innerHTML = response.data;
            getAllPost();
        })
        .catch(function (error) {
            // handle error
            console.log(error.data);
            document.querySelector("#result").innerHTML = "error in post submission"
        })
}

window.getAllPost = function () {


    // baseUrl/api/v1/post
    axios.get(`/api/v1/posts`)
        .then(function (response) {
            console.log(response.data);


            let postsHtml = ``

            response.data.map((eachPost) => {
                postsHtml +=
                    // `<div id='card-${eachPost._id}' class="post-card">
                    //     <h3>${eachPost.title}</h3>
                    //     <p> ${eachPost.text} </p>
                    //     <button onclick="delPost('${eachPost._id}')">Delete</button>
                    //     <button onclick="editPost('${eachPost._id}','${eachPost.title}','${eachPost.text}', )">Edit</button>
                    // </div> 
                    // <br />`
                    `\
                    <tbody id='card-${eachPost._id}' class="post-card">\
                    <tr>\
                        <td>\
                            <div class="user-info">\
                                <div class="user-info__basic">\
                                    <h5 class="mb-0">${eachPost.title}</h5>\
                                </div>\
                            </div>\
                        </td>\
                        <td>${eachPost.text}</td>\
                        <td>${eachPost.description}</td>\
                        <td>\
                            <div class="dropdown open">\
                                <a href="#!" class="px-2" id="triggerId1" data-toggle="dropdown" aria-haspopup="true"\
                                    aria-expanded="false">\
                                    <i class="fa fa-ellipsis-v"></i>\
                                </a>\
                                <div class="dropdown-menu" aria-labelledby="triggerId1">\
                                <a class="dropdown-item" href="#" ><i class="fa fa-pencil mr-1"><button onclick="editPost('${eachPost._id}','${eachPost.title}','${eachPost.text}','${eachPost.description}' )"></button></i> Edit</a>\
                                <a class="dropdown-item text-danger"  href="#"><i class="fa fa-trash mr-1"><button onclick="delPost('${eachPost._id}')"></button></i>Delete</a>\
                                </div>\
                            </div>\
                        </td>\
                    </tr>\

                </tbody>\`
            })


            document.querySelector("#posts").innerHTML = postsHtml
        })
        .catch(function (error) {
            // handle error
            console.log(error.data);
            document.querySelector("#result").innerHTML = "error in post submission"
        })
}


window.delPost = function (postId) {

    console.log("delete: ", postId);


    // baseUrl/api/v1/post
    axios.delete(`/api/v1/post/${postId}`)
        .then(function (response) {
            console.log(response.data);

            getAllPost();
        })
        .catch(function (error) {
            // handle error
            console.log(error.data);
            document.querySelector("#result").innerHTML = "error in post deletation"
        })
}

window.editPost = (postId, title, text, description) => {

    console.log("delete: ", postId);

    document.querySelector(`#card-${postId}`).innerHTML =
        `<form onsubmit="savePost('${postId}')">
            title: <input type='text' value='${title}' id='title-${postId}' />
            <br/>
            text: <input type='text' value='${text}' id='text-${postId}' />
            <br/>
            description: <input type='text' value='${description}' id='description-${postId}' />
            <br/>
            <button>Save</button>

        </form>`
}
window.savePost = (postId) => {
    const updatedTitle = document.querySelector(`#title-${postId}`).value;
    const updatedText = document.querySelector(`#text-${postId}`).value;
    const updatedDescription = document.querySelector(`#description-${postId}`).value;

    axios.put(`/api/v1/post/${postId}`, {
        title: updatedTitle,
        text: updatedText,
        description: updatedDescription
    })
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            // handle error
            console.log(error.data);
            document.querySelector("#result").innerHTML = "error in post saving"
        })

}
let postW = document.getElementsByClassName('pop-up')[0];

function post(e) {
    e.classList.toggle('pop-show');
  }
