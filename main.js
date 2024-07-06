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
    const stored = localStorage.getItem('posts')
    if (stored){
        res = JSON.parse(stored)
    }
    else {
        show('please wait..', 'result')
        res = await fetchData();
        localStorage.setItem('posts', JSON.stringify(res));
    }
    let data = ''
    // show('please wait..', 'result')
    // res = await fetchData();

    res.forEach((item) => {
        if (item.userId === +userid ) {
            data += template(item.userId, item.body, item.title, item.id)
        }
    })
    document.getElementById('getId').value = ''
    console.log(data)

    // return document.getElementById("result").innerHTML = data
    show(data, 'result')
}

function show(data, id) {
    return document.getElementById(id).innerHTML = data
}


function template(userid, body, title, id) {
    return `<div class="col-md-6 col-lg-4 p-2" id="${id + 'col'}">
            <div class="card">
                <div class="card-body p-0">
                    <h4 class="p-3">${title}</h4>

                    <p class="text-start p-3">${body}</p>

                    <div class="justify-content-between row">
                        <div class="d-flex m-3 col">
                            <button type="button" class="btn btn-outline-secondary" onclick="deleting('${id + 'col'}', 'posts')">dont show</button>
                        </div>
                        <span class="col-2 my-auto">${userid}</span>
                    </div>
                </div>
            </div>
        </div>`;
}

ids = []
function deleting(id, row) {
    if(row === 'users'){
        ids.push(id)
        const stored = localStorage.getItem(row)
        res = JSON.parse(stored)
        if(res.length){
            res = res.filter(item => item.id !== id)
            localStorage.setItem(row, JSON.stringify(res))
            showTable()


            console.log(stored)
        }
    }
    else {
        return document.getElementById(id).classList.add("d-none");
    }

}


async function tableData() {
    let data = await fetch('https://jsonplaceholder.typicode.com/users');
    let success = await data.json()
    return success;
}

async function showTable() {
    const stored = localStorage.getItem('users')
    // console.log(stored.length)
    if (stored){
        res = JSON.parse(stored)
    }
    else {
        show('please wait..', 'tbody')
        res = await tableData();
        ids = []
        localStorage.setItem('users', JSON.stringify(res));
    }
    let data = ''


    res.forEach(item => {
        data += tempTable(item.id, item.name, item.username, item.phone)
    })

    if (!res.length){
        localStorage.removeItem('users');
    }
    show(data, 'tbody')
}


showTable();

function tempTable(id, name, user, phone) {
    return `<tr id="${id}" onclick="deleting(${id}, 'users')">
            <td>${id}</td>
            <td>${name}</td>
            <td>${user}</td>
            <td>${phone}</td>
        </tr>`
}




document.getElementById('getId').addEventListener('keyup',function (event) {
        if (event.key==='Enter')
            load(this.value);
})