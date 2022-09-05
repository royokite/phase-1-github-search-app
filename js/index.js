//Github Search App
document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.querySelector('#github-form') 

    userForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const userName = document.querySelector('#search').value

        fetch(`https://api.github.com/search/users?q=${userName}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/vnd.github.v3+json'
        }
        })
        .then(response => response.json())
        .then(users => {
            const data = users.items
            renderDetails(data)
        })

        function renderDetails(data) {
            const userList = document.querySelector('#user-list')
            data.map(account => {
                const userDetails = document.createElement('li')
                userDetails.className = 'card'
                userDetails.innerHTML = `
                <img src='${account.avatar_url}'/>
                <h2>${account.login}</h2>
                <a class='profile-link' href='${account.html_url}' target='_blank'/>User Profile</a>
                <input type='submit' name='submit-repo' value='Repos'/>
                `
                userList.appendChild(userDetails)
            })

            const repoBtns = document.getElementsByName('submit-repo')
            repoBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const targetRepo = e.target.parentElement.querySelector('h2').textContent
                    fetch(`https://api.github.com/users/${targetRepo}/repos`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/vnd.github.v3+json'
                        }
                    })
                    .then(response => response.json())
                    .then(allRepos => {
                        const repoList = document.querySelector('#repos-list')
                        allRepos.map(repo => {
                            const li = document.createElement('li')
                            // li.innerHTML = `<h3>${repo.owner.login}</h3>`
                            li.className = 'repos'
                            li.innerHTML = `
                            <h3>${repo.name}</h3>
                            `
                            repoList.appendChild(li)

                            // console.log(repo.name)                        
                        })
                    })
                })
            } )
        }
    })   
});