
document.addEventListener('DOMContentLoaded', function (event) {
  var baseHost = document.location.origin;
  var streamURL = 'Undefined';

  const settings = document.getElementById('sidebar')
  const waitSettings = document.getElementById('wait-settings')
  const lampGroup = document.getElementById('lamp-group')
  const rotate = document.getElementById('rotate')
  const view = document.getElementById('stream')
  const viewContainer = document.getElementById('stream-container')
  const stillButton = document.getElementById('get-still')
  const streamButton = document.getElementById('toggle-stream')
  const closeButton = document.getElementById('close-stream')
  const swapButton = document.getElementById('swap-viewer')

  const hide = el => {
    el.classList.add('hidden')
  }
  const show = el => {
    el.classList.remove('hidden')
  }

  const disable = el => {
    el.classList.add('disabled')
    el.disabled = true
  }

  const enable = el => {
    el.classList.remove('disabled')
    el.disabled = false
  }

  const updateValue = (el, value, updateRemote) => {
    updateRemote = updateRemote == null ? true : updateRemote
    let initialValue
    if (el.type === 'checkbox') {
      initialValue = el.checked
      value = !!value
      el.checked = value
    } else {
      initialValue = el.value
      el.value = value
    }

    if (updateRemote && initialValue !== value) {
      updateConfig(el);
    } else if(!updateRemote){
      if(el.id === "lamp"){
        if (value == -1) {
          hide(lampGroup)
        } else {
          show(lampGroup)
        }
      } else if(el.id === "cam_name"){
        window.document.title = value;
        console.log('Name set to: ' + value);
      } else if(el.id === "code_ver"){
        console.log('Firmware Build: ' + value);
      } else if(el.id === "rotate"){
        rotate.value = value;
        applyRotation();
      } else if(el.id === "stream_url"){
        streamURL = value;
        streamButton.setAttribute("title", `Start the stream :: {streamURL}`);
        console.log('Stream URL set to:' + value);
      }
    }
  }

  var rangeUpdateScheduled = false
  var latestRangeConfig

  function updateRangeConfig (el) {
    latestRangeConfig = el
    if (!rangeUpdateScheduled) {
      rangeUpdateScheduled = true;
      setTimeout(function(){
        rangeUpdateScheduled = false
        updateConfig(latestRangeConfig)
      }, 150);
    }
  }

  function updateConfig (el) {
    let value
    switch (el.type) {
      case 'checkbox':
        value = el.checked ? 1 : 0
        break
      case 'range':
      case 'select-one':
        value = el.value
        break
      case 'button':
      case 'submit':
        value = '1'
        break
      default:
        return
    }

    const query = `${baseHost}/control?var=${el.id}&val=${value}`

    fetch(query)
      .then(response => {
        console.log(`request to ${query} finished, status: ${response.status}`)
      })
  }

  document
    .querySelectorAll('.close')
    .forEach(el => {
      el.onclick = () => {
        hide(el.parentNode)
      }
    })

  // read initial values
  fetch(`${baseHost}/status`)
    .then(function (response) {
      return response.json()
    })
    .then(function (state) {
      document
        .querySelectorAll('.action-setting')
        .forEach(el => {
          updateValue(el, state[el.id], false)
        })
      hide(waitSettings);
      show(settings);
      show(streamButton);
      startStream();
    })

  // Put some helpful text on the 'Still' button
  stillButton.setAttribute("title", `Capture a still image :: ${baseHost}/capture`);

  const stopStream = () => {
    window.stop();
    streamButton.innerHTML = 'Start Stream';
        streamButton.setAttribute("title", `Start the stream :: ${streamURL}`);
    hide(viewContainer);
  }

  const startStream = () => {
    view.src = streamURL;
    view.scrollIntoView(false);
    streamButton.innerHTML = 'Stop Stream';
    streamButton.setAttribute("title", `Stop the stream`);
    show(viewContainer);
  }

  const applyRotation = () => {
    rot = rotate.value;
    if (rot == -90) {
      viewContainer.style.transform = `rotate(-90deg)  translate(-100%)`;
      closeButton.classList.remove('close-rot-none');
      closeButton.classList.remove('close-rot-right');
      closeButton.classList.add('close-rot-left');
    } else if (rot == 90) {
      viewContainer.style.transform = `rotate(90deg) translate(0, -100%)`;
      closeButton.classList.remove('close-rot-left');
      closeButton.classList.remove('close-rot-none');
      closeButton.classList.add('close-rot-right');
    } else {
      viewContainer.style.transform = `rotate(0deg)`;
      closeButton.classList.remove('close-rot-left');
      closeButton.classList.remove('close-rot-right');
      closeButton.classList.add('close-rot-none');
    }
     console.log('Rotation ' + rot + ' applied');
 }

  // Attach actions to controls

  stillButton.onclick = () => {
    stopStream();
    view.src = `${baseHost}/capture?_cb=${Date.now()}`;
    view.scrollIntoView(false);
    show(viewContainer);
  }

  closeButton.onclick = () => {
    stopStream();
    hide(viewContainer);
  }

  streamButton.onclick = () => {
    const streamEnabled = streamButton.innerHTML === 'Stop Stream'
    if (streamEnabled) {
      stopStream();
    } else {
      startStream();
    }
  }

  // Attach default on change action
  document
    .querySelectorAll('.action-setting')
    .forEach(el => {
      el.onchange = () => updateConfig(el)
    })

  // Update range sliders as they are being moved
  document
    .querySelectorAll('input[type="range"]')
    .forEach(el => {
      el.oninput = () => updateRangeConfig(el)
    })

  // Custom actions
  // Detection and framesize
  rotate.onchange = () => {
    applyRotation();
    updateConfig(rotate);
  }

  framesize.onchange = () => {
    updateConfig(framesize)
  }

  swapButton.onclick = () => {
    window.open('/?view=full','_self');
  }

})
