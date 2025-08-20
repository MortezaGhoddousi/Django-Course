function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

window.onload = function(){
    let btns = document.querySelectorAll('.productBtn');
    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            var userId = window.USER_ID;
            let productId = e.target.parentNode.id;
            console.log(userId, productId);
            fetch('/addProduct/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Include CSRF token header for Django
                    'X-CSRFToken': getCookie('csrftoken')  
                },
                body: JSON.stringify({userId, productId})
                })
                .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not OK');
                }
            })
        })
    })
}