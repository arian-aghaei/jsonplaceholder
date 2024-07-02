let res = []

async function fetchData() {
    let data = await fetch('https://jsonplaceholder.typicode.com/posts')
    let success = await data.json()
    return success;

}

let chk = [];

function repeated(number) {
    if (chk.includes(number)) {
        return false;
    }
    chk.push(number);
    return true;
}

async function load(userid) {

    let data = ''
    show('please wait..')
    res = await fetchData();
    // console.log(res)
    // console.log(res[0])
    // res.forEach(item => {
    //     // console.log(item.filter( () => {
    //     //     if (chk.includes(item.userId)){
    //     //         return false;
    //     //     }
    //     //     chk.push(item.userId);
    //     //     return true;
    //     // } ))
    //
    //     // console.log(item.userId)
    //
    //
    // })
    // console.log(res.filter((item) => {
    //     if (chk.includes(item.userId)) {
    //         return false;
    //     }
    //     chk.push(item.userId);
    //     return true;
    // }))
    console.log(userid);

    res.forEach((item) => {
        if(item.userId === +userid){
            console.log(item.userId)
            console.log(item.body)
            console.log(item.title)
            data += template(item.userId,item.body, item.title, item.id)
        }
    })
    document.getElementById('getId').value = ''
    console.log(data)

    // return document.getElementById("result").innerHTML = data
    show(data)
}

function show(data){
    return document.getElementById("result").innerHTML = data
}



function template(userid, body, title, id) {
    return `<div class="col-md-6 col-lg-4 p-2" id="${id}">
            <div class="card">
                <div class="card-body p-0">
                    <h4 class="p-3">${title}</h4>

                    <p class="text-start p-3">${body}</p>

                    <div class="justify-content-between row">
                        <div class="d-flex m-3 col">
                            <button type="button" class="btn btn-outline-secondary" onclick="deleting(${id})">dont show</button>
                        </div>
                        <span class="col-2 my-auto">${userid}</span>
                    </div>
                </div>
            </div>
        </div>`;
}


function deleting(id){
    return document.getElementById(id).classList.add("d-none");
}

