// Select DOM elements
const pops = document.querySelectorAll('.pop');
const modals = document.querySelectorAll('.modal');
const overlay = document.querySelector('.overlay');
const notification = document.querySelector('.notification');
const taskbarButton = document.querySelector('.taskbar-button');
const taskbarModal = document.querySelector('#taskbarMenu');
const notificationIcon = document.querySelector('.notification-icon');

// Map modal names to image paths (notifications)
const iconMap = {
  "browser-modal": "./assets/notification-browser.svg",
  "notes-modal": "./assets/notification-notes.svg",
  "folder-modal": "./assets/notification-folder.svg",
  "information-modal": "./assets/notification-information.svg",
  "terminal-modal": "./assets/notification-terminal.svg",
  "games-modal": "./assets/notification-games.svg",
  "precious-modal": "./assets/notification-precious.svg",
  "recycle-modal": "./assets/notification-recycle.svg"
};

// Map modal index to modal IDs
const modalMap = [
  "browser-modal", "notes-modal", "folder-modal", 
  null,
  "information-modal", "terminal-modal", "games-modal",
  "precious-modal", "recycle-modal"
];

// ========================== Pops (Trigger Elements) ========================== //
pops.forEach((pop, index) => {
  if (!pop.querySelector('a')) {
    pop.addEventListener('click', () => open(index));
  }
});

// ========================== Opening Modals ========================== //
const open = function (index) {
  const modalId = modalMap[index];
  const modal = document.getElementById(modalId);

  if (modal) {
    modal.style.animation = 'modalOpening 0.8s ease-in-out forwards';
    console.log("Opening modal:", modalId);

    if (modalId === "precious-modal") {
      loadPreciousImage();
    }

    // Show the modal and overlay with animation
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');

    [modal].forEach((modalElement) => {
      setTimeout(() => {
        modalElement.classList.add('opening');
        modalElement.classList.remove('closing');
      }, 10);
    });

    modal.addEventListener('animationend', function showNotificationAfterAnimation(event) {
      if (event.animationName === 'modalOpening') {
        modal.removeEventListener('animationend', showNotificationAfterAnimation);

        // Show notification after modal opening
        console.log("Showing notification for modal:", modalId);
        showNotification(modalId);
      }
    });
  } 
  else {
    console.warn(`No modal found for index: ${index}`);
  }
};

// ========================== Closing Modals ========================== //
const close = function () {
  console.log("Closing all modals");

  modals.forEach(modal => {
    modal.classList.add('closing');
    modal.style.animation = 'modalClosing 0.7s ease-in-out forwards';
    setTimeout(() => {
      modal.classList.add('hidden'); 
      modal.classList.remove('closing');
      resetModalContent(modal.id); 
    }, 500); 
  });

  overlay.classList.add('hidden');
  notification.classList.add('hidden');
  taskbarModal.classList.add('hidden');
};

// ========================== Ensure Modals Are Hidden On Page Load ========================== //
// Add the 'hidden' class to all modals on load to ensure none are visible initially
document.addEventListener('DOMContentLoaded', () => {
  modals.forEach(modal => {
    modal.classList.add('hidden');
  });
  overlay.classList.add('hidden');
});

// ========================== Taskbar and Taskbar Menu ========================== //
taskbarButton.addEventListener('click', () => {
  taskbarModal.classList.remove('hidden');
  overlay.classList.remove('hidden');
});

// Event listener for close buttons and overlay to close modals
document.querySelectorAll('.close-button').forEach(button => {
  button.addEventListener('click', close);
});
overlay.addEventListener('click', close);

// ========================== Notifications ========================== //
function showNotification(modalName) {
  if (iconMap[modalName]) {
    notificationIcon.src = iconMap[modalName];
    notificationIcon.alt = `${modalName} notification`;
    notification.classList.remove("hidden");

    // Show notification after modal opens
    setTimeout(() => {
      notification.classList.add('show');
    }, 200);
  } else {
    console.warn(`No image path found for modal: ${modalName}`);
  }
}


