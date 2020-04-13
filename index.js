const getRepos = function() {
  fetch('https://api.github.com/users/andreacardybailey/repos')
    .then(response => response.json())
    .then(jsonData => {
      extractData(jsonData);
    })
    .catch(error => console.log(error));
};


const extractData = function(data){
  data.forEach(repo => {
    let {
      name,
      html_url,
      created_at,
      description
    } = repo;
    
    let dateCreated = new Date(created_at);
    $('.repos').append(createTemplate(name, html_url, dateCreated, description));
  });
};

const createTemplate = function(repo_name, url, date, description) {
  let template = `
  <section>
    <h2><a href="${url}">${repo_name}</a></h2>
    <ul>
      <li>Description: ${description}</li>
      <li>
        Date created: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}
      </li>
    </ul>
  </section>
  `;
  return template;
};

$(getRepos);