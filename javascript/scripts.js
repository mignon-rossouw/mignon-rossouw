// Function to open a window
function openWindow(windowId) {
    const window = document.getElementById(windowId);
    window.style.display = 'block';
    makeResizable(window);
  }
  
// Function to close a window
  function closeWindow(windowId) {
    const window = document.getElementById(windowId);
    window.style.display = 'none';
}

// Function to toggle the Start Menu
    function toggleStartMenu() {
        const menu = document.getElementById('start-menu');
        menu.classList.toggle('show');
}
        document.addEventListener('click', function(event) {
            const menu = document.getElementById('start-menu');

    if (!menu.contains(event.target) && !event.target.matches('#taskbar-button')) {
        menu.classList.remove('show');
    }
});

// Make the window resizable
function makeResizable(windowElement) {
  const resizeHandle = windowElement.querySelector('.resize-handle');
  let isResizing = false;
  let lastDownX = 0;
  let lastDownY = 0;

resizeHandle.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isResizing = true;
    lastDownX = e.clientX;
    lastDownY = e.clientY;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  });

function handleMouseMove(e) {
    if (isResizing) {
      const dx = e.clientX - lastDownX;
      const dy = e.clientY - lastDownY;

      const currentWidth = parseInt(windowElement.style.width || windowElement.offsetWidth, 10);
      const currentHeight = parseInt(windowElement.style.height || windowElement.offsetHeight, 10);

      windowElement.style.width = `${Math.max(currentWidth + dx, 100)}px`; // Min width
      windowElement.style.height = `${Math.max(currentHeight + dy, 100)}px`; // Min height

      lastDownX = e.clientX;
      lastDownY = e.clientY;
    }
  }

function handleMouseUp() {
    isResizing = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }
}

// Function to start the clock
function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    m = checkTime(m);
    document.getElementById('txt').innerHTML = h + ":" + m;
    setTimeout(startTime, 60000);
}

// Function to add leading zero for single-digit minutes/seconds
function checkTime(i) {
    if (i < 10) { i = "0" + i; }
    return i;
}

window.onload = startTime;

        // Function to enable dragging
function makeDraggable(windowElement) {
    var dragStartX, dragStartY, windowStartX, windowStartY;
  
    var header = windowElement.querySelector('.window-header'); // Get the header of the window
    
    header.addEventListener('mousedown', function(e) {
        e.preventDefault(); // Prevent text selection during drag
        
        // Get initial positions
        dragStartX = e.clientX;
        dragStartY = e.clientY;
        
        windowStartX = windowElement.offsetLeft;
        windowStartY = windowElement.offsetTop;
        
        // Add dragging class to show grabbing cursor
        windowElement.classList.add('dragging');
        
        // Mousemove event to move the window
        function onMouseMove(e) {
            var dx = e.clientX - dragStartX;
            var dy = e.clientY - dragStartY;
            
            windowElement.style.left = windowStartX + dx + 'px';
            windowElement.style.top = windowStartY + dy + 'px';
        }
        
        // Mouseup event to stop dragging
        function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            
            // Remove dragging class
            windowElement.classList.remove('dragging');
        }
        
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
}

// Make each window draggable
document.querySelectorAll('.window').forEach(function(windowElement) {
    makeDraggable(windowElement);
});


// Get references to terminal input and output
const terminalInput = document.getElementById('input');
const terminalOutput = document.getElementById('output');

// Define available commands
const commands = {
    help: () => {
        terminalOutput.innerHTML += `\nAvailable commands:\n\n` +
            `- \thelp \t\t\t\t\tShow this message \n` +
            `- \tclear \t\t\t\t\tClear the terminal output \n` +
            `- \tdate \t\t\t\t\tShow the current date \n` +
            `- \techo [message] \t\tRepeat your message \n` +
            `- \tabout \t\t\t\t\tShow information about me \n` +
            `- \tcontact \t\t\t\tShow contact information \n` +
            `- \tprojects \t\t\t\tList my projects \n` +
            `- \texit \t\t\t\t\tClose the terminal \n`;
    },

    clear: () => {
        const welcomeMessage = 'WELCOME!\n Type "help" for a list of commands.\n ===================================\n\n';
        terminalOutput.innerHTML = welcomeMessage;
    },

    date: () => { 
        const date = new Date();
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString();
    
        terminalOutput.innerHTML += `\n<u>Current date and time:</u>\n${formattedDate}\n${formattedTime}\n\n`; 
    },

    echo: (message) => { 
        terminalOutput.innerHTML += `\n${message}\n\n`; 
    },

    about: () => {
        terminalOutput.innerHTML += "\nMore about me:\n\n" +  
            "I'm a second-year BSc IT student at Richfield Institute of Technology. I love being creative and diving into technology. Coding, drawing, playing games, and spending time with animals are some of my favourite things. I'm always excited to learn new skills and work on fun projects that combine my interests.\n\n";
    },

    contact: () => {
        terminalOutput.innerHTML += "\nContact Me: \n\n" +
            "- \t <a href='mailto:mignon.rossouw01@gmail.com' target='_blank' class='contact-link'> <img src = 'assets/images/envelope.png' class='contact-icon'> Email </a> \n" +
            "- \t <a href='https://www.github.com/mignon-rossouw' target='_blank' class='contact-link'> <img src = 'assets/images/github.png' class='contact-icon'> Github </a> \n" +
            "- \t <a href='https://www.linkedin.com/in/mignon-rossouw' target='_blank' class='contact-link'> <img src = 'assets/images/linkedin.png' class='contact-icon'> Linkedin </a> \n\n";
    },

    projects: () => {
        terminalOutput.innerHTML += "\nProjects:\n\n" +
            "- \tPortfolio Website\n" +
            "- \tComing Soon\n" +
            "- \tComing Soon.\n\n" +
            "<pre>" +
            "   /\\_/\\ \n" +
            " =(• . •)= \n" +
            "  /     \\ " +
            "</pre>\n\n";
    },

    exit: () => {
        closeModal('batch');
    }
};

// Initialize terminal with a welcome message
const welcomeMessage = 'WELCOME!\n Type "help" for a list of commands.\n ===================================\n\n';
terminalOutput.innerHTML = welcomeMessage;

// Handle commands entered by the user
function handleCommand(input) {
    const parts = input.split(' ');
    const command = parts[0];
    const args = parts.slice(1).join(' ');

    if (commands[command]) {
        if (command === 'echo' && args) {
            commands[command](args);
        } else {
            commands[command]();
        }
    } else {
        terminalOutput.innerHTML += `Command not found: ${command}\n`;
    }
}

// Event listener for user input
terminalInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        const input = terminalInput.value;
        if (input.trim() !== '') {
            terminalOutput.innerHTML += `> ${input}\n`;
            handleCommand(input.trim());
            terminalInput.value = '';
        }
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
});