// ========================== Modal Interactions ========================== //

// Notes 
document.querySelectorAll('.modal-content .note1, .modal-content .note2, .modal-content .note3').forEach(note => {
  note.addEventListener('click', function() {
    const noteId = this.id;
    openNoteContent(noteId);
  });
});

function openNoteContent(noteId) {
  const modal = document.getElementById('notes-modal');
  const noteDetail = modal.querySelector('.note-detail-content');
  let content = '';

  switch(noteId) {
    case "note-1":
      content = `
      <p> Coming soon . . . </p>
      <pre>

         /\\_/\\
    = (   • . •   ) =
       /           \\     
    </pre>`;

      break;

    case "note-2":
      content = `
      <p> Coming soon . . . </p>
      <pre>
         /\\_/\\
    = (   • . •   ) =
       /           \\     
    </pre>`;
      break;

    case "note-3":
      content = `
      <p> Coming soon . . . </p>
      <pre>
         /\\_/\\
    = (   • . •   ) =
       /           \\     
    </pre>`;
      break;
    default:
      content = '<p>No content available.</p>';
  }


  noteDetail.innerHTML = content;
  modal.querySelector('.note-list').classList.add('hidden');
  modal.querySelector('.note-detail').classList.remove('hidden');
}

document.getElementById('back-to-list').addEventListener('click', function() {
  const modal = document.getElementById('notes-modal');
  modal.querySelector('.note-list').classList.remove('hidden');
  modal.querySelector('.note-detail').classList.add('hidden');
});




// Folder
document.querySelectorAll('.modal-content .doc1, .modal-content .doc2, .modal-content .doc3').forEach(doc => {
  doc.addEventListener('click', function() {
    const docId = this.id;
    openFolderContent(docId);
  });
});

function openFolderContent(docId) {
  const modal = document.getElementById('folder-modal');
  const folderDetail = modal.querySelector('.folder-detail-content');
  let content = '';

  switch(docId) {
    case "doc-1":
      content = `
        <p> Coming soon . . . </p>
        <pre>
           /\\_/\\
      = (   • . •   ) =
         /           \\     
        </pre>`;
      break;

    case "doc-2":
      content = `
        <p> Coming soon . . . </p>
        <pre>
           /\\_/\\
      = (   • . •   ) =
         /           \\     
        </pre>`;
      break;

    case "doc-3":
      content = `
        <p> Coming soon . . . </p>
        <pre>
           /\\_/\\
      = (   • . •   ) =
         /           \\     
        </pre>`;
      break;

    default:
      content = '<p>No content available.</p>';
  }

  folderDetail.innerHTML = content;
  modal.querySelector('.folder-list').classList.add('hidden');
  modal.querySelector('.folder-detail').classList.remove('hidden');
}

document.getElementById('back-to-folder').addEventListener('click', function() {
  const modal = document.getElementById('folder-modal');
  modal.querySelector('.folder-list').classList.remove('hidden');
  modal.querySelector('.folder-detail').classList.add('hidden');
});


// Information
document.querySelectorAll('.modal-content .info1, .modal-content .info2, .modal-content .info3').forEach(doc => {
  doc.addEventListener('click', function() {
    const infoId = this.id;
    openInformationContent(infoId);
  });
});

function openInformationContent(infoId) {
  const modal = document.getElementById('information-modal');
  const informationDetail = modal.querySelector('.information-detail-content');
  let content = '';

  switch(infoId) {
    case "info-1":
      content = `
        <p> Coming soon . . . </p>
        <pre>
           /\\_/\\
      = (   • . •   ) =
         /           \\     
        </pre>`;
      break;

    case "info-2":
      content = `
        <p> Coming soon . . . </p>
        <pre>
           /\\_/\\
      = (   • . •   ) =
         /           \\     
        </pre>`;
      break;

    case "info-3":
      content = `
        <p> Coming soon . . . </p>
        <pre>
           /\\_/\\
      = (   • . •   ) =
         /           \\     
        </pre>`;
      break;

    default:
      content = '<p>No content available.</p>';
  }

  informationDetail.innerHTML = content;
  modal.querySelector('.information-list').classList.add('hidden');
  modal.querySelector('.information-detail').classList.remove('hidden');
}

