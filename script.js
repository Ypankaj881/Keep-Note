const addButton = document.querySelector('#add');

const updateLSData = () => {
    const textAreaData = document.querySelectorAll('textarea');
    const notes = [];
    textAreaData.forEach((note) => {
        return notes.push(note.value);
    })
    localStorage.setItem('notes', JSON.stringify(notes));
}

const addNewNote = (text = '') => {
    const Note = document.createElement('div');
    Note.classList.add('note');

    const htmlData =
        ` <div class="operation">
            <button class="edit"> <i class="fas fa-edit"> </i></button>
            <button class="delete"> <i class="fas fa-trash-alt"></i> </button>
        </div>

        <div class="main ${text ? "" : "hidden"} "> </div>
        <textarea class="${text ? "hidden" : ""}"></textarea> `;

    Note.insertAdjacentHTML('afterbegin', htmlData);

    document.body.appendChild(Note);

    // getting the references 

    const editButton = Note.querySelector('.edit');
    const delButton = Note.querySelector('.delete');
    const mainDiv = Note.querySelector('.main');
    const textArea = Note.querySelector('textarea');

    // deleting the note 
    delButton.addEventListener('click', () => {
        Note.remove();
        updateLSData();
    })

    // toggle using edit button

    textArea.value = text
    mainDiv.innerHTML = text;



    editButton.addEventListener('click', () => {
        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    })

    textArea.addEventListener('change', (event) => {
        const value = event.target.value;
        mainDiv.innerHTML = value;

        updateLSData();

    })


}

const notes = JSON.parse(localStorage.getItem('notes'));
if (notes) { notes.forEach((note) => addNewNote(note)) };

addButton.addEventListener('click', () => addNewNote());