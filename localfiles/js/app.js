const app = document.querySelector("#app");
let dirHandle;

async function selectDirectory() {    
  dirHandle = await window.showDirectoryPicker();  

  if(!dirHandle) {
    return;
  }

  for await(const [key, value] of dirHandle.entries()) {
    let name = key;
    let handle = value;

    if(handle.kind === "directory") {
      console.log(`${name} is a directory`);
    } else if(handle.kind === "file") {
      console.log(`${name} is a file`);
    } else {
      console.log(`${name} is a ${handle.kind}`);
    }
  }
}