document.getElementById('back-to-information').addEventListener('click', function() {
  const modal = document.getElementById('information-modal');
  modal.querySelector('.information-list').classList.remove('hidden');
  modal.querySelector('.information-detail').classList.add('hidden');
});


// Precious 
function loadPreciousImage() {
  console.log('Loading precious image...');
  const preciousModal = document.getElementById('precious-modal');
  const modalContent = preciousModal.querySelector('.modal-content');

  modalContent.innerHTML = '';

  const img = document.createElement('img');
  img.src = '../assets/precious.png';
  img.alt = 'Precious Image';

  // Append the image to the modal content
  modalContent.appendChild(img);
}



// Terminal


const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');

const welcomeText = `<p style="margin-bottom: 10px; font-size: x-large;">Welcome to my Terminal!</p>
                     <p>Type <span class="help-text">'help'</span> for more commands.</p>
                     <br>
                     <br>
                      `;

let awaitingThemeSelection = false;
terminalOutput.innerHTML = welcomeText;

// Apply default theme on page load
document.body.classList.add('default-theme');

terminalInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    const inputText = terminalInput.value.trim();
    if (inputText) {
      if (awaitingThemeSelection) {
        changeTheme(inputText);
        awaitingThemeSelection = false;
      } else {
        executeCommand(inputText);
      }
    }
    terminalInput.value = '';
  }
});

