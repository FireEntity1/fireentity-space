var projects = {
    "music": [
        {
            "name": "Unbound",
            "description": "A song about breaking free from people's expectations and finding your own path. My first lyrical song!",
            "link": "https://www.youtube.com/watch?v=lMCy1eDiFDw",
            "image": "assets/kaguya.png"
        }
    ],
    "code": [
        {
            "name": "fireentity space",
            "description": "This website!",
            "link": "https://fire-entity.space/",
            "image": "assets/voidborne.png"
        }
    ],
    
}

var selected = 0

function update_content(index) {
    var content = document.getElementById("content")
    content.innerHTML = ""
    var category = Object.keys(projects)[index]
    projects[category].forEach(project => {
        var project_element = document.createElement("div")
        project_element.classList.add("bg-white/10", "rounded-lg", "p-5", "mb-5", "text-center", "font", "mt-2")
        project_element.innerHTML = `
            <h2 class="text-xl font-bold mb-2 font">${project.name}</h2>
            <p class="mb-2 font">${project.description}</p>
            <a href="${project.link}" class="text-blue-500 hover:underline">View Project</a>
            <img src="${project.image}" alt="${project.name}" class="mt-2 rounded-lg mx-auto">
        `
        content.appendChild(project_element)
    })
}