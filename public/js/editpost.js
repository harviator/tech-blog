const updatePostFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
    const id = document.querySelector('#post-id').value;

    if (title && content) {

        const response = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

const delButtonHandler = async (event) => {
        const id = document.querySelector('#post-id').value;

        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete project');
        }
};

document
    .querySelector('.form-update-post')
    .addEventListener('submit', updatePostFormHandler);

document
    .querySelector('#delete-post')
    .addEventListener('click', delButtonHandler);