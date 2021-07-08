const newCommentFormHandler = async (event) => {
    event.preventDefault();

    const content = document.querySelector('#comment-content').value.trim();
    const id = document.querySelector('#post-id').value;

    if (content) {

        const response = await fetch('/api/comments/', {
            method: 'POST',
            body: JSON.stringify({ content, id }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('.form-new-comment')
    .addEventListener('submit', newCommentFormHandler);