function executeCommand(command) {
  // Add command to terminal output
  terminalOutput.innerHTML += `<p><span class="prompt"> &gt; user</span> ${command}</p>`;

  // List of commands
  if (command === 'help') {
    terminalOutput.innerHTML += `
      <br>
      <p>Available commands:</p>
      <pre>
      &#9829; help      \t\t List of available commands.
      &#9829; about     \t\t About me
      &#9829; projects  \t\t My projects
      &#9829; resume    \t\t My resume
      &#9829; contact   \t\t Contact information
      &#9829; theme     \t\t Change Theme
      &#9829; clear     \t\t Clear the terminal screen
      &#9829; date      \t\t Current date and time
      &#9829; art       \t\t\t Display fun ASCII art
      </pre>
    `;
  } 

  else if (command == 'about') {
    terminalOutput.innerHTML += `
    <br>
    <p style = "text-align: justify; text-justify: inter-word; line-height: 2; margin-right: 10px; margin-left: 10px;"> I am currently in my third year at Richfield Institute of Technology, pursuing a BSc in Information Technology. With a strong foundation in IT, I am passionate about blending creativity with technical problem-solving. Outside of my studies, I enjoy helping animals and find great fulfillment in making a positive impact on their well-being. I also like to unwind by playing games, which helps me relax and recharge. As I continue my journey, I look forward to expanding my knowledge and contributing to projects that reflect both my technical and creative strengths.</p>
    <br>
    `;
  }

  else if (command == 'projects') {
    terminalOutput.innerHTML += `
    <br>
    <pre> My projects: </pre>
    <br>
    <pre>
    I created this website and its componenets on my own using Visual Studio Code, Figma, and Procreate.
    </pre>
    <pre>
      <a href='https://drive.google.com/file/d/17fGULwmiGLvWsJ87WnMv1njkWy27re5o/view?usp=sharing' target='_blank' class='contact-link'>  \t Wireframe for South African Tourism </a>
      <a href='https://drive.google.com/file/d/1nO_2F50GIOkGlwRyKjLxGX2Gdip7nljr/view?usp=sharing' target='_blank' class='contact-link'>  \t Wireframe for VanGo </a>
      <a href='https://drive.google.com/file/d/1G6V2gpwlaf2zi1FNnWdl814yiOQlzHyR/view?usp=sharing' target='_blank' class='contact-link'>  \t Self-made Art </a>
    </pre>
    `;
  }

  else if (command == 'resume') {
    terminalOutput.innerHTML += `
    <br>
    <pre> View my resume <a href="https://drive.google.com/file/d/1xWKLILyBq_x2PR4u5U7g3YFOnda0B_qH/view?usp=sharing" download="" class="resume-link" target="_blank"> here </a>.
    </pre>
    <br>
    `;
  }

  else if (command == 'contact') {
    terminalOutput.innerHTML += `
    <br>
    <p> Contact me here: </p>
    <pre>
      <a href='mailto:mignon.rossouw01@gmail.com' target='_blank' class='contact-link'> <i class="fa fa-envelope" aria-hidden="true"></i> \t E-mail </a>
      <a href='https://www.github.com/mignon-rossouw' target='_blank' class='contact-link'> <i class="fa fa-github" aria-hidden="true"></i> \t Github </a>
      <a href='https://www.linkedin.com/in/mignon-rossouw' target='_blank' class='contact-link'> <i class="fa fa-linkedin-square" aria-hidden="true"></i> \t Linkedin </a>
    </pre>
    <br>
    `;
  }

  else if (command == 'art') {
    terminalOutput.innerHTML += `
    <br>
    <pre> Here is some cool arts wahwahwah: </pre>
    <br>
    `
  }

  else if (command === 'date') {
    const currentDate = new Date().toLocaleString();
    terminalOutput.innerHTML += `
    <br>
    <pre> Current date and time: ${currentDate} </pre>
    <br>
    `;
  } 

  else if (command === 'theme') {
    terminalOutput.innerHTML += `
    <br>
    <pre> 
    Available themes: 
    &#9829; Dark
    &#9829; Light
    &#9829; Green
    &#9829; Pink
    </pre>
    <br>
    `;
    awaitingThemeSelection = true;
  }


  else if (command === 'clear') {
    terminalOutput.innerHTML = welcomeText; 
  } 
  

  else {
    terminalOutput.innerHTML += `
    <br>
    <pre> Command not found. Type "help" for available commands.</pre>
    <br>
    `;
  }

  // Scroll to the bottom to show the latest output
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function changeTheme(theme) {
  document.body.className = '';
  if (theme === 'dark') {
    document.body.classList.add('dark-theme');
  } 
  
  else if (theme === 'light') {
    document.body.classList.add('light-theme');
  } 
  
  else if (theme === 'green') {
    document.body.classList.add('green-theme');
  } 

  else if (theme === 'pink') {
    document.body.classList.add('pink-theme');
  } 
  
  else {
    terminalOutput.innerHTML += `
    <br>
    <pre> Theme not found. Available themes: dark, light, green, pink.</pre>
    <br>
    `;
  }
}



// Recycle Bin
document.querySelectorAll('.modal-content .rec1, .modal-content .rec2, .modal-content .rec3').forEach(doc => {
  doc.addEventListener('click', function() {
    const recId = this.id;
    openRecycleContent(recId);
  });
});

function openRecycleContent(recId) {
  const modal = document.getElementById('recycle-modal');
  const recycleDetail = modal.querySelector('.recycle-detail-content');
  let content = '';

  switch(recId) {
    case "rec-1":
      content = `
        <p> Coming soon . . . </p>
        <pre>
           /\\_/\\
      = (   • . •   ) =
         /           \\     
        </pre>`;
      break;

    case "rec-2":
      content = `
        <p> Coming soon . . . </p>
        <pre>
           /\\_/\\
      = (   • . •   ) =
         /           \\     
        </pre>`;
      break;

    case "rec-3":
      content = `
        <p> Coming soon . . . </p>
        <pre>
           /\\_/\\
      = (   • . •   ) =
         /           \\     
        </pre>`;
      break;

    default:
      content = '<p>No content available.</p>';
  }

  recycleDetail.innerHTML = content;
  modal.querySelector('.recycle-list').classList.add('hidden');
  modal.querySelector('.recycle-detail').classList.remove('hidden');
}

document.getElementById('back-to-recycle').addEventListener('click', function() {
  const modal = document.getElementById('recycle-modal');
  modal.querySelector('.recycle-list').classList.remove('hidden');
  modal.querySelector('.recycle-detail').classList.add('hidden');
});


// ========================== Time and Date Display ========================== //
function displayTime() {
  var d = new Date();
  var hour = d.getHours();
  var min = d.getMinutes();

  if (hour < 10) {
    hour = "0" + hour;
  }
  if (min < 10) {
    min = "0" + min;
  }

  document.getElementsByClassName("time")[0].innerHTML = hour + ":" + min;
}

function displayDate() {
  var d = new Date();
  var day = d.getDate();
  var month = d.getMonth() + 1;
  var year = d.getFullYear();

  // Add leading zero to Date
  if (day < 10) {
    day = "0" + day;
  }
  
  if (month < 10) {
    month = "0" + month;
  }

  document.getElementsByClassName("date")[0].innerHTML = day + "/" + month + "/" + year;
}
setInterval(displayTime, 1000);
setInterval(displayDate, 1000);



// ========================== Modal Reset ========================== //
function resetModalContent(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    const modalContent = modal.querySelector('.modal-content');

    if (modalId === "terminal-modal") {
      // Reset terminal content for the terminal modal
      terminalOutput.innerHTML = welcomeText;
      terminalInput.value = '';
      awaitingThemeSelection = false;
      // Reset the terminal's theme to default
      document.body.className = '';
      document.body.classList.add('default-theme');
    } 
    
    else if (modalId === "notes-modal") {
      // Reset notes modal content if needed
      const noteDetail = modal.querySelector('.note-detail-content');
      noteDetail.innerHTML = '';
      modal.querySelector('.note-list').classList.remove('hidden');
      modal.querySelector('.note-detail').classList.add('hidden');
    }

    else if (modalId === "information-modal") {
      // Reset information modal content if needed
      const informationDetail = modal.querySelector('.information-detail-content');
      informationDetail.innerHTML = '';
      modal.querySelector('.information-list').classList.remove('hidden');
      modal.querySelector('.information-detail').classList.add('hidden');
    }

    else if (modalId === "folder-modal") {
      // Reset folder modal content if needed
      const folderDetail = modal.querySelector('.folder-detail-content');
      folderDetail.innerHTML = '';
      modal.querySelector('.folder-list').classList.remove('hidden');
      modal.querySelector('.folder-detail').classList.add('hidden');
    }

    else if (modalId === "recycle-modal") {
      // Reset recycle modal content if needed
      const recycleDetail = modal.querySelector('.recycle-detail-content');
      recycleDetail.innerHTML = '';
      modal.querySelector('.recycle-list').classList.remove('hidden');
      modal.querySelector('.recycle-detail').classList.add('hidden');
    }

    else if (modalId === "terminal-modal") {
      // Reset terminal content for the terminal modal
      const terminalOutput = modal.querySelector('#terminal-output');
      const terminalInput = modal.querySelector('#terminal-input');
      
      // Define the initial welcome text
      const welcomeText = `<p style="margin-bottom: 10px; font-size: x-large;">Welcome to my Terminal!</p>
                           <p>Type 'help' for more commands.</p><br>`;
      
      // Set the terminal output and input back to default
      terminalOutput.innerHTML = welcomeText;
      terminalInput.value = '';
    } 
  
    // Do not reset browser modal content (Google search)
    else if (modalId === "browser-modal") {
      return;
    } 

    else if (modalId === "games-modal") {
      return;
    }
    
    else {
      // Reset other modals' content
      modalContent.innerHTML = ''; 
  }
}
}

// ========================== Modal Draggable ========================== //

document.querySelectorAll(".modal").forEach((modal) => {
  const header = modal.querySelector(".modal-header");
  if (header) {
    dragElement(modal, header);
  }
});

function dragElement(elmnt, handle) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  handle.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
