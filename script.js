const formEl = document.getElementById('form');
const nameEl = document.getElementById('name');
const emailEl = document.getElementById('email');
const mobileEl = document.getElementById('mobile');
const saveEl = document.getElementById('save');
const tBodyEL = document.querySelector('tbody');
const contEditId = document.getElementById('contEdit-id');

let data = JSON.parse(localStorage.getItem('person')) ?? [];

// Save //
formEl.addEventListener('submit', e => {
    e.preventDefault();
    let id = Math.floor(Math.random() * 1000000);
    if (!contEditId.value) {
        const tr = document.createElement('tr');
        tr.setAttribute('data-id', `${id}`);
        tr.innerHTML = `
                    <td>${nameEl.value}</>
                    <td>${emailEl.value}</td>
                    <td>${mobileEl.value}</td>
                    <td>
                        <button class="btn btn-warning edit">Edit</button>
                        <button class="btn btn-danger delete">Delete</button>
                    </td>
                    `;
        tBodyEL.appendChild(tr);
        data.push({
            id: id,
            name: nameEl.value,
            email: emailEl.value,
            mobile: mobileEl.value,
        });
        localStorage.setItem('person', JSON.stringify(data));
    } else {
        // Update
        const tr = tBodyEL.getElementsByClassName('bg-info').item(0);
        tr.children[0].textContent = nameEl.value;
        tr.children[1].textContent = emailEl.value;
        tr.children[2].textContent = mobileEl.value;
        tr.classList.remove('bg-info');
        const editData = {
            id: +contEditId.value,
            name: nameEl.value,
            email: emailEl.value,
            mobile: mobileEl.value,
        };
        data = data.map(item => {
            if (item.id === +contEditId.value) {
                return editData;
            }
            return item;
        });
        localStorage.setItem('person', JSON.stringify(data));
        contEditId.value = '';
    }
    nameEl.value = '';
    emailEl.value = '';
    mobileEl.value = '';
    saveEl.textContent = 'Save Data';
    saveEl.classList.replace('btn-warning', 'btn-success');
});

// Delete //
tBodyEL.addEventListener('click', e => {
    if (e.target.classList.contains('delete')) {
        const deleteId =
            +e.target.parentElement.parentElement.getAttribute('data-id');
        data = data.filter(item => item.id !== deleteId);
        localStorage.setItem('person', JSON.stringify(data));
        e.target.parentElement.parentElement.remove();
    }
    nameEl.value = '';
    emailEl.value = '';
    mobileEl.value = '';
    saveEl.textContent = 'Save Data';
    saveEl.classList.replace('btn-warning', 'btn-success');
});

// Edit //
tBodyEL.addEventListener('click', ({ target }) => {
    document
        .querySelectorAll('.bg-info')
        .forEach(item => item.classList.remove('bg-info'));
    if (target.classList.contains('edit')) {
        const parent = target.parentElement.parentElement;
        parent.classList.add('bg-info');
        nameEl.value = parent.children[0].textContent;
        emailEl.value = parent.children[1].textContent;
        mobileEl.value = parent.children[2].textContent;
        saveEl.textContent = 'Edit Data';
        saveEl.classList.replace('btn-success', 'btn-warning');
        contEditId.value = parent.getAttribute('data-id');
    }
});

// Local Storage
data.forEach(item => {
    const tr = document.createElement('tr');
    tr.setAttribute('data-id', `${item.id}`);
    tr.innerHTML = `
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>${item.mobile}</td>
                    <td>
                        <button class="btn btn-warning edit">Edit</button>
                        <button class="btn btn-danger delete">Delete</button>
                    </td>
                    `;
    tBodyEL.appendChild(tr);
